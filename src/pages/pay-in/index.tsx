import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import { PayInTable } from "./pay-in-table";
import { PayInToolbar } from "./pay-in-toolbar";
import { usePayInPage } from "./models/use-pay-in-page";

export function PayInPage() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    table,
    search,
    setSearch,
    merchantFilter,
    setMerchantFilter,
    merchantOptions,
    traderFilter,
    setTraderFilter,
    traderOptions,
    amountMin,
    setAmountMin,
    amountMax,
    setAmountMax,
    dateRange,
    setDateRange,
    selectedCount,
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleConfirmDelete,
    pageSizeOptions,
  } = usePayInPage();

  return (
    <div className="space-y-4">
      <PayInToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCount={selectedCount}
        deleteDialogOpen={deleteDialogOpen}
        onDeleteDialogOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
        filterOpen={filterOpen}
        onFilterOpenChange={setFilterOpen}
      />
      <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
        <CollapsibleContent
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
        >
          <div className="rounded-md border border-border/50 bg-muted/30 px-3 py-3 sm:px-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pay-in-filter-merchant">{t("payIn.merchant")}</Label>
                <Select
                  value={merchantFilter || "all"}
                  onValueChange={(v) => setMerchantFilter(v === "all" ? "" : v)}
                >
                  <SelectTrigger id="pay-in-filter-merchant" className="w-full shadow-none bg-background dark:bg-table dark:border-border/50">
                    <SelectValue placeholder={t("payIn.allMerchants")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("payIn.allMerchants")}</SelectItem>
                    {merchantOptions.map(({ merchantId, merchantName }) => (
                      <SelectItem key={merchantId} value={merchantId}>
                        {merchantName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="pay-in-filter-trader">{t("payIn.trader")}</Label>
                <Select
                  value={traderFilter || "all"}
                  onValueChange={(v) => setTraderFilter(v === "all" ? "" : v)}
                >
                  <SelectTrigger id="pay-in-filter-trader" className="w-full shadow-none bg-background dark:bg-table dark:border-border/50">
                    <SelectValue placeholder={t("payIn.allTraders")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("payIn.allTraders")}</SelectItem>
                    {traderOptions.map(({ traderId, traderName }) => (
                      <SelectItem key={traderId} value={traderId}>
                        {traderName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{t("payIn.amountUsd")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pay-in-filter-amount-min"
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder={t("payIn.amountFrom")}
                    value={amountMin}
                    onChange={(e) => setAmountMin(e.target.value)}
                    className="w-full shadow-none bg-background dark:bg-table dark:border-border/50"
                    aria-label={t("payIn.amountFrom")}
                  />
                  <span className="shrink-0 text-muted-foreground">–</span>
                  <Input
                    id="pay-in-filter-amount-max"
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder={t("payIn.amountTo")}
                    value={amountMax}
                    onChange={(e) => setAmountMax(e.target.value)}
                    className="w-full shadow-none bg-background dark:bg-table dark:border-border/50"
                    aria-label={t("payIn.amountTo")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{t("payIn.createdAt")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="pay-in-filter-date"
                      className="min-w-0 w-full justify-start px-2.5 text-left font-normal shadow-none bg-background data-[empty=true]:text-muted-foreground dark:bg-table dark:border-border/50"
                      data-empty={!dateRange?.from}
                    >
                      <CalendarIcon className="size-4 shrink-0" />
                      <span className="min-w-0 truncate">
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        t("payIn.pickDateRange")
                      )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 sm:max-w-none"
                    align="start"
                    sideOffset={8}
                  >
                    <Calendar
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={isMobile ? 1 : 2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <PayInTable table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  );
}
