// lib/aiMatcher.ts

import { SYMPTOM_MAP } from "@/lib/constants";

export function detectSpecializations(
  problem: string
) {
  const lower = problem.toLowerCase();

  let detected: string[] = [];

  Object.entries(SYMPTOM_MAP).forEach(
    ([symptom, specs]) => {
      if (
        lower.includes(
          symptom.toLowerCase()
        )
      ) {
        detected.push(...specs);
      }
    }
  );

  return [...new Set(detected)];
}