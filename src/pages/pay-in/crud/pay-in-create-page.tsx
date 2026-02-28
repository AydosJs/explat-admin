import { PayInForm } from "./pay-in-form";
import type { PayInFormValues } from "./pay-in-form-schema";

const emptyFormValues: PayInFormValues = {
  name: "",
  information: "",
  amount: "",
  status: "pending",
  merchant: null,
  trader: null,
};

export function PayInCreatePage() {
  const handleSubmit = (data: PayInFormValues) => {
    // Create page: send filled form data to API
    // TODO: call create API, e.g. await api.createPayIn(data); then navigate
    console.log("Pay-in create submit", data);
  };

  return (
    <PayInForm
      defaultValues={emptyFormValues}
      onSubmit={handleSubmit}
    />
  );
}
