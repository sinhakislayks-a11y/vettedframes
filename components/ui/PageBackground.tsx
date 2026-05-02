"use client"

import { ThemedBGPattern } from "./ThemedBGPattern"

type PageBackgroundProps = {
  children: React.ReactNode
  variant?: 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard'
  mask?: 'fade-center' | 'fade-edges' | 'fade-top' | 'fade-bottom' | 'fade-left' | 'fade-right' | 'fade-x' | 'fade-y' | 'none'
  size?: number
  className?: string
}

export default function PageBackground({
  children,
  variant = 'dots',
  mask = 'fade-edges',
  size = 32,
  className = ''
}: PageBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <ThemedBGPattern
        variant={variant}
        mask={mask}
        size={size}
        className="pointer-events-none"
      />
      {children}
    </div>
  )
}

// Page-specific background presets
export function HomeBackground({ children }: { children: React.ReactNode }) {
  return (
    <PageBackground variant="dots" mask="fade-edges" size={32} className="min-h-screen">
      {children}
    </PageBackground>
  )
}

export function AboutBackground({ children }: { children: React.ReactNode }) {
  return (
    <PageBackground variant="grid" mask="fade-edges" size={48} className="min-h-screen">
      {children}
    </PageBackground>
  )
}

export function ProjectsBackground({ children }: { children: React.ReactNode }) {
  return (
    <PageBackground variant="diagonal-stripes" mask="fade-edges" size={24} className="min-h-screen">
      {children}
    </PageBackground>
  )
}

export function ContactBackground({ children }: { children: React.ReactNode }) {
  return (
    <PageBackground variant="vertical-lines" mask="fade-left" size={48} className="min-h-screen">
      {children}
    </PageBackground>
  )
}

export function WorkflowBackground({ children }: { children: React.ReactNode }) {
  return (
    <PageBackground variant="horizontal-lines" mask="fade-y" size={32} className="min-h-screen">
      {children}
    </PageBackground>
  )
}