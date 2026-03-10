# ☕ Coffee Grind Calculator — Project Spec

## 1. ภาพรวมโปรเจกต์

**ปัญหา:** เมื่ออุณหภูมิห้องเปลี่ยน หรือมีการสลับเมล็ดกาแฟ เบอร์บดเดิมจะใช้ไม่ได้ ทำให้ไม่ได้ Perfect Shot และต้องเสียเวล่า + เมล็ดกาแฟในการปรับใหม่ทุกครั้ง

**เป้าหมาย:** สร้าง Platform ที่ช่วยคำนวณและแนะนำเบอร์บดกาแฟแบบ real-time โดยอิงจากสภาพแวดล้อมและ profile ของเมล็ดแต่ละชนิด

---

## 2. บริบทของร้าน

| รายการ | รายละเอียด |
|---|---|
| จำนวนเมล็ดกาแฟ | ~20 ชนิด |
| เครื่องบด | 3 เครื่อง (A, B, C) |
| เครื่อง A | บดเมล็ดคั่วอ่อน (Light Roast) |
| เครื่อง B | บดเมล็ดคั่วกลาง (Medium Roast) |
| เครื่อง C | บดเมล็ดคั่วเข้ม (Dark Roast) |
| Hopper ประจำ | 2 อัน (มีการเปลี่ยนเมล็ดเป็นครั้งคราว) |
| เมล็ดพิเศษ | บดตามออเดอร์ ใช้เครื่อง A/B/C ตามระดับคั่ว |

---

## 3. สาเหตุหลักที่ทำให้เบอร์บดต้องเปลี่ยน

1. **อุณหภูมิห้องเปลี่ยน** — ส่งผลต่อการขยายตัวของเมล็ดและความหนาแน่น
2. **ความชื้นเปลี่ยน** — กาแฟอมน้ำ ทำให้ flow ช้าหรือเร็วผิดปกติ
3. **เปลี่ยนเมล็ดกาแฟ** — แต่ละเมล็ดมี density, Agtron, และ roast profile ต่างกัน

---

## 4. ตัวแปรที่ใช้คำนวณ

### 🌡️ Environment (Real-time)
- อุณหภูมิห้อง (°C)
- ความชื้นสัมพัทธ์ (%)

### ☕ Bean Profile (ต่อเมล็ด)
- ชื่อเมล็ด
- Origin / แหล่งที่มา
- Agtron Scale (ตัวเลข 0–100)
- ระดับคั่ว (Light / Medium / Dark)
- Baseline grind number (แยกตามเครื่อง A / B / C)
- Baseline extraction time (วินาที)
- Baseline temperature & humidity ที่ตั้งค่าไว้

### ⚙️ Target
- Extraction time เป้าหมาย (เช่น 25–30 วินาที)

---

## 5. Calculation Logic (เบื้องต้น)

```
Final Grind = Baseline Grind
  ± Δ (Temperature vs Baseline Temp)
  ± Δ (Humidity vs Baseline Humidity)
  ± Δ (Agtron adjustment)
```

- อุณหภูมิสูงขึ้น → บดหยาบขึ้น (เบอร์ใหญ่ขึ้น)
- อุณหภูมิต่ำลง → บดละเอียดขึ้น (เบอร์เล็กลง)
- ความชื้นสูง → บดหยาบขึ้น
- Agtron ต่ำ (คั่วเข้ม) → เมล็ดเปราะ → บดหยาบขึ้น
- Agtron สูง (คั่วอ่อน) → เมล็ดแข็ง → บดละเอียดขึ้น

> **หมายเหตุ:** Coefficient แต่ละตัวต้องถูก calibrate ตามเครื่องบดแต่ละเครื่อง และจะแม่นขึ้นเรื่อยๆ จาก Shot Log Feedback

---

## 6. System Architecture

```
[Sensor: อุณหภูมิ + ความชื้น]
          ↓ API (real-time)
[Calculation Engine]  ←  [Bean & Grinder Database]
          ↓
[UI: Tablet / มือถือ]
          ↓
[Barista ปรับเครื่องบดตามคำแนะนำ]
          ↓
[Shot Feedback: Under / Perfect / Over]
          ↓
[System เรียนรู้และ calibrate ค่าให้แม่นขึ้น]
```

---

## 7. Features

### Phase 1 — MVP
- [ ] เลือกเครื่องบด (A / B / C)
- [ ] เลือกเมล็ดกาแฟ
- [ ] แสดงเบอร์บดที่แนะนำ พร้อม ± adjustment จาก baseline
- [ ] แสดงอุณหภูมิ + ความชื้น real-time (manual input หรือ sensor)

### Phase 2 — Shot Log & Feedback
- [ ] บันทึก Shot Log (เวลา, เมล็ด, เครื่อง, เบอร์บด, สภาพแวดล้อม)
- [ ] Feedback หลัง shot: Under / Perfect / Over
- [ ] ระบบ auto-calibrate coefficient จาก feedback
- [ ] Dashboard ประวัติ shot แยกตามเครื่อง

### Phase 3 — Automation
- [ ] เชื่อม API sensor อัตโนมัติ (SwitchBot / Govee / ESP32)
- [ ] Notification เมื่ออุณหภูมิเปลี่ยนเกิน threshold
- [ ] รองรับ multi-user (Barista หลายคน)

---

## 8. เซ็นเซอร์ที่แนะนำ

| ตัวเลือก | ราคา (approx.) | มี API | ความยากในการใช้ |
|---|---|---|---|
| SwitchBot Meter Plus | ~800 ฿ | ✅ Cloud API | ง่าย |
| Govee H5179 | ~600 ฿ | ✅ API | ง่าย |
| Inkbird IBS-TH2 | ~500 ฿ | ✅ | ง่าย |
| ESP32 + DHT22 (DIY) | ~300 ฿ | ✅ Custom | ปานกลาง |

---

## 9. สิ่งที่ต้องตัดสินใจก่อน Build จริง

- [ ] เซ็นเซอร์ที่จะใช้ (มีอยู่แล้ว หรือจะซื้อ?)
- [ ] Device ที่ Barista ใช้ (Tablet / มือถือ / ทั้งคู่)
- [ ] เครื่องบดแบบ Stepped หรือ Stepless?
- [ ] จะเริ่ม build เอง หรือหา Developer?

---

## 10. ขั้นตอนถัดไป

1. ตอบคำถามใน Section 9 ให้ครบ
2. ออกแบบ Bean Profile Database (กรอกข้อมูล 20 เมล็ด)
3. ตั้ง Baseline grind ของแต่ละเมล็ดในสภาวะปกติ
4. Build MVP (Phase 1) และทดสอบที่ร้าน
5. เก็บ Shot Log อย่างน้อย 2–4 สัปดาห์ก่อน enable auto-calibrate
