import type { Project } from "../types";
import { proof } from "./proof";
import { proofops } from "./proofops";
import { userwise } from "./userwise";

/** Display order across the site. */
export const projects: Project[] = [proof, proofops, userwise];
