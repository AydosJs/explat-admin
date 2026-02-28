import { z } from "zod";

export const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const payInFormSchema = z.object({
  name: z.string().min(1, "payInCreate.validation.nameRequired"),
  information: z.string(),
  amount: z
    .string()
    .min(1, "payInCreate.validation.amountRequired")
    .refine(
      (v) => !Number.isNaN(Number(v)) && Number(v) > 0,
      "payInCreate.validation.amountPositive"
    ),
  status: z.enum(["success", "pending", "failed"], {
    message: "payInCreate.validation.statusRequired",
  }),
  merchant: optionSchema.nullable(),
  trader: optionSchema.nullable(),
});

export type PayInFormValues = z.infer<typeof payInFormSchema>;
