import { useTranslation } from "react-i18next";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MOCK_REQUISITE_CARDS = [
  { cardNumber: "4111 1111 **** 1111", used: 500, limit: 1000 },
  { cardNumber: "5500 0000 **** 0004", used: 320, limit: 500 },
  { cardNumber: "3400 0000 **** 009", used: 1000, limit: 1000 },
  { cardNumber: "4111 1111 **** 1112", used: 0, limit: 2000 },
  { cardNumber: "5500 0000 **** 0005", used: 750, limit: 1500 },
];

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden
      role="img"
    >
      <circle cx="12" cy="12" r="10" fill="#EB001B" />
      <circle cx="20" cy="12" r="10" fill="#F79E1B" />
      <path
        d="M16 6.2a9.96 9.96 0 0 1 4.2 8.8 9.96 9.96 0 0 1-4.2 8.8 9.96 9.96 0 0 1-4.2-8.8A9.96 9.96 0 0 1 16 6.2z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function formatCardMasked(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return last4.length >= 4 ? `**** ${last4}` : cardNumber;
}

function getLimitRatio(used: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(1, used / limit);
}

function getProgressBarFillClass(used: number, limit: number): string {
  if (limit <= 0) return "bg-muted";
  const ratio = used / limit;
  if (ratio >= 0.85) return "bg-destructive/60";
  return "bg-success/60";
}

export function TraderDashboardRequisitesSection() {
  const { t } = useTranslation();

  return (
    <section
      className="min-h-0 flex-1 py-6"
      aria-label={t("trader.dashboard.mainSection")}
    >
      <h2 className="mb-4 text-lg font-medium text-foreground">
        {t("trader.dashboard.activeRequisites")}
      </h2>
      {/* Break out of trader dashboard p-4 and root content px-4/sm:px-6 so carousel reaches main edges */}
      <div className="-mx-8 sm:-mx-10">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="ml-0 pl-8 sm:pl-10 mr-10 py-0.5">
            {MOCK_REQUISITE_CARDS.map((item, i) => (
              <CarouselItem
                key={i}
                className="min-w-[56vw] max-w-[56vw] shrink-0 pl-4 first:pl-0 select-none"
              >
                <Card className="overflow-hidden rounded-2xl border-0 bg-linear-to-b from-black to-black/80 shadow-lg">
                  <CardContent className="flex flex-col justify-center gap-3 p-4 pb-3">
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <span className="min-w-0 truncate font-mono text-sm tabular-nums leading-none tracking-wide text-white">
                        {formatCardMasked(item.cardNumber)}
                      </span>
                      <MastercardLogo className="size-8 shrink-0" />
                    </div>
                    <span className="flex items-baseline gap-1.5 text-lg font-semibold tabular-nums text-white">
                      {t("trader.dashboard.cardLimit", {
                        used: item.used.toLocaleString(),
                        limit: item.limit.toLocaleString(),
                      })}
                      <span className="text-xs font-medium text-white/70">
                        USDT
                      </span>
                    </span>
                  </CardContent>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-b-2xl bg-white/20"
                    role="progressbar"
                    aria-valuenow={item.used}
                    aria-valuemin={0}
                    aria-valuemax={item.limit}
                    aria-label={t("trader.dashboard.cardLimit", {
                      used: item.used.toLocaleString(),
                      limit: item.limit.toLocaleString(),
                    })}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-300 ease-out",
                        getProgressBarFillClass(item.used, item.limit)
                      )}
                      style={{
                        width: `${getLimitRatio(item.used, item.limit) * 100}%`,
                      }}
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
