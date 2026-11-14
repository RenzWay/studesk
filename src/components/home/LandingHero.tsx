"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormattedMessage, useIntl } from "react-intl";

const stats = [
  { labelId: "landing.hero.stats.workspace", value: "3" },
  { labelId: "landing.hero.stats.simpleTools", value: "1" },
  { labelId: "landing.hero.stats.dailyFocus", value: "24h" },
];

export function LandingHero() {
  const intl = useIntl();

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20 lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-2xl"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-sky-100 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
          <Sparkles className="size-4" />
          <FormattedMessage id="landing.hero.badge" />
        </div>
        <h1 className="max-w-xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          <FormattedMessage id="landing.hero.title" />
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          <FormattedMessage id="landing.hero.description" />
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/auth/register">
              <FormattedMessage id="landing.hero.start" />
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/login">
              <FormattedMessage id="landing.hero.login" />
            </Link>
          </Button>
        </div>
        <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
          {stats.map((item) => (
            <div
              key={item.labelId}
              className="rounded-md border border-slate-200 bg-white p-4"
            >
              <dt className="text-xs font-medium text-slate-500">
                <FormattedMessage id={item.labelId} />
              </dt>
              <dd className="mt-1 text-2xl font-bold text-slate-950">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
        id="preview"
      >
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-300/50">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <span className="size-2.5 rounded-full bg-rose-400" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-medium text-slate-500">
              <FormattedMessage id="landing.hero.preview" />
            </span>
          </div>
          <Image
            src="/ss/dashboard.png"
            alt={intl.formatMessage({ id: "landing.hero.previewAlt" })}
            width={1200}
            height={760}
            priority
            className="h-auto w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
