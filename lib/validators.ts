import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  projectType: z.enum([
    "hook-surgery",
    "retention-engine",
    "done-for-you",
    "quick-question",
  ]),
  message: z
    .string()
    .min(20, "Please describe your project in at least 20 characters"),
  videoLink: z.string().url("Please enter a valid URL").optional().or(z.literal("").transform(() => undefined)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const PROJECT_TYPES = [
  { value: "hook-surgery", label: "Hook Surgery" },
  { value: "retention-engine", label: "Retention Engine" },
  { value: "done-for-you", label: "Done-For-You" },
  { value: "quick-question", label: "Quick question" },
] as const;
