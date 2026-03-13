import { useInfiniteQuery } from "@tanstack/react-query";

import type { PayInRow } from "../types";
import { mockPayInData } from "../mock-data";

const PAGE_SIZE = 15;

function buildTraderPayInList(): PayInRow[] {
  const list: PayInRow[] = [];
  const base = mockPayInData;
  const statuses: PayInRow["method"][] = ["success", "pending", "failed"];
  const now = Date.now();
  for (let i = 0; i < 60; i++) {
    const b = base[i % base.length];
    const date = new Date(now - i * 3600000 * 12);
    list.push({
      ...b,
      uid: `${b.uid}-${i}`,
      method: statuses[i % 3],
      createdAt: date.toISOString(),
    });
  }
  return list;
}

const allItems = buildTraderPayInList();

async function fetchTraderPayInPage(
  pageParam: number
): Promise<{ items: PayInRow[]; nextOffset: number | undefined }> {
  const start = pageParam * PAGE_SIZE;
  const slice = allItems.slice(start, start + PAGE_SIZE);
  const nextOffset =
    start + PAGE_SIZE < allItems.length ? pageParam + 1 : undefined;
  return { items: slice, nextOffset };
}

export function useTraderPayInList() {
  return useInfiniteQuery({
    queryKey: ["trader-pay-in-list"],
    queryFn: ({ pageParam }) => fetchTraderPayInPage(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
}
