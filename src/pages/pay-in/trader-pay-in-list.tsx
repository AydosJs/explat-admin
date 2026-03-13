import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { format } from "date-fns";

import type { PayInRow, PayInMethodStatus } from "./types";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useTraderPayInList } from "./models/use-trader-pay-in-list";
import { cn } from "@/lib/utils";

const STATUS_LINE_MAP: Record<PayInMethodStatus, string> = {
  success: "bg-success",
  pending: "bg-orange",
  failed: "bg-destructive",
};

function formatAmount(amountUsd: number): string {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountUsd);
}

/** Card 16 digits in format 1111 1111 **** 1111: first 8 (4+4), middle *, last 4. Uses requisite for first 8 when card has only last 4. */
function formatCardDisplay(card: string, requisite?: string): string {
  const cardDigits = card.replace(/\D/g, "");
  const requisiteDigits = requisite?.replace(/\D/g, "") ?? "";
  const firstEight =
    requisiteDigits.length >= 8
      ? requisiteDigits.slice(0, 8)
      : cardDigits.length >= 8
        ? cardDigits.slice(0, 8)
        : null;
  const lastFour = cardDigits.length >= 4 ? cardDigits.slice(-4) : cardDigits;
  if (firstEight && lastFour.length === 4) {
    return `${firstEight.slice(0, 4)} ${firstEight.slice(4, 8)} **** ${lastFour}`;
  }
  if (cardDigits.length >= 12) {
    return `${cardDigits.slice(0, 4)} ${cardDigits.slice(4, 8)} **** ${cardDigits.slice(-4)}`;
  }
  if (cardDigits.length === 4) {
    return `**** **** **** ${lastFour}`;
  }
  return card;
}

function groupByDate(items: PayInRow[]): Map<string, PayInRow[]> {
  const map = new Map<string, PayInRow[]>();
  for (const item of items) {
    const key = format(new Date(item.createdAt), "yyyy-MM-dd");
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return map;
}

const METHOD_LABEL_KEYS: Record<PayInMethodStatus, string> = {
  success: "payIn.statusSuccess",
  pending: "payIn.statusPending",
  failed: "payIn.statusFailed",
};

function TransactionDetailPanel({ item }: { item: PayInRow }) {
  const { t } = useTranslation();
  const cardDisplay = formatCardDisplay(item.card, item.requisite);
  const createdAtLabel = dayjs(item.createdAt).format("D MMMM YYYY HH:mm");

  return (
    <div className="border-t border-border bg-muted/20 px-4 py-4">
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-muted-foreground">{t("payIn.uid")}</dt>
          <dd className="font-mono tabular-nums">{item.uid}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.merchant")}</dt>
          <dd>{item.merchant}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.trader")}</dt>
          <dd>{item.trader}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.requisite")}</dt>
          <dd className="font-mono tabular-nums break-all">{item.requisite}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.method")}</dt>
          <dd>{t(METHOD_LABEL_KEYS[item.method])}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.device")}</dt>
          <dd>{item.device}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.amountUsd")}</dt>
          <dd className="tabular-nums">
            {formatAmount(item.amountUsd)} USD
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.currencyEur")}</dt>
          <dd className="tabular-nums">{formatAmount(item.amountEur)} EUR</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("payIn.card")}</dt>
          <dd className="font-mono tabular-nums tracking-wide">{cardDisplay}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted-foreground">{t("payIn.createdAt")}</dt>
          <dd>{createdAtLabel}</dd>
        </div>
      </dl>
    </div>
  );
}

function TransactionRow({
  item,
  isExpanded,
  onOpenChange,
}: {
  item: PayInRow;
  isExpanded: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const timeLabel = format(new Date(item.createdAt), "HH:mm");
  const amountLabel = `${formatAmount(item.amountUsd)} USD`;
  const lineClassName = STATUS_LINE_MAP[item.method];
  const cardDisplay = formatCardDisplay(item.card, item.requisite);

  return (
    <Collapsible open={isExpanded} onOpenChange={onOpenChange}>
      <div className="flex flex-col">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "relative flex w-full flex-col gap-3 overflow-hidden bg-muted/30 pl-5 pr-4 py-4 text-left transition-colors hover:bg-muted/50 active:bg-muted/70",
              "touch-manipulation",
              isExpanded && "bg-muted/40"
            )}
          >
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 w-0.5",
                lineClassName
              )}
              aria-hidden
            />
            <span className="text-sm font-medium tabular-nums tracking-wide text-foreground min-w-0 truncate">
              {cardDisplay}
            </span>
            <div className="flex flex-row items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                {timeLabel}
              </span>
              <span className="text-lg font-semibold tabular-nums text-foreground">
                {amountLabel}
              </span>
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TransactionDetailPanel item={item} />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function TraderPayInList() {
  const { t } = useTranslation();
  const [expandedUid, setExpandedUid] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useTraderPayInList();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void fetchNextPage();
      },
      { rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8 text-muted-foreground">
        {t("common.loading")}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-destructive">
        {t("payIn.noData")}
      </div>
    );
  }

  const rows = data?.pages.flatMap((p) => p.items) ?? [];
  if (rows.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t("payIn.noData")}
      </div>
    );
  }

  const byDate = groupByDate(rows);
  const sortedDates = Array.from(byDate.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <div className="flex flex-col gap-6">
      {sortedDates.map((dateKey) => {
        const dateLabel = dayjs(dateKey).format("D MMMM YYYY");
        const items = byDate.get(dateKey) ?? [];
        return (
          <section key={dateKey} className="flex flex-col">
            <h2 className="sticky top-0 z-10 bg-background/95 px-1 py-2 text-sm font-medium text-muted-foreground backdrop-blur supports-backdrop-filter:bg-background/80">
              {dateLabel}
            </h2>
            <div className="flex flex-col divide-y divide-border">
              {items.map((item) => (
                <TransactionRow
                  key={item.uid}
                  item={item}
                  isExpanded={expandedUid === item.uid}
                  onOpenChange={(open) =>
                    setExpandedUid(open ? item.uid : null)
                  }
                />
              ))}
            </div>
          </section>
        );
      })}
      <div ref={sentinelRef} className="h-4 shrink-0" aria-hidden />
      {isFetchingNextPage && (
        <div className="py-2 text-center text-sm text-muted-foreground">
          {t("common.loading")}
        </div>
      )}
    </div>
  );
}
