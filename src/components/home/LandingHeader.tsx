"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Languages, LayoutDashboard, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocale } from "@/providers/IntlProvider";

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const { locale, changeLocale } = useLocale();
  const intl = useIntl();

  const toggleLanguage = () => {
    changeLocale(locale === "id" ? "en" : "id");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-slate-950 text-white">
            <LayoutDashboard className="size-4" />
          </span>

          <span className="text-base font-bold">Studesk</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-slate-950">
            <FormattedMessage id="landing.nav.features" />
          </a>

          <a href="#preview" className="hover:text-slate-950">
            <FormattedMessage id="landing.nav.preview" />
          </a>

          <a href="#start" className="hover:text-slate-950">
            <FormattedMessage id="landing.nav.start" />
          </a>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" onClick={toggleLanguage} className="gap-2">
            <Languages className="size-4" />
            {locale.toUpperCase()}
          </Button>

          <Button asChild variant="ghost">
            <Link href="/auth/login">
              <FormattedMessage id="common.login" />
            </Link>
          </Button>

          <Button asChild>
            <Link href="/auth/register">
              <FormattedMessage id="common.getStarted" />
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md border border-slate-200 md:hidden"
          aria-label={intl.formatMessage({
            id: open ? "common.closeMenu" : "common.openMenu",
          })}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-700">
            <a href="#features" onClick={() => setOpen(false)}>
              <FormattedMessage id="landing.nav.features" />
            </a>

            <a href="#preview" onClick={() => setOpen(false)}>
              <FormattedMessage id="landing.nav.preview" />
            </a>

            <a href="#start" onClick={() => setOpen(false)}>
              <FormattedMessage id="landing.nav.start" />
            </a>

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-2 py-2 text-left"
              aria-label={intl.formatMessage({ id: "common.switchLanguage" })}
            >
              <Languages className="size-4" />
              <FormattedMessage
                id={
                  locale === "id"
                    ? "common.language.english"
                    : "common.language.indonesian"
                }
              />
            </button>

            <Button asChild variant="outline">
              <Link href="/auth/login">
                <FormattedMessage id="common.login" />
              </Link>
            </Button>

            <Button asChild>
              <Link href="/auth/register">
                <FormattedMessage id="common.getStarted" />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
