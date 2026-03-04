import { SmsTemplatesTable } from "./sms-templates-table";
import { SmsTemplatesToolbar } from "./sms-templates-toolbar";
import { useSmsTemplatesPage } from "./models/use-sms-templates-page";

export function SmsTemplatesPage() {
  const { table, search, setSearch } = useSmsTemplatesPage();

  return (
    <div className="space-y-4">
      <SmsTemplatesToolbar search={search} onSearchChange={setSearch} />
      <SmsTemplatesTable table={table} />
    </div>
  );
}
