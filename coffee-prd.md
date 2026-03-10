# GrindIQ — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-03-10  
**Status:** Draft  
**Owner:** [ชื่อเจ้าของร้าน]  

---

## 1. Executive Summary

GrindIQ คือ Web Application สำหรับร้านกาแฟที่ช่วยคำนวณและแนะนำเบอร์บดกาแฟแบบ real-time โดยอิงจากสภาพแวดล้อม (อุณหภูมิ + ความชื้น) และ profile ของเมล็ดกาแฟแต่ละชนิด เพื่อให้ Barista ได้ Perfect Shot ตั้งแต่ shot แรก โดยไม่ต้องเสียเมล็ดกาแฟในการทดลองปรับเบอร์บดซ้ำๆ

---

## 2. Problem Statement

### 2.1 ปัญหาหลัก
- เมื่ออุณหภูมิห้องเปลี่ยนแปลง เบอร์บดเดิมที่ตั้งไว้จะให้ผลลัพธ์ที่เปลี่ยนไป ทำให้ไม่ได้ Perfect Shot
- เมื่อมีการเปลี่ยนเมล็ดกาแฟ เบอร์บดต้องถูก calibrate ใหม่ทุกครั้ง
- กระบวนการปรับเบอร์บดใช้วิธี trial & error ทำให้เสียทั้งเวลาและเมล็ดกาแฟ

### 2.2 บริบทของร้าน
| รายการ | รายละเอียด |
|---|---|
| จำนวนเมล็ดกาแฟ | ~20 ชนิด |
| เครื่องบด | 3 เครื่อง (A, B, C) |
| Grinder A | คั่วอ่อน (Light Roast) — Stepped |
| Grinder B | คั่วกลาง (Medium Roast) — Stepless |
| Grinder C | คั่วเข้ม (Dark Roast) — Stepped |
| Hopper ประจำ | 2 อัน (มีการหมุนเวียนเมล็ด) |
| Hardware | ESP32 + DHT22 (DIY sensor) |
| Device หน้าร้าน | Tablet |

### 2.3 Impact ที่เกิดขึ้นปัจจุบัน
- สูญเสียเมล็ดกาแฟต้นทุนสูงในการ dial-in ซ้ำ
- Barista ใช้เวลาปรับเครื่องแทนที่จะให้บริการลูกค้า
- คุณภาพ shot ไม่สม่ำเสมอตลอดวัน

---

## 3. Goals & Success Metrics

### 3.1 Goals
- ลดจำนวนครั้งในการ dial-in ต่อวันให้เหลือน้อยที่สุด
- ให้ Barista ได้ Perfect Shot ตั้งแต่ shot แรกหรือที่ 2
- สร้าง knowledge base ของร้านจาก Shot Log

### 3.2 Success Metrics
| Metric | Baseline (ปัจจุบัน) | Target |
|---|---|---|
| จำนวนครั้ง dial-in ต่อวัน | ~10–15 ครั้ง | ≤ 3 ครั้ง |
| เมล็ดกาแฟที่เสียจาก dial-in | ~30g/วัน | ≤ 10g/วัน |
| Perfect Shot rate (จาก feedback) | ไม่ทราบ | ≥ 80% |
| เวลา dial-in ต่อครั้ง | ~5–10 นาที | ≤ 2 นาที |

---

## 4. User Stories

### Barista (Primary User)
- ในฐานะ Barista ฉันต้องการดูเบอร์บดที่แนะนำทันทีที่เลือกเครื่องบดและเมล็ดกาแฟ เพื่อให้ไม่ต้องเดาเอง
- ในฐานะ Barista ฉันต้องการให้ระบบดึงอุณหภูมิจาก sensor อัตโนมัติ เพื่อไม่ต้องกรอกเอง
- ในฐานะ Barista ฉันต้องการบันทึกผลของแต่ละ shot ได้ง่ายๆ เพื่อให้ระบบเรียนรู้และแม่นขึ้น

### เจ้าของร้าน / Manager (Secondary User)
- ในฐานะเจ้าของร้าน ฉันต้องการดู Shot Log ย้อนหลังได้ เพื่อวิเคราะห์คุณภาพกาแฟแต่ละวัน
- ในฐานะเจ้าของร้าน ฉันต้องการจัดการ Bean Profile ของเมล็ดทั้ง 20 ชนิด เพื่อให้ข้อมูลในระบบถูกต้องเสมอ
- ในฐานะเจ้าของร้าน ฉันต้องการตั้งค่า Baseline grind ของแต่ละเครื่องได้เอง

---

## 5. Features & Requirements

### 5.1 Phase 1 — MVP (Core Calculator)

