"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, CheckSquare, NotebookPen } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
  {
    titleId: "landing.features.tasks.title",
    descriptionId: "landing.features.tasks.description",
    icon: CheckSquare,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    img: "/ss/task.png",
  },
  {
    titleId: "landing.features.schedule.title",
    descriptionId: "landing.features.schedule.description",
    icon: CalendarDays,
    color: "text-sky-600 bg-sky-50 border-sky-100",
    img: "/ss/schedule.png",
  },
  {
    titleId: "landing.features.notes.title",
    descriptionId: "landing.features.notes.description",
    icon: NotebookPen,
    color: "text-violet-600 bg-violet-50 border-violet-100",
    img: "/ss/note.png",
  },
];

export function LandingFeatures() {
  const intl = useIntl();

  return (
    <section id="features" className="border-y border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase text-sky-600">
            <FormattedMessage id="landing.features.label" />
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            <FormattedMessage id="landing.features.title" />
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.titleId}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="aspect-16/10 overflow-hidden border-b border-slate-200 bg-slate-100">
                <Image
                  src={feature.img}
                  alt={intl.formatMessage(
                    { id: "landing.features.imageAlt" },
                    {
                      title: intl.formatMessage({ id: feature.titleId }),
                    },
                  )}
                  width={720}
                  height={450}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <div
                  className={`mb-4 inline-flex size-10 items-center justify-center rounded-md border ${feature.color}`}
                >
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  <FormattedMessage id={feature.titleId} />
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  <FormattedMessage id={feature.descriptionId} />
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
