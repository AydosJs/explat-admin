import { PaymentReserveTable } from "./payment-reserve-table";
import { PaymentReserveToolbar } from "./payment-reserve-toolbar";
import { usePaymentReservePage } from "./models/use-payment-reserve-page";

export function PaymentReservePage() {
  const { table, search, setSearch } = usePaymentReservePage();

  return (
    <div className="space-y-4">
      <PaymentReserveToolbar search={search} onSearchChange={setSearch} />
      <PaymentReserveTable table={table} />
    </div>
  );
}
