import { PayInForm } from "./pay-in-form";
import type { PayInFormValues } from "./pay-in-form-schema";

const mockFormValues: PayInFormValues = {
  name: "Stub name",
  information: "Stub info",
  amount: "100",
  status: "success",
  merchant: { value: "merchant-one", label: "Merchant One" },
  trader: { value: "trader-alpha", label: "Trader Alpha" },
};

export interface PayInEditPageProps {
  payInId: string;
}

export function PayInEditPage({ payInId }: PayInEditPageProps) {
  const handleSubmit = (data: PayInFormValues) => {
    console.log("Pay-in edit submit", payInId, data);
  };

  return (
    <PayInForm
      key={payInId}
      defaultValues={mockFormValues}
      onSubmit={handleSubmit}
    />
  );
}
