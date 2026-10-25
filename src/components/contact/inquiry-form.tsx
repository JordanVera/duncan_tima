"use client";

import { startTransition, useActionState, useEffect, useId, useRef } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { submitInquiry } from "@/app/contact/actions";
import { budgetRanges, projectTypes, timelines } from "@/content/inquiry";
import type { InquiryField, InquiryState } from "@/lib/inquiry/schema";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

const initialState: InquiryState = { status: "idle" };

const control =
  "w-full rounded-[var(--radius-md)] border border-line bg-surface-1 px-4 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-colors hover:border-line-strong focus-visible:border-fg aria-[invalid=true]:border-[var(--danger)]";

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  const errors = state.status === "invalid" ? state.errors : {};
  const values = "values" in state ? state.values : {};

  useEffect(() => {
    if (state.status === "invalid") {
      const first = Object.keys(state.errors)[0];
      const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
      el?.focus();
    } else if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-lg)] border border-line bg-surface-1 p-8 sm:p-10">
        <CheckCircle2 className="size-7 text-fg" strokeWidth={1.5} aria-hidden />
        <h2 className="mt-6 text-h3 font-medium">Thanks, {state.name}. Your inquiry was sent.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-fg-muted">
          I’ll reply to the email address you provided. If it’s urgent, you can also reach me at{" "}
          <a className="text-fg underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (name: InquiryField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    defaultValue: values[name] ?? "",
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        // React resets uncontrolled fields after a form action; submitting manually keeps the visitor's input intact.
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
      noValidate
      className="grid gap-6"
      aria-describedby={`${id}-required`}
    >
      <p id={`${id}-required`} className="text-sm text-fg-subtle">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required htmlFor={`${id}-name`} error={errors.name} errorId={`${id}-name-error`}>
          <input {...field("name")} type="text" autoComplete="name" required className={cn(control, "h-12")} />
        </Field>
        <Field label="Email" required htmlFor={`${id}-email`} error={errors.email} errorId={`${id}-email-error`}>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required className={cn(control, "h-12")} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Company" htmlFor={`${id}-company`} error={errors.company} errorId={`${id}-company-error`}>
          <input {...field("company")} type="text" autoComplete="organization" className={cn(control, "h-12")} />
        </Field>
        <Field label="Project type" required htmlFor={`${id}-projectType`} error={errors.projectType} errorId={`${id}-projectType-error`}>
          <Select {...field("projectType")} required placeholder="Choose one" options={projectTypes} />
        </Field>
      </div>

      <Field
        label="Project description"
        required
        htmlFor={`${id}-description`}
        hint="What are you building, who is it for, and where do people get stuck?"
        hintId={`${id}-description-hint`}
        error={errors.description}
        errorId={`${id}-description-error`}
      >
        <textarea
          {...field("description")}
          aria-describedby={[`${id}-description-hint`, errors.description && `${id}-description-error`].filter(Boolean).join(" ")}
          required
          rows={6}
          className={cn(control, "min-h-40 resize-y py-3 leading-relaxed")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Budget" htmlFor={`${id}-budget`} error={errors.budget} errorId={`${id}-budget-error`}>
          <Select {...field("budget")} placeholder="Optional" options={budgetRanges} />
        </Field>
        <Field label="Timeline" htmlFor={`${id}-timeline`} error={errors.timeline} errorId={`${id}-timeline-error`}>
          <Select {...field("timeline")} placeholder="Optional" options={timelines} />
        </Field>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="empty:hidden">
        {state.status === "invalid" && (
          <p className="flex items-center gap-2 text-sm text-[var(--danger)]">
            <AlertCircle className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            Please fix the highlighted {Object.keys(state.errors).length === 1 ? "field" : "fields"} and try again.
          </p>
        )}
      </div>

      {(state.status === "unconfigured" || state.status === "error") && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-md)] border border-line-strong bg-surface-2 p-5 sm:p-6"
        >
          <p className="flex items-start gap-3 font-medium">
            <AlertCircle className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} aria-hidden />
            {state.status === "unconfigured"
              ? "Your message has not been sent — online delivery isn’t set up yet."
              : "Your message could not be sent right now."}
          </p>
          <p className="mt-2 pl-8 text-sm leading-relaxed text-fg-muted">
            Your details are still in the form. Send them by email instead — the message will open prefilled in your email app.
          </p>
          <a
            href={state.mailto}
            className="mt-4 ml-8 inline-flex h-11 items-center gap-2 rounded-full bg-inverse px-5 text-sm font-medium text-on-inverse"
          >
            <Mail className="size-4" strokeWidth={1.75} aria-hidden />
            Email {siteConfig.email}
          </a>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-inverse px-7 font-medium text-on-inverse transition-[transform,opacity] duration-200 ease-out-expo hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin motion-reduce:animate-none" strokeWidth={1.75} aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
            </>
          )}
        </button>
        <p className="text-sm text-fg-subtle">Your details are only used to reply to this inquiry.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  htmlFor,
  hint,
  hintId,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-fg-subtle">
            *
          </span>
        ) : (
          <span className="ml-2 font-normal text-fg-subtle">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-fg-subtle">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-sm text-[var(--danger)]">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder: string }) {
  return (
    <div className="relative">
      <select {...props} className={cn(control, "h-12 appearance-none pr-10")}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-fg-muted">
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
