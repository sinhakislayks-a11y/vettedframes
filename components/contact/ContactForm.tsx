"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { contactFormSchema, PROJECT_TYPES } from "@/lib/validators";
import type { ContactFormData } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import FormSuccess from "./FormSuccess";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "hook-surgery",
      message: "",
      videoLink: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setApiError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || "Something went wrong. Please try again."
        );
      }

      setIsSuccess(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setApiError(null);
    resetForm();
  };

  if (isSuccess) {
    return <FormSuccess onReset={handleReset} />;
  }

  return (
    <section className="w-full bg-surface border-t border-border-custom py-24">
      <div className="mx-auto max-w-[640px] px-6">
        <h2 className="font-display font-semibold text-xl text-text-primary mb-8 text-center">
          Or send a brief directly
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border-custom rounded-[4px] p-8 md:p-10"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="name"
                className="font-sans text-sm text-text-primary"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                className="bg-surface-elevated border-border-custom rounded-[4px] px-4 py-2.5 h-auto text-sm font-sans text-text-primary placeholder:text-text-secondary/50 focus-visible:border-brand focus-visible:ring-brand/20"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-xs text-brand font-sans">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="email"
                className="font-sans text-sm text-text-primary"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                className="bg-surface-elevated border-border-custom rounded-[4px] px-4 py-2.5 h-auto text-sm font-sans text-text-primary placeholder:text-text-secondary/50 focus-visible:border-brand focus-visible:ring-brand/20"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-brand font-sans">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-1.5">
              <Label className="font-sans text-sm text-text-primary">
                Project Type
              </Label>
              <Controller
                name="projectType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full bg-surface-elevated border-border-custom rounded-[4px] px-4 py-2.5 h-auto text-sm font-sans text-text-primary focus-visible:border-brand focus-visible:ring-brand/20 cursor-pointer">
                      <SelectValue placeholder="Select a project type" />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-elevated border-border-custom">
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                          className="text-sm text-text-primary font-sans cursor-pointer focus:bg-brand/10 focus:text-text-primary"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="message"
                className="font-sans text-sm text-text-primary"
              >
                Message
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Describe your project, your audience, and your goal."
                aria-invalid={!!errors.message}
                className="bg-surface-elevated border-border-custom rounded-[4px] px-4 py-2.5 text-sm font-sans text-text-primary placeholder:text-text-secondary/50 focus-visible:border-brand focus-visible:ring-brand/20 resize-none"
                {...register("message")}
              />
              {errors.message && (
                <span className="text-xs text-brand font-sans">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Video Link (optional) */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="videoLink"
                className="font-sans text-sm text-text-primary"
              >
                Video Link{" "}
                <span className="text-text-secondary">(optional)</span>
              </Label>
              <Input
                id="videoLink"
                type="url"
                placeholder="Paste a link to your last video — YouTube, Drive, anything works."
                className="bg-surface-elevated border-border-custom rounded-[4px] px-4 py-2.5 h-auto text-sm font-sans text-text-primary placeholder:text-text-secondary/50 focus-visible:border-brand focus-visible:ring-brand/20"
                {...register("videoLink")}
              />
            </div>

            {/* API error */}
            {apiError && (
              <div className="bg-brand/10 border border-brand/20 rounded-[4px] px-4 py-2.5">
                <p className="text-sm text-brand font-sans">{apiError}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-brand to-brand-dark text-white font-display font-semibold text-sm px-6 py-3 h-auto rounded-[4px] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:brightness-110 transition-all duration-200 disabled:opacity-50 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send brief"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
