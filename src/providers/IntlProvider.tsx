"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { IntlProvider as ReactIntlProvider } from "react-intl";

import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";

const messages = {
  id: idMessages,
  en: enMessages,
};

type Locale = keyof typeof messages;

type LocaleContextValue = {
  locale: Locale;
  changeLocale: (nextLocale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function AppIntlProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");

  useEffect(() => {
    const savedLocale = localStorage.getItem("studesk-locale");

    if (savedLocale === "id" || savedLocale === "en") {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = useCallback((nextLocale: Locale) => {
    if (!messages[nextLocale]) return;

    localStorage.setItem("studesk-locale", nextLocale);
    setLocale(nextLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <ReactIntlProvider
        locale={locale}
        defaultLocale="id"
        messages={messages[locale]}
      >
        {children}
      </ReactIntlProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside AppIntlProvider");
  }

  return context;
}
