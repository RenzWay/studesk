"use client";

import type { ChangeEvent } from "react";
import { NotebookPen, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/app/lib/formatdate";
import {
  noteCategoryMessageIds,
  stripHtml,
  type NoteEntry,
} from "@/hooks/useNote";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocale } from "@/providers/IntlProvider";

type NoteLibraryProps = {
  notes: NoteEntry[];
  filteredNotes: NoteEntry[];
  selectedNote: NoteEntry | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (note: NoteEntry) => void;
  onCreate: () => void;
};

export function NoteLibrary({
  notes,
  filteredNotes,
  selectedNote,
  search,
  onSearchChange,
  onSelect,
  onCreate,
}: NoteLibraryProps) {
  const intl = useIntl();
  const { locale } = useLocale();
  const dateLocale = locale === "id" ? "id-ID" : "en-US";

  return (
    <aside
      className={`${selectedNote ? "hidden lg:flex" : "flex"} w-full min-w-0 max-w-full min-h-[72dvh] flex-col rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:min-h-0`}
    >
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-slate-950 dark:text-slate-50">
              <FormattedMessage id="notes.library.title" />
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <FormattedMessage
                id="notes.library.count"
                values={{ count: notes.length }}
              />
            </p>
          </div>
          <Button
            onClick={onCreate}
            size="icon"
            variant="outline"
            aria-label={intl.formatMessage({ id: "notes.create" })}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onSearchChange(event.target.value)
            }
            placeholder={intl.formatMessage({
              id: "notes.library.searchPlaceholder",
            })}
            className="h-10 pl-10"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {filteredNotes.length ? (
          <div className="min-w-0 space-y-2">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => onSelect(note)}
                className={`w-full min-w-0 max-w-full overflow-hidden rounded-lg border p-3 text-left transition-colors ${selectedNote?.id === note.id ? "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/40" : "border-slate-200 bg-slate-50 hover:border-violet-200 hover:bg-violet-50/60 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-violet-900 dark:hover:bg-violet-950/20"}`}
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {note.title || (
                        <FormattedMessage id="notes.untitled" />
                      )}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(note.date, dateLocale)}
                    </p>
                  </div>
                  <span className="max-w-[45%] shrink rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 truncate">
                    {noteCategoryMessageIds[note.category || "None"] ? (
                      <FormattedMessage
                        id={noteCategoryMessageIds[note.category || "None"]}
                      />
                    ) : (
                      note.category
                    )}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 wrap-break-word text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {stripHtml(note.content) || (
                    <FormattedMessage id="notes.library.noContent" />
                  )}
                </p>
              </button>
            ))}
          </div>
        ) : notes.length ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-4 text-center">
            <Search className="mb-3 size-8 text-slate-400" />
            <p className="font-medium text-slate-700 dark:text-slate-200">
              <FormattedMessage id="notes.library.noResults" />
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <FormattedMessage id="notes.library.tryAnotherSearch" />
            </p>
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <NotebookPen className="mb-4 size-10 text-slate-400 dark:text-slate-500" />
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              <FormattedMessage id="notes.library.emptyTitle" />
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              <FormattedMessage id="notes.library.emptyDescription" />
            </p>
            <Button onClick={onCreate} className="mt-5">
              <Plus className="size-4" />
              <FormattedMessage id="notes.create" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
