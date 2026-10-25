"use server";

import { formatInquiryText, getInquiryProvider } from "@/lib/inquiry/deliver";
import { inquirySchema, type InquiryField, type InquiryState } from "@/lib/inquiry/schema";
import { mailto } from "@/lib/site-config";

const FIELDS = ["name", "email", "company", "projectType", "description", "budget", "timeline"] as const;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")]));

  // Honeypot: real people never fill this hidden field. Treat as delivered without sending.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", name: values.name };
  }

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<InquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField;
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "invalid", errors, values };
  }

  const inquiry = parsed.data;
  const fallback = mailto(`Project inquiry — ${inquiry.name}`, formatInquiryText(inquiry).slice(0, 1800));
  const provider = getInquiryProvider();

  if (!provider) {
    return { status: "unconfigured", values, mailto: fallback };
  }

  const result = await provider.send(inquiry);
  if (!result.ok) {
    console.error(`[inquiry] ${provider.name} delivery failed: ${result.reason}`);
    return { status: "error", values, mailto: fallback };
  }

  return { status: "success", name: inquiry.name };
}
