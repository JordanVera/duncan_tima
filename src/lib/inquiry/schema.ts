import { z } from "zod";
import { budgetRanges, projectTypes, timelines } from "@/content/inquiry";

const optionalChoice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal("")]).optional().transform((v) => v || undefined);

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Please keep your name under 120 characters."),
  email: z.string().trim().email("Please enter a valid email address, like name@company.com.").max(200),
  company: z.string().trim().max(160, "Please keep the company name under 160 characters.").optional().transform((v) => v || undefined),
  projectType: z.enum(projectTypes, { error: "Please choose the type of project." }),
  description: z
    .string()
    .trim()
    .min(20, "A sentence or two helps — please share at least 20 characters about the project.")
    .max(4000, "Please keep the description under 4,000 characters."),
  budget: optionalChoice(budgetRanges),
  timeline: optionalChoice(timelines),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryField = keyof Inquiry;

export type InquiryState =
  | { status: "idle" }
  | {
      status: "invalid";
      errors: Partial<Record<InquiryField, string>>;
      values: Record<string, string>;
    }
  | { status: "success"; name: string }
  | {
      /** Delivery is not configured or the provider failed. Nothing was sent. */
      status: "unconfigured" | "error";
      values: Record<string, string>;
      mailto: string;
    };
