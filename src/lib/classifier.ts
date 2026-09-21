/**
 * classifier.ts
 * Lightweight intent classifier — pure TS, zero dependencies.
 *
 * Algorithm:
 *   1. Normalise input (lowercase, strip punctuation, collapse whitespace)
 *   2. Score each intent by how many of its trigger phrases appear in the input.
 *      Multi-word phrases score proportionally higher than single keywords.
 *   3. Return the highest-scoring IntentId, or "unknown" if no match.
 */

import { INTENT_TRIGGERS, IntentId } from "@/data/chatbot-intents";

export function classify(input: string): IntentId {
  const normalised = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let best: IntentId = "unknown";
  let bestScore = 0;

  const entries = Object.entries(INTENT_TRIGGERS) as [IntentId, string[]][];

  for (const [intentId, triggers] of entries) {
    if (intentId === "unknown" || triggers.length === 0) continue;

    let score = 0;
    for (const trigger of triggers) {
      if (normalised.includes(trigger)) {
        // Longer phrases = more specific = higher score
        score += trigger.split(" ").length * 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = intentId;
    }
  }

  return best;
}
