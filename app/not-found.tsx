import type { Metadata } from "next";
import { ErrorScreen } from "@/components/ui/ErrorScreen";

export const metadata: Metadata = {
  title: "404 — Frame Not Found",
  description: "This frame didn't make the cut.",
};

export default function NotFound() {
  return <ErrorScreen errorCode="404" />;
}
