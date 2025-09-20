import { redirect } from "next/navigation";
import { defaultLocale } from "../src/i18n";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
