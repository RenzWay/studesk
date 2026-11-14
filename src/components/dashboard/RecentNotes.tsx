import { SectionCard } from "@/components/dashboard/SectionCard";
import { EmptyState } from "@/components/EmptyState";
import type { DashboardNote } from "@/hooks/useDashboard";
import { FormattedMessage } from "react-intl";

export function RecentNotes({ notes }: { notes: DashboardNote[] }) {
  const recentNotes = notes.slice(0, 3);
  return (
    <SectionCard
      title={<FormattedMessage id="dashboard.recentNotes" />}
      description={<FormattedMessage id="dashboard.recentNotesDescription" />}
      href="/note"
      action={<FormattedMessage id="dashboard.notesAction" />}
    >
      {recentNotes.length ? (
        recentNotes.map((note) => (
          <article
            key={note.id}
            className="w-full min-w-0 max-w-full overflow-hidden rounded-md border border-violet-100 bg-violet-50 p-3 dark:border-violet-900/70 dark:bg-violet-950/30 sm:p-4"
          >
            <p className="wrap-break-word font-semibold text-violet-950 dark:text-violet-100">
              {note.title || (
                <FormattedMessage id="dashboard.untitledNote" />
              )}
            </p>
            <div
              className="mt-2 line-clamp-2 wrap-break-word text-sm text-violet-700 dark:text-violet-300 **:max-w-full [&_a]:break-all [&_img]:h-auto [&_img]:max-w-full"
              style={{ overflowWrap: "anywhere" }}
              dangerouslySetInnerHTML={{ __html: note.content || "" }}
            />
          </article>
        ))
      ) : (
        <EmptyState label={<FormattedMessage id="dashboard.noNotes" />} />
      )}
    </SectionCard>
  );
}