#### F-01: เลือกเครื่องบดและเมล็ดกาแฟ
- แสดงเครื่องบด A, B, C พร้อมระดับคั่วและ grinder type (Stepped/Stepless)
- แสดงรายชื่อเมล็ดกาแฟที่เหมาะกับเครื่องบดนั้นๆ
- แสดง Bean Profile ย่อ: Origin, Agtron, ระดับคั่ว

#### F-02: Real-time Grind Recommendation
- คำนวณเบอร์บดที่แนะนำจากสูตร:
  ```
  Final Grind = Baseline Grind
    ± Δ Temperature Adjustment
    ± Δ Humidity Adjustment
    ± Δ Agtron Adjustment
  ```
- แสดงผลเป็นตัวเลขชัดเจน พร้อม ± adjustment จาก baseline
- แสดง badge อธิบายเหตุผลของการปรับค่า
- รองรับทั้ง Stepped (แสดงเป็น integer) และ Stepless (แสดงทศนิยม 1 ตำแหน่ง)

#### F-03: ESP32 Sensor Integration
- เชื่อมต่อ ESP32 + DHT22 ผ่าน Local HTTP API หรือ MQTT
- ดึงค่าอุณหภูมิและความชื้นอัตโนมัติทุก 30 วินาที
- แสดงสถานะ sensor (Connected / Disconnected)
- รองรับ manual input กรณี sensor ขาดการเชื่อมต่อ

#### F-04: Shot Feedback
- ปุ่ม Feedback 3 ระดับ: Under / Perfect / Over
- บันทึก feedback พร้อม timestamp, เมล็ด, เครื่องบด, เบอร์บด, อุณหภูมิ, ความชื้น

### 5.2 Phase 2 — Shot Log & Auto-calibration

#### F-05: Shot Log Dashboard
- แสดง Shot Log ย้อนหลังแยกตามวัน
- Filter ตามเครื่องบด, เมล็ด, ผลลัพธ์
- สรุปสถิติ: Perfect Shot Rate, รายการเมล็ดที่มีปัญหา

#### F-06: Auto-calibration Engine
- วิเคราะห์ feedback สะสมเพื่อปรับ coefficient ของแต่ละเครื่องบด
- เริ่ม auto-calibrate เมื่อมี Shot Log ≥ 50 รายการต่อเครื่อง
- แจ้งเตือนเมื่อค่า coefficient ถูก update

#### F-07: Bean Profile Management
- CRUD สำหรับเมล็ดกาแฟ (เพิ่ม/แก้ไข/ลบ/ซ่อน)
- กรอก: ชื่อ, Origin, Agtron, ระดับคั่ว, Baseline grind แยกต่อเครื่อง, Baseline temp & humidity

#### F-08: Temperature Alert
- แจ้งเตือนเมื่ออุณหภูมิเปลี่ยนเกิน ±3°C จาก baseline
- แจ้งเตือนเมื่อความชื้นเปลี่ยนเกิน ±10%

### 5.3 Phase 3 — Advanced (Future)

#### F-09: Multi-user Support
- Login แยกตาม Barista เพื่อ track performance รายคน

#### F-10: Analytics Dashboard
- กราฟ Perfect Shot Rate รายวัน/สัปดาห์/เดือน
- วิเคราะห์เมล็ดที่ให้ผลดีที่สุดในแต่ละช่วงอุณหภูมิ

#### F-11: Recipe Management
- บันทึก recipe พิเศษ: dose, yield, ratio, extraction time target แยกตามเมล็ด

---

## 6. Technical Requirements

### 6.1 Hardware
| Component | Spec | หมายเหตุ |
|---|---|---|
| Microcontroller | ESP32 | WiFi built-in |
| Sensor | DHT22 | Temp ±0.5°C, Humidity ±2–5% |
| Power | USB 5V | หรือ adapter |
| Tablet | Android/iPad | วาง Counter หน้าร้าน |

### 6.2 ESP32 API Spec (ตัวอย่าง)
```json
GET http://192.168.x.x/sensor

Response:
{
  "temperature": 27.4,
  "humidity": 65.2,
  "timestamp": "2026-03-10T09:32:00"
}
```

### 6.3 Tech Stack (แนะนำสำหรับ Self-build)
| Layer | Technology |
|---|---|
| Frontend | React + Tailwind CSS |
| Backend | Node.js / Python FastAPI |
| Database | SQLite (local) หรือ Supabase (cloud) |
| Sensor | ESP32 Arduino firmware + REST API |
| Hosting | Local server หรือ Vercel/Railway |

### 6.4 Non-functional Requirements
- โหลดหน้าจอหลักภายใน 2 วินาที
- ดึงค่า sensor ทุก 30 วินาที (configurable)
- ใช้งานได้บน Tablet แบบ responsive
- รองรับ offline mode (ใช้ค่า sensor ล่าสุดที่บันทึกไว้)
- ข้อมูล Shot Log เก็บย้อนหลังได้อย่างน้อย 1 ปี

