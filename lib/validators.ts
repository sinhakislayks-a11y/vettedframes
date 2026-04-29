import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  projectType: z.enum([
    "youtube-edit",
    "reels-shortform",
    "motion-graphics",
    "saas-animation",
    "promotional-ad",
    "music-video",
    "color-grading",
    "ai-content",
    "done-for-you",
    "not-sure",
  ]),
  message: z
    .string()
    .min(20, "Please describe your project in at least 20 characters"),
  videoLink: z.string().url("Please enter a valid URL").optional().or(z.literal("").transform(() => undefined)),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const PROJECT_TYPES = [
  { value: "youtube-edit", label: "YouTube Edit (Long-form)" },
  { value: "reels-shortform", label: "Reels / Short-form" },
  { value: "motion-graphics", label: "Motion Graphics" },
  { value: "saas-animation", label: "SaaS Animation" },
  { value: "promotional-ad", label: "Promotional Ad" },
  { value: "music-video", label: "Music Video" },
  { value: "color-grading", label: "Color Grading Only" },
  { value: "ai-content", label: "AI-Generated Content" },
  { value: "done-for-you", label: "Done-For-You (Full Pipeline)" },
  { value: "not-sure", label: "Not sure yet — let's talk" },
] as const;