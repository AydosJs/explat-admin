import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setIsSubmitting(true);
    try {
      // TODO: replace with real auth API
      await new Promise((r) => setTimeout(r, 800));
      console.log("Login", { email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="mb-6 w-full max-w-xs space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight">
          {t("login.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="login-email">{t("login.email")}</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">{t("login.password")}</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            className="h-10"
          />
        </div>
        <Button type="submit" className="h-10" disabled={isSubmitting}>
          {isSubmitting ? t("login.submitting") : t("login.submit")}
        </Button>
      </form>
    </div>
  );
}
