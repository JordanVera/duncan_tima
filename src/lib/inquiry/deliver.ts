import "server-only";
import type { Inquiry } from "./schema";
import { createResendProvider } from "./providers/resend";

export type DeliveryResult = { ok: true } | { ok: false; reason: string };

export interface InquiryProvider {
  name: string;
  send(inquiry: Inquiry): Promise<DeliveryResult>;
}

/** Returns the configured provider, or null when delivery has not been set up. */
export function getInquiryProvider(): InquiryProvider | null {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
    return createResendProvider({ apiKey: RESEND_API_KEY, to: CONTACT_TO_EMAIL, from: CONTACT_FROM_EMAIL });
  }
  return null;
}

export function formatInquiryText(i: Inquiry) {
  return [
    `Name: ${i.name}`,
    `Email: ${i.email}`,
    `Company: ${i.company ?? "—"}`,
    `Project type: ${i.projectType}`,
    `Budget: ${i.budget ?? "—"}`,
    `Timeline: ${i.timeline ?? "—"}`,
    "",
    "Project description:",
    i.description,
  ].join("\n");
}
