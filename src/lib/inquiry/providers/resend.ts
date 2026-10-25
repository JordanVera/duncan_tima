import "server-only";
import type { InquiryProvider } from "../deliver";
import { formatInquiryText } from "../deliver";

/** Sends through the Resend REST API (https://resend.com/docs/api-reference/emails/send-email). */
export function createResendProvider(config: { apiKey: string; to: string; from: string }): InquiryProvider {
  return {
    name: "resend",
    async send(inquiry) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: config.from,
            to: config.to.split(",").map((s) => s.trim()),
            reply_to: inquiry.email,
            subject: `New project inquiry — ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
            text: formatInquiryText(inquiry),
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) return { ok: false, reason: `Resend responded with ${res.status}` };
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: err instanceof Error ? err.message : "Unknown delivery error" };
      }
    },
  };
}
