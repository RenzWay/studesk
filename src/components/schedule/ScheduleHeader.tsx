import { CalendarDays } from "lucide-react";
import { FormattedMessage } from "react-intl";

export function ScheduleHeader({
  selectedCount,
  upcomingCount,
}: {
  selectedCount: number;
  upcomingCount: number;
}) {
  return (
    <header className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
            <CalendarDays className="size-4" />
            <FormattedMessage id="schedule.header.label" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <FormattedMessage id="schedule.header.title" />
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            <FormattedMessage id="schedule.header.description" />
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <Count labelId="schedule.header.selected" value={selectedCount} />
          <Count labelId="schedule.header.upcoming" value={upcomingCount} />
        </div>
      </div>
    </header>
  );
}

function Count({ labelId, value }: { labelId: string; value: number }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        <FormattedMessage id={labelId} />
      </p>
      <p className="mt-1 text-lg font-bold">{value}</p>
    </div>
  );
}
