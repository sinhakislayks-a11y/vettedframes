import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://frames.kislay.in",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://frames.kislay.in/workflow",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://frames.kislay.in/contact",
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}