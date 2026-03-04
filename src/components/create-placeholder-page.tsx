import { useTranslation } from "react-i18next";

interface CreatePlaceholderPageProps {
  /** i18n key for the short description (e.g. "payOut.createPlaceholder") */
  descriptionKey: string;
}

/**
 * Minimal placeholder for create pages. Use when the create form is not yet implemented.
 */
export function CreatePlaceholderPage({ descriptionKey }: CreatePlaceholderPageProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">{t(descriptionKey)}</p>
    </div>
  );
}
