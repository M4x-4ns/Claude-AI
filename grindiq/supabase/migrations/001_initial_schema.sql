-- ============================================================
-- GrindIQ — Initial Schema
-- Run this in Supabase SQL Editor (or via Supabase CLI)
-- ============================================================

-- === Grinders ===
CREATE TABLE IF NOT EXISTS grinders (
  id                  TEXT PRIMARY KEY,          -- 'A' | 'B' | 'C'
  name                TEXT NOT NULL,             -- 'Light' | 'Medium' | 'Dark'
  roast_label         TEXT NOT NULL DEFAULT '',
  grinder_type        TEXT NOT NULL DEFAULT 'stepped', -- 'stepped' | 'stepless'
  color               TEXT NOT NULL DEFAULT '#C8922A',
  baseline_grind      NUMERIC(5,1) NOT NULL DEFAULT 20.0,
  baseline_temp       NUMERIC(4,1) NOT NULL DEFAULT 25.0,
  baseline_humidity   NUMERIC(4,1) NOT NULL DEFAULT 70.0,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Seed grinders
INSERT INTO grinders (id, name, roast_label, grinder_type, color, baseline_grind, baseline_temp, baseline_humidity) VALUES
  ('A', 'Light',  'Light Roast',  'stepped',  '#C8922A', 18.0, 25.0, 70.0),
  ('B', 'Medium', 'Medium Roast', 'stepless', '#8B5E3C', 22.0, 25.0, 70.0),
  ('C', 'Dark',   'Dark Roast',   'stepped',  '#4A2C1A', 26.0, 25.0, 70.0)
ON CONFLICT (id) DO NOTHING;

-- === Beans ===
CREATE TABLE IF NOT EXISTS beans (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  origin       TEXT,
  agtron_score INTEGER NOT NULL DEFAULT 55 CHECK (agtron_score BETWEEN 0 AND 100),
  roast_label  TEXT,
  notes        TEXT,
  is_active    BOOLEAN DEFAULT TRUE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with 5 sample beans (owner should add remaining 15)
INSERT INTO beans (name, origin, agtron_score, roast_label, sort_order) VALUES
  ('Ethiopia Yirgacheffe',  'Ethiopia',  72, 'Light',        1),
  ('Colombia Huila',        'Colombia',  58, 'Medium',       2),
  ('Brazil Santos',         'Brazil',    48, 'Medium-Dark',  3),
  ('Sumatra Mandheling',    'Indonesia', 40, 'Dark',         4),
  ('Guatemala Antigua',     'Guatemala', 62, 'Medium',       5);

-- === Shots ===
CREATE TABLE IF NOT EXISTS shots (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grinder_id       TEXT REFERENCES grinders(id),
  bean_id          UUID REFERENCES beans(id),
  grind_number     NUMERIC(5,1) NOT NULL,
  temp_at_shot     NUMERIC(4,1),
  humidity_at_shot NUMERIC(4,1),
  d_temp           NUMERIC(5,2),
  d_humidity       NUMERIC(5,2),
  d_agtron         NUMERIC(4,2),
  feedback         TEXT CHECK (feedback IN ('under', 'perfect', 'over')),
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shots_grinder ON shots(grinder_id);
CREATE INDEX IF NOT EXISTS idx_shots_bean    ON shots(bean_id);
CREATE INDEX IF NOT EXISTS idx_shots_created ON shots(created_at DESC);

-- === Sensor Config (single row) ===
CREATE TABLE IF NOT EXISTS sensor_config (
  id                     INTEGER PRIMARY KEY DEFAULT 1,
  esp32_url              TEXT,
  poll_interval_seconds  INTEGER DEFAULT 30,
  use_manual             BOOLEAN DEFAULT FALSE,
  manual_temp            NUMERIC(4,1),
  manual_humidity        NUMERIC(4,1),
  updated_at             TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO sensor_config (id, esp32_url, poll_interval_seconds, use_manual)
VALUES (1, NULL, 30, FALSE)
ON CONFLICT (id) DO NOTHING;
