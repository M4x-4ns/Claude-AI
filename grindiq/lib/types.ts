// === Grinder ===
export type GrinderId = 'A' | 'B' | 'C'
export type GrinderType = 'stepped' | 'stepless'

export interface Grinder {
  id: GrinderId
  name: string               // 'Light' | 'Medium' | 'Dark'
  roast_label: string
  grinder_type: GrinderType
  color: string              // hex color for grinder identity
  baseline_grind: number
  baseline_temp: number
  baseline_humidity: number
  updated_at: string
}

// === Bean ===
export interface Bean {
  id: string
  name: string
  origin: string | null
  agtron_score: number       // 0–100
  roast_label: string | null
  notes: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

// === Shot ===
export type ShotFeedback = 'under' | 'perfect' | 'over'

export interface Shot {
  id: string
  grinder_id: GrinderId
  bean_id: string
  grind_number: number
  temp_at_shot: number | null
  humidity_at_shot: number | null
  d_temp: number | null
  d_humidity: number | null
  d_agtron: number | null
  feedback: ShotFeedback | null
  notes: string | null
  created_at: string
  // joined
  bean?: Bean
  grinder?: Grinder
}

// === Sensor ===
export interface SensorData {
  temperature: number
  humidity: number
  timestamp: string
}

export interface SensorConfig {
  id: number
  esp32_url: string | null
  poll_interval_seconds: number
  use_manual: boolean
  manual_temp: number | null
  manual_humidity: number | null
  updated_at: string
}

// === Calculator ===
export interface GrindInputs {
  baselineGrind: number
  baselineTemp: number
  baselineHumidity: number
  currentTemp: number
  currentHumidity: number
  agtronScore: number
  grinderType: GrinderType
}

export interface GrindBreakdown {
  baseline: number
  dTemp: number
  dHumidity: number
  dAgtron: number
}

export interface GrindResult {
  finalGrind: number
  displayGrind: string       // formatted: int for stepped, 1dp for stepless
  breakdown: GrindBreakdown
}
