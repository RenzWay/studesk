import { SectionCard } from "@/components/dashboard/SectionCard";
import { EmptyState } from "@/components/EmptyState";
import { formatDate } from "@/app/lib/formatdate";
import type { DashboardScheduleItem } from "@/hooks/useDashboard";
import { FormattedMessage } from "react-intl";
import { useLocale } from "@/providers/IntlProvider";

export function ScheduleToday({ items }: { items: DashboardScheduleItem[] }) {
  const { locale } = useLocale();
  const dateLocale = locale === "id" ? "id-ID" : "en-US";
  const visibleItems = items.slice(0, 3);
  return (
    <SectionCard
      title={<FormattedMessage id="dashboard.scheduleToday" />}
      description={<FormattedMessage id="dashboard.scheduleDescription" />}
      href="/schedule"
      action={<FormattedMessage id="dashboard.scheduleAction" />}
    >
      {visibleItems.length ? (
        visibleItems.map((item) => (
          <div
            key={item.id}
            className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-900/70 dark:bg-emerald-950/30 sm:p-4"
          >
            <p
              className="wrap-break-word font-semibold text-emerald-950 dark:text-emerald-100"
              style={{ overflowWrap: "anywhere" }}
            >
              {item.title}
            </p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
              {formatDate(item.date, dateLocale)}
            </p>
          </div>
        ))
      ) : (
        <EmptyState label={<FormattedMessage id="dashboard.noSchedule" />} />
      )}
    </SectionCard>
  );
}
