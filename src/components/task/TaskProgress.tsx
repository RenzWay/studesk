import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedMessage } from "react-intl";

export function TaskProgress({
  completionRate,
  nextTask,
  todayCount,
}: {
  completionRate: number;
  nextTask?: string;
  todayCount: number;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-base font-bold">
          <FormattedMessage id="tasks.progress.title" />
        </CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <FormattedMessage id="tasks.progress.description" />
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              <FormattedMessage id="tasks.progress.completion" />
            </span>
            <span className="font-bold">{completionRate}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-600 transition-all dark:bg-sky-400"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <FormattedMessage id="tasks.progress.nextActiveTask" />
            </p>
            <p className="mt-2 line-clamp-2 font-semibold">
              {nextTask || (
                <FormattedMessage id="tasks.progress.noActiveTask" />
              )}
            </p>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <FormattedMessage id="tasks.progress.today" />
            </p>
            <p className="mt-2 font-semibold">
              <FormattedMessage
                id="tasks.progress.dueTodayCount"
                values={{ count: todayCount }}
              />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
