"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { FormattedMessage, useIntl } from "react-intl";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { auth } from "@/firebase/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const intl = useIntl();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorId, setErrorId] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorId("");
    setSuccess(false);

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setErrorId("auth.forgot.error.invalidEmail");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, normalizedEmail);

      setSuccess(true);
    } catch (error: unknown) {
      console.error("Password reset error:", error);

      const errorCode =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "";

      switch (errorCode) {
        case "auth/invalid-email":
          setErrorId("auth.forgot.error.invalidEmail");
          break;

        case "auth/too-many-requests":
          setErrorId("auth.forgot.error.tooManyRequests");
          break;

        default:
          setErrorId("auth.forgot.error.generic");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-5 py-8 text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-lg border border-slate-900 bg-slate-100 shadow-md shadow-slate-200/70 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left Panel */}
        <div className="hidden bg-slate-950 p-8 text-white lg:flex lg:flex-col">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-white text-slate-950">
              <LayoutDashboard className="size-4" />
            </span>
            Studesk
          </Link>

          <div className="my-auto">
            <div className="mb-6 mt-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-1 text-sm text-sky-100">
              <ShieldCheck className="size-4 text-emerald-400" />

              <FormattedMessage id="auth.forgot.badge" />
            </div>

            <h1 className="max-w-md text-4xl font-bold leading-tight">
              <FormattedMessage id="auth.login.sidebar.title" />
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              <FormattedMessage id="auth.login.sidebar.description" />
            </p>

            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src="/ss/dashboard.png"
                alt="Studesk dashboard"
                width={900}
                height={560}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 flex items-center gap-3 text-sm font-semibold lg:hidden"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-slate-950 text-white">
                <LayoutDashboard className="size-4" />
              </span>
              Studesk
            </Link>

            <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
              {success ? (
                <CheckCircle2 className="size-6" />
              ) : (
                <Mail className="size-6" />
              )}
            </div>

            <p className="text-sm font-bold uppercase text-sky-600">
              <FormattedMessage id="auth.forgot.badge" />
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              {success ? (
                <FormattedMessage id="auth.forgot.success.title" />
              ) : (
                <FormattedMessage id="auth.forgot.title" />
              )}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {success ? (
                <FormattedMessage id="auth.forgot.success.description" />
              ) : (
                <FormattedMessage id="auth.forgot.description" />
              )}
            </p>

            {!success && (
              <form onSubmit={handleSubmit} className="mt-8">
                <div>
                  <Label htmlFor="email" className="text-slate-700">
                    <FormattedMessage id="auth.fields.email" />
                  </Label>

                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                      }
                      placeholder={intl.formatMessage({
                        id: "auth.fields.emailPlaceholder",
                      })}
                      required
                      disabled={loading}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {errorId && (
                  <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    <FormattedMessage id={errorId} />
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-6 h-11 w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <FormattedMessage id="auth.forgot.sending" />
                    </>
                  ) : (
                    <>
                      <FormattedMessage id="auth.forgot.submit" />
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            )}

            <Link
              href="/auth/login"
              className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
            >
              <ArrowLeft className="size-4" />

              <FormattedMessage id="auth.forgot.backToLogin" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
