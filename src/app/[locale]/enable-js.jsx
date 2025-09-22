"use client";
import Retro404 from "@/components/Retro404";
import { useTranslations } from "next-intl";

export default function EnableJsPage() {
  const t = useTranslations("enableJs");
  return (
    <div>
      <Retro404 />
    </div>
  );
}
