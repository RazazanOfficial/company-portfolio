import {getTranslations} from "next-intl/server";

export default async function LocaleHome({params: {locale}}) {
  const t = await getTranslations({locale, namespace: "HomePage"});

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
    </main>
  );
}
