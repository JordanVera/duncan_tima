import type { Project } from "../types";
import { opusOrtho } from "./opus-ortho";
import { amplify } from "./amplify";
import { aioko } from "./aioko";

/** Display order across the site. */
export const projects: Project[] = [opusOrtho, amplify, aioko];
