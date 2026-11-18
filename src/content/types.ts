export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** `contain` keeps an interface screenshot fully readable; `cover` may crop. */
  fit?: "contain" | "cover";
};

export type VideoAsset = {
  src: string;
  poster: ImageAsset;
  width: number;
  height: number;
  label: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  body: string;
  image?: ImageAsset;
};

export type CaseStudyBlock =
  | {
      type: "sectionHeading";
      /** Anchor id; also listed in the case-study section index. */
      id: string;
      eyebrow: string;
      title: string;
    }
  | {
      type: "text";
      lead?: string;
      paragraphs: string[];
      /** A short emphasized statement rendered larger than body copy. */
      callout?: string;
    }
  | {
      type: "image";
      image: ImageAsset;
      caption?: string;
      size?: "wide" | "full" | "inset";
    }
  | {
      type: "video";
      video: VideoAsset;
      caption?: string;
    }
  | {
      type: "imagePair";
      images: [ImageAsset, ImageAsset];
      caption?: string;
    }
  | {
      type: "quote";
      quote: string;
      attribution: string;
    }
  | {
      type: "metrics";
      label: string;
      note?: string;
      items: Metric[];
      tone?: "baseline" | "outcome";
    }
  | {
      type: "features";
      items: FeatureItem[];
      layout?: "rows" | "grid";
    }
  | {
      type: "diagram";
      kind: "abcdProcess";
      caption?: string;
    };

export type Project = {
  slug: string;
  name: string;
  /** Short category label, e.g. "Brand identity & web experience". */
  title: string;
  summary: string;
  client: string;
  role: string;
  service: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category: string;
  cover: ImageAsset;
  blocks: CaseStudyBlock[];
};

export type Service = {
  number: string;
  name: string;
  description: string;
  deliverables: string[];
  example?: ImageAsset;
};

export type ToolkitItem = {
  name: string;
  category: string;
  lightSrc: string;
  darkSrc: string;
  width: number;
  height: number;
};

export type MethodologyStep = {
  letter: "A" | "B" | "C" | "D";
  word: string;
  summary: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar?: ImageAsset;
};

export type Pillar = {
  number: string;
  title: string;
  description: string;
};

export type ClientSegment = {
  label: string;
  tier: string;
  description: string;
};

export type About = {
  intro: string;
  positioning: string;
  centralIdea: string;
  purpose: string;
  mission: string;
  vision: string;
  promise: string;
  pillars: Pillar[];
  idealClients: ClientSegment[];
  methodology: MethodologyStep[];
};
