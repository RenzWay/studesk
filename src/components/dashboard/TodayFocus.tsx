"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { FormattedMessage } from "react-intl";
import type { ReactNode } from "react";

type FocusItem = { title: string };

export function TodayFocus({
  completionRate,
  nextTask,
  nextAgenda,
}: {
  completionRate: number;
  nextTask?: FocusItem;
  nextAgenda?: FocusItem;
}) {
  return (
    <Card className="rounded-lg border-slate-200 bg-white py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:py-6">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold">
              <FormattedMessage id="dashboard.todayFocus" />
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <FormattedMessage id="dashboard.focusDescription" />
            </p>
          </div>
          <Sparkles className="size-5 text-amber-500 dark:text-amber-300" />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="mb-4 sm:mb-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              <FormattedMessage id="dashboard.taskCompletion" />
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
        <div className="grid gap-3 sm:grid-cols-2">
          <FocusTile
            label={<FormattedMessage id="dashboard.nextTask" />}
            value={
              nextTask?.title || (
                <FormattedMessage id="dashboard.noActiveTask" />
              )
            }
          />
          <FocusTile
            label={<FormattedMessage id="dashboard.nextAgenda" />}
            value={
              nextAgenda?.title || (
                <FormattedMessage id="dashboard.noAgenda" />
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function FocusTile({
  label,
  value,
}: {
  label: ReactNode;
  value: ReactNode;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 sm:p-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p
        className="mt-2 line-clamp-2 wrap-break-word font-semibold"
        style={{ overflowWrap: "anywhere" }}
      >
        {value}
      </p>
    </div>
  );
}