---

## 7. Calculation Logic

### 7.1 Grind Adjustment Formula
```
Final Grind = Baseline Grind + dTemp + dHumidity + dAgtron

dTemp     = (currentTemp - baselineTemp) × 0.15
dHumidity = (currentHumidity - baselineHumidity) × 0.05
dAgtron   = Agtron ≥ 65 → -0.5  (Light: ต้องบดละเอียดขึ้น)
            Agtron ≤ 45 → +0.5  (Dark: ต้องบดหยาบขึ้น)
            อื่นๆ       →  0
```

### 7.2 Coefficient Reference (เริ่มต้น — ปรับได้ตาม calibration)
| ตัวแปร | Coefficient เริ่มต้น | หมายเหตุ |
|---|---|---|
| Temperature | 0.15 / °C | ปรับได้หลัง calibrate |
| Humidity | 0.05 / % | ปรับได้หลัง calibrate |
| Agtron (Light/Dark) | ±0.5 | fixed |

### 7.3 Agtron Scale Reference
| Agtron | ระดับคั่ว | ผลต่อการบด |
|---|---|---|
| 95–75 | Light | เมล็ดแข็ง → ต้องบดละเอียดขึ้น |
| 75–55 | Medium | baseline |
| 55–35 | Dark | เมล็ดเปราะ → ต้องบดหยาบขึ้น |
| < 35 | Very Dark | เปราะมาก ระวัง channeling |

---

## 8. Data Models

### Bean Profile
```
id, name, origin, agtron, roast_level,
grinder_id, baseline_grind, baseline_temp,
baseline_humidity, target_extraction_time,
is_active, created_at
```

### Shot Log
```
id, bean_id, grinder_id, recommended_grind,
actual_grind, temp, humidity, extraction_time,
feedback (under/perfect/over), barista_id,
created_at
```

### Grinder Config
```
id, label, roast_level, grinder_type (stepped/stepless),
baseline_grind, temp_coefficient, humidity_coefficient,
is_active
```

---

## 9. UI/UX Requirements

- ใช้งานได้ด้วย 1 มือ บน Tablet ขณะยืนทำงาน
- Font size ≥ 16px สำหรับข้อความสำคัญ
- เบอร์บดที่แนะนำต้องเห็นชัดจากระยะ 50cm
- กด Feedback ได้ภายใน 3 tap หลังจาก shot เสร็จ
- ธีมสีเข้ม (Dark mode) เหมาะกับสภาพแสงในร้านกาแฟ

---

## 10. Out of Scope (Phase 1)

- การเชื่อมต่อกับเครื่องชงกาแฟโดยตรง
- การคำนวณ Water Temperature
- ระบบ POS / การเงิน
- แอปมือถือ (iOS/Android native)
- Machine Learning model (เริ่มใน Phase 3)

---

## 11. Risks & Mitigations

| Risk | โอกาส | Impact | Mitigation |
|---|---|---|---|
| ESP32 ขาดการเชื่อมต่อ | กลาง | สูง | รองรับ manual input เสมอ |
| Baseline ตั้งไม่ถูกต้อง | สูง | สูง | มี onboarding guide ขั้นตอนการตั้ง baseline |
| Barista ไม่กด feedback | สูง | กลาง | UX ง่าย กด 1 tap หลัง shot |
| Coefficient ไม่แม่น | กลาง | กลาง | เริ่มจาก conservative value และ calibrate จาก log |

---

## 12. Milestones

| Milestone | งาน | กำหนด |
|---|---|---|
| M1 | ESP32 firmware + API endpoint พร้อม | สัปดาห์ที่ 1 |
| M2 | Bean Profile DB + Grinder Config พร้อม | สัปดาห์ที่ 1 |
| M3 | หน้า Dashboard + Calculation Engine | สัปดาห์ที่ 2 |
| M4 | Shot Feedback + Shot Log | สัปดาห์ที่ 2–3 |
| M5 | ทดสอบที่ร้านจริง (Beta) | สัปดาห์ที่ 3–4 |
| M6 | Auto-calibration Engine (Phase 2) | เดือนที่ 2 |

---

## 13. Open Questions

- [ ] อุณหภูมิ baseline อ้างอิงที่เท่าไหร่? (แนะนำ 25°C)
- [ ] Baseline grind ของแต่ละเครื่องในสภาวะปกติคือเท่าไหร่?
- [ ] จะมี Barista หลายคนใช้งานพร้อมกันไหม?
- [ ] ต้องการ export Shot Log เป็น CSV/Excel ไหม?
- [ ] IP address ของ ESP32 จะ static หรือ dynamic?

---

*Document นี้จัดทำเพื่อใช้ใน Cowork และ Development Planning*  
*อัปเดตล่าสุด: 2026-03-10*
