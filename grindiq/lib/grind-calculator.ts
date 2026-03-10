import type { GrindInputs, GrindResult } from './types'

/**
 * Core grind calculation formula (pure function — no side effects)
 *
 * Final Grind = Baseline Grind + dTemp + dHumidity + dAgtron
 *
 * dTemp     = (currentTemp - baselineTemp) × 0.15
 * dHumidity = (currentHumidity - baselineHumidity) × 0.05
 * dAgtron   = agtron ≥ 65 → -0.5 (light: grind finer)
 *             agtron ≤ 45 → +0.5 (dark: grind coarser)
 *             else 0
 */
export function calculateGrind(inputs: GrindInputs): GrindResult {
  const {
    baselineGrind,
    baselineTemp,
    baselineHumidity,
    currentTemp,
    currentHumidity,
    agtronScore,
    grinderType,
  } = inputs

  const dTemp     = (currentTemp - baselineTemp) * 0.15
  const dHumidity = (currentHumidity - baselineHumidity) * 0.05
  const dAgtron   = agtronScore >= 65 ? -0.5 : agtronScore <= 45 ? 0.5 : 0

  const finalGrind = baselineGrind + dTemp + dHumidity + dAgtron

  // Stepped grinders: round to nearest integer
  // Stepless grinders: 1 decimal place
  const displayGrind =
    grinderType === 'stepped'
      ? String(Math.round(finalGrind))
      : finalGrind.toFixed(1)

  return {
    finalGrind,
    displayGrind,
    breakdown: {
      baseline: baselineGrind,
      dTemp:     Math.round(dTemp * 100) / 100,
      dHumidity: Math.round(dHumidity * 100) / 100,
      dAgtron,
    },
  }
}

/**
 * Returns a human-readable label for the Agtron adjustment reason
 */
export function agtronLabel(agtronScore: number): string {
  if (agtronScore >= 65) return 'Light roast — grind finer'
  if (agtronScore <= 45) return 'Dark roast — grind coarser'
  return 'Medium roast — no adjustment'
}
