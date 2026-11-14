"use client";

import { FormattedMessage } from "react-intl";

export function NoteLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      <FormattedMessage id="notes.loading" />
    </main>
  );
}
