import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddMerchantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMerchantDialog({ open, onOpenChange }: AddMerchantDialogProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setTitle("");
      setDescription("");
    }
    onOpenChange(next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit new merchant (e.g. API), then close and optionally pass data to parent
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("payInCreate.addMerchantDialogTitle")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <Field>
            <FieldLabel>{t("payInCreate.addMerchantTitle")}</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("payInCreate.addMerchantTitle")}
                aria-label={t("payInCreate.addMerchantTitle")}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>{t("payInCreate.addMerchantDescription")}</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("payInCreate.addMerchantDescription")}
                aria-label={t("payInCreate.addMerchantDescription")}
              />
            </FieldContent>
          </Field>
          <DialogFooter>
            <DialogClose>{t("common.close")}</DialogClose>
            <Button type="submit">{t("common.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
