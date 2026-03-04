import { SmsSendersTable } from "./sms-senders-table";
import { SmsSendersToolbar } from "./sms-senders-toolbar";
import { useSmsSendersPage } from "./models/use-sms-senders-page";

export function SmsSendersPage() {
  const { table, search, setSearch } = useSmsSendersPage();

  return (
    <div className="space-y-4">
      <SmsSendersToolbar search={search} onSearchChange={setSearch} />
      <SmsSendersTable table={table} />
    </div>
  );
}
