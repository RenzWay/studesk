"use client";

import type {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
} from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar28 } from "@/app/lib/Calendar28";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormattedMessage, useIntl } from "react-intl";

type TaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDate: Dispatch<SetStateAction<Date>>;
  submitting: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function TaskDialog({
  open,
  onOpenChange,
  mode,
  title,
  setTitle,
  setDate,
  submitting,
  onSubmit,
}: TaskDialogProps) {
  const intl = useIntl();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            <FormattedMessage
              id={
                mode === "edit"
                  ? "tasks.dialog.editTitle"
                  : "tasks.dialog.createTitle"
              }
            />
          </DialogTitle>
          <DialogDescription>
            <FormattedMessage
              id={
                mode === "edit"
                  ? "tasks.dialog.editDescription"
                  : "tasks.dialog.createDescription"
              }
            />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={`${mode}-task-title`}>
              <FormattedMessage id="tasks.dialog.titleLabel" />
            </Label>
            <Input
              id={`${mode}-task-title`}
              value={title}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
              placeholder={intl.formatMessage({
                id: "tasks.dialog.titlePlaceholder",
              })}
              className="h-11"
              autoFocus
            />
          </div>
          <Calendar28
            setDate={setDate}
            title={<FormattedMessage id="tasks.dialog.dueDate" />}
          />
          <Button
            type="submit"
            disabled={submitting || !title.trim()}
            className="h-11 w-full"
          >
            {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
            <FormattedMessage
              id={
                mode === "edit"
                  ? "tasks.dialog.saveChanges"
                  : "tasks.dialog.saveTask"
              }
            />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
