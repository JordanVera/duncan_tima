/** Options shown in the inquiry form. Edit freely; validation reads from these lists. */
export const projectTypes = [
  "Product / UX design",
  "UI design",
  "Graphic design",
  "Digital design",
  "Social media design",
  "Something else",
] as const;

export const budgetRanges = ["Under $5k", "$5k–$15k", "$15k–$30k", "$30k+", "Not sure yet"] as const;

export const timelines = ["As soon as possible", "Within a month", "1–3 months", "3+ months", "Flexible"] as const;
