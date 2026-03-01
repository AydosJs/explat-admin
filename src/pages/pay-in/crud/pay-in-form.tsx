import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddMerchantDialog } from "@/pages/pay-in/crud/add-merchant-dialog";
import {
  payInFormSchema,
  type PayInFormValues,
} from "@/pages/pay-in/crud/pay-in-form-schema";

const STATUS_OPTIONS = [
  { value: "success", labelKey: "payIn.statusSuccess" },
  { value: "pending", labelKey: "payIn.statusPending" },
  { value: "failed", labelKey: "payIn.statusFailed" },
] as const;

type Option = { value: string; label: string };

const MERCHANT_OPTIONS: Option[] = [
  { value: "merchant-one", label: "Merchant One" },
  { value: "merchant-two", label: "Merchant Two" },
  { value: "merchant-three", label: "Merchant Three" },
  { value: "merchant-four", label: "Merchant Four" },
  { value: "merchant-five", label: "Merchant Five" },
];

const TRADER_OPTIONS: Option[] = [
  { value: "trader-alpha", label: "Trader Alpha" },
  { value: "trader-beta", label: "Trader Beta" },
  { value: "trader-gamma", label: "Trader Gamma" },
  { value: "trader-delta", label: "Trader Delta" },
  { value: "trader-epsilon", label: "Trader Epsilon" },
];

function translateError(
  t: (key: string) => string,
  message: string | undefined
): string | undefined {
  if (!message) return message;
  if (message.startsWith("payInCreate.validation.")) return t(message);
  return message;
}

export interface PayInFormProps {
  /** Initial values: empty for create, loaded from API for edit */
  defaultValues: PayInFormValues;
  /** Called with validated form data when user submits */
  onSubmit: (data: PayInFormValues) => void;
}

export function PayInForm({ defaultValues, onSubmit }: PayInFormProps) {
  const { t } = useTranslation();
  const [addMerchantDialogOpen, setAddMerchantDialogOpen] = useState(false);

  const form = useForm<PayInFormValues>({
    resolver: zodResolver(payInFormSchema),
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("payInCreate.mainInfo")}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.name}>
            <FieldLabel>{t("payInCreate.name")}</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                {...register("name")}
                placeholder={t("payInCreate.name")}
                aria-label={t("payInCreate.name")}
                aria-invalid={!!errors.name}
              />
              <FieldError errors={errors.name ? [errors.name] : undefined} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!errors.information}>
            <FieldLabel>{t("payInCreate.information")}</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                {...register("information")}
                placeholder={t("payInCreate.information")}
                aria-label={t("payInCreate.information")}
                aria-invalid={!!errors.information}
              />
              <FieldError errors={errors.information ? [errors.information] : undefined} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!errors.merchant}>
            <FieldLabel>{t("payInCreate.merchant")}</FieldLabel>
            <FieldContent>
              <div className="flex w-full gap-2">
                <Controller
                  name="merchant"
                  control={control}
                  render={({ field }) => (
                    <div className="min-w-0 flex-1">
                      <Combobox
                        items={MERCHANT_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <ComboboxInput
                          className="w-full"
                          placeholder={t("payInCreate.merchant")}
                          aria-label={t("payInCreate.merchant")}
                          showClear={!!field.value}
                          aria-invalid={!!errors.merchant}
                        />
                        <ComboboxContent>
                          <ComboboxEmpty>{t("payInCreate.noResults")}</ComboboxEmpty>
                          <ComboboxList>
                            {(item: Option) => (
                              <ComboboxItem key={item.value} value={item}>
                                {item.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAddMerchantDialogOpen(true)}
                  aria-label={t("payInCreate.addMerchant")}
                  className="shrink-0"
                >
                  <PlusIcon className="size-4" />
                </Button>
              </div>
              <FieldError
                errors={
                  errors.merchant
                    ? [{ message: translateError(t, errors.merchant.message) }]
                    : undefined
                }
              />
            </FieldContent>
          </Field>
          <Field data-invalid={!!errors.trader}>
            <FieldLabel>{t("payInCreate.trader")}</FieldLabel>
            <FieldContent>
              <Controller
                name="trader"
                control={control}
                render={({ field }) => (
                  <Combobox
                    items={TRADER_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxInput
                      className="w-full"
                      placeholder={t("payInCreate.trader")}
                      aria-label={t("payInCreate.trader")}
                      showClear={!!field.value}
                      aria-invalid={!!errors.trader}
                    />
                    <ComboboxContent>
                      <ComboboxEmpty>{t("payInCreate.noResults")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item: Option) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />
              <FieldError
                errors={
                  errors.trader
                    ? [{ message: translateError(t, errors.trader.message) }]
                    : undefined
                }
              />
            </FieldContent>
          </Field>
          <Field data-invalid={!!errors.amount}>
            <FieldLabel>{t("payInCreate.amount")}</FieldLabel>
            <FieldContent>
              <Input
                type="text"
                inputMode="decimal"
                {...register("amount")}
                placeholder={t("payInCreate.amount")}
                aria-label={t("payInCreate.amount")}
                aria-invalid={!!errors.amount}
              />
              <FieldError
                errors={
                  errors.amount
                    ? [{ message: translateError(t, errors.amount.message) }]
                    : undefined
                }
              />
            </FieldContent>
          </Field>
          <Field data-invalid={!!errors.status}>
            <FieldLabel>{t("payInCreate.status")}</FieldLabel>
            <FieldContent>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full" aria-invalid={!!errors.status}>
                      <SelectValue placeholder={t("payInCreate.status")} />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {t(opt.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                errors={
                  errors.status
                    ? [{ message: translateError(t, errors.status.message) }]
                    : undefined
                }
              />
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("payInCreate.cardData")}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Card data fields can be added here */}
        </CardContent>
      </Card>

      <AddMerchantDialog
        open={addMerchantDialogOpen}
        onOpenChange={setAddMerchantDialogOpen}
      />
    </form>
  );
}
