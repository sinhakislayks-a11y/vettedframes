"use client";

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Matter, {
  Bodies,
  Body,
  Engine,
  Runner,
  World,
} from "matter-js";

import { cn } from "@/lib/utils";

type GravityProps = {
  children: ReactNode;
  gravity?: { x: number; y: number };
  className?: string;
};

type PhysicsBodyData = {
  element: HTMLElement;
  body: Matter.Body;
  id: string;
};

export type GravityRef = {
  engine: Matter.Engine;
  removeBody: (id: string) => void;
  getBody: (id: string) => Matter.Body | undefined;
  setOnRelease: (callback: (id: string, x: number, y: number) => void) => void;
};

const GravityContext = createContext<{
  register: (id: string, element: HTMLElement, options: any) => void;
  unregister: (id: string) => void;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
} | null>(null);

const MatterBody = ({
  children,
  bodyId,
  friction = 0.4,
  restitution = 0.3,
  density = 0.001,
  className,
}: {
  children: ReactNode;
  bodyId: string;
  friction?: number;
  restitution?: number;
  density?: number;
  className?: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const context = useContext(GravityContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;

    context.register(bodyId, elementRef.current, {
      friction,
      restitution,
      density,
    });

    return () => context.unregister(bodyId);
  }, [bodyId, friction, restitution, density, context]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (context) {
      context.onMouseDown(bodyId, e);
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={handleMouseDown}
      className={cn("absolute cursor-grab select-none", className)}
    >
      {children}
    </div>
  );
};

const Gravity = forwardRef<GravityRef, GravityProps>(
  ({ children, gravity = { x: 0, y: 1 }, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const runner = useRef<Runner | null>(null);
    const bodiesMap = useRef(new Map<string, PhysicsBodyData>());
    const frameId = useRef<number | undefined>(undefined);
    const onReleaseRef = useRef<((id: string, x: number, y: number) => void) | null>(null);

    const removeBody = useCallback((id: string) => {
      const data = bodiesMap.current.get(id);
      if (data) {
        World.remove(engine.current.world, data.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    const getBody = useCallback((id: string) => {
      return bodiesMap.current.get(id)?.body;
    }, []);

    const setOnRelease = useCallback((callback: (id: string, x: number, y: number) => void) => {
      onReleaseRef.current = callback;
    }, []);

    const register = useCallback((id: string, element: HTMLElement, options: any) => {
      if (!containerRef.current || bodiesMap.current.has(id)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = element.offsetWidth || 120;
      const height = element.offsetHeight || 40;

      const body = Bodies.rectangle(
        rect.width / 2 + Math.random() * 100,
        -50 - Math.random() * 50,
        width,
        height,
        {
          friction: options.friction || 0.4,
          restitution: options.restitution || 0.3,
          density: options.density || 0.001,
        }
      );

      World.add(engine.current.world, body);
      bodiesMap.current.set(id, { element, body, id });
    }, []);

    const unregister = useCallback((id: string) => {
      removeBody(id);
    }, [removeBody]);

    // Sync physics to DOM
    const updateLoop = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const angle = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}deg)`;
      });
      frameId.current = requestAnimationFrame(updateLoop);
    }, []);

    // Mouse handling
    const handleMouseDown = useCallback((id: string, e: React.MouseEvent) => {
      const data = bodiesMap.current.get(id);
      if (!data) return;

      const body = data.body;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const newX = moveEvent.clientX - rect.left;
        const newY = moveEvent.clientY - rect.top;

        Body.setPosition(body, { x: newX, y: newY });
        Body.setVelocity(body, { x: 0, y: 0 });
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        if (!containerRef.current) return;

        const x = upEvent.clientX;
        const y = upEvent.clientY;

        if (onReleaseRef.current) {
          onReleaseRef.current(id, x, y);
        }

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }, []);

    useImperativeHandle(ref, () => ({
      engine: engine.current,
      removeBody,
      getBody,
      setOnRelease,
    }), [removeBody, getBody, setOnRelease]);

    useEffect(() => {
      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      // Create walls
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const walls = [
          Bodies.rectangle(rect.width / 2, rect.height + 25, rect.width + 100, 50, { isStatic: true, friction: 1 }),
          Bodies.rectangle(-25, rect.height / 2, 50, rect.height * 2, { isStatic: true, friction: 1 }),
          Bodies.rectangle(rect.width + 25, rect.height / 2, 50, rect.height * 2, { isStatic: true, friction: 1 }),
        ];
        World.add(engine.current.world, walls);
      }

      // Start physics
      runner.current = Runner.create();
      Runner.run(runner.current, engine.current);
      frameId.current = requestAnimationFrame(updateLoop);

      return () => {
        if (runner.current) Runner.stop(runner.current);
        if (frameId.current) cancelAnimationFrame(frameId.current);
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
        bodiesMap.current.clear();
      };
    }, [gravity, updateLoop]);

    return (
      <GravityContext.Provider value={{ register, unregister, onMouseDown: handleMouseDown }}>
        <div
          ref={containerRef}
          className={cn("absolute inset-0 overflow-hidden", className)}
          style={{ background: "transparent" }}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = "Gravity";
export { Gravity, MatterBody };