import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

import type { PayInRow, PayInMethodStatus } from "./types";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useTraderPayInList } from "./models/use-trader-pay-in-list";
import { cn } from "@/lib/utils";

const STATUS_TEXT_MAP: Record<PayInMethodStatus, string> = {
  success: "text-success",
  pending: "text-orange",
  failed: "text-destructive",
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

const METHOD_LABEL_KEYS: Record<PayInMethodStatus, string> = {
  success: "payIn.statusSuccess",
  pending: "payIn.statusPending",
  failed: "payIn.statusFailed",
};

/** Format for card header: "Today 04:30", "Yesterday 04:30", or "14 Mar 04:30". */
function formatCardDateLabel(
  createdAt: string,
  t: (key: string) => string
): string {
  const d = dayjs(createdAt);
  const time = d.format("HH:mm");
  if (d.isToday()) return `${t("payIn.today")} ${time}`;
  if (d.isYesterday()) return `${t("payIn.yesterday")} ${time}`;
  return d.format("D MMM HH:mm");
}

function TransactionDetailPanel({ item }: { item: PayInRow }) {
  const { t } = useTranslation();
  const cardDisplay = formatCardDisplay(item.card, item.requisite);
  const createdAtLabel = dayjs(item.createdAt).format("D MMMM YYYY HH:mm");

  return (
    <div className="rounded-b-lg border-t border-border bg-muted/30 px-4 py-4 dark:bg-muted/20">
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
  dateLabel,
}: {
  item: PayInRow;
  isExpanded: boolean;
  onOpenChange: (open: boolean) => void;
  dateLabel: string;
}) {
  const { t } = useTranslation();
  const amountLabel = `${formatAmount(item.amountUsd)} USD`;
  const cardDisplay = formatCardDisplay(item.card, item.requisite);
  const statusLabel = t(METHOD_LABEL_KEYS[item.method]);

  return (
    <Collapsible open={isExpanded} onOpenChange={onOpenChange}>
      <div className="flex flex-col">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full flex-row items-center justify-between gap-4 overflow-hidden rounded-lg bg-muted/40 px-4 py-3 text-left transition-colors hover:bg-muted/60 active:bg-muted/70 dark:bg-card dark:hover:bg-muted/50",
              "touch-manipulation",
              isExpanded && "rounded-b-none bg-muted/50 dark:bg-muted/30"
            )}
          >
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <span className="truncate text-sm font-medium tabular-nums tracking-wide text-foreground leading-tight">
                {cardDisplay}
              </span>
              <span className="text-xs text-muted-foreground/80 tabular-nums leading-tight">
                {dateLabel}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end justify-center gap-2">
              <span className="text-sm font-semibold tabular-nums text-foreground leading-tight">
                {amountLabel}
              </span>
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  STATUS_TEXT_MAP[item.method]
                )}
              >
                {statusLabel}
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

  const sortedRows = [...rows].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        {sortedRows.map((item) => (
          <TransactionRow
            key={item.uid}
            item={item}
            dateLabel={formatCardDateLabel(item.createdAt, t)}
            isExpanded={expandedUid === item.uid}
            onOpenChange={(open) =>
              setExpandedUid(open ? item.uid : null)
            }
          />
        ))}
      </div>
      <div ref={sentinelRef} className="h-4 shrink-0" aria-hidden />
      {isFetchingNextPage && (
        <div className="py-2 text-center text-sm text-muted-foreground">
          {t("common.loading")}
        </div>
      )}
    </div>
  );
}
