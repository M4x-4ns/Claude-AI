# GrindIQ — Design System
**Version:** 1.0 | **Updated:** 2026-03-10 | **Platform:** Tablet Web App

---

## 1. Design Principles

| หลักการ | คำอธิบาย |
|---|---|
| **Clarity First** | ข้อมูลสำคัญ (เบอร์บด) ต้องเห็นชัดจากระยะ 50cm |
| **Warm & Trustworthy** | โทนสี Warm Beige + Amber สื่อถึงความเชี่ยวชาญด้านกาแฟ |
| **One-Hand Friendly** | ทุก action ทำได้ด้วย 1 มือ บน Tablet ขณะยืนทำงาน |
| **Minimal Cognitive Load** | ลด step ให้น้อยที่สุด — เลือก Grinder → เลือก Bean → ดูผล |

---

## 2. Color Palette

### Primary
| Token | Hex | การใช้งาน |
|---|---|---|
| `color-gold` | `#C8922A` | Primary action, accent, grind number |
| `color-gold-light` | `#E8B84B` | Hover state, highlights |
| `color-gold-bg` | `#F5DFA0` | Background tint, tag background |
| `color-gold-pill` | `#D4A843` | Bottom nav, primary button |

### Neutral
| Token | Hex | การใช้งาน |
|---|---|---|
| `color-bg` | `#F5F0E8` | App background |
| `color-white` | `#FFFFFF` | Card surface |
| `color-text` | `#1A1008` | Body text, headings |
| `color-subtext` | `#8B7355` | Labels, captions, placeholders |
| `color-border` | `#E8DDD0` | Card borders, dividers |

### Brown Scale
| Token | Hex | การใช้งาน |
|---|---|---|
| `color-brown` | `#3D2B1F` | Dark text, hero text |
| `color-brown-mid` | `#6B4C35` | Secondary text |
| `color-brown-light` | `#A07850` | Muted values |

### Semantic / Feedback
| Token | Hex | การใช้งาน |
|---|---|---|
| `color-success` | `#6BAF6B` | Perfect shot, online status |
| `color-info` | `#6B96AF` | Under-extracted indicator |
| `color-warning` | `#AF6B6B` | Over-extracted indicator |

### Grinder Identity
| Grinder | Color | Roast |
|---|---|---|
| A | `#C8922A` | Light Roast |
| B | `#8B5E3C` | Medium Roast |
| C | `#4A2C1A` | Dark Roast |

---

## 3. Typography

### Font Stack
```
Serif (Display):   Georgia, "Times New Roman", serif
Sans-serif (UI):   -apple-system, "Segoe UI", sans-serif
```

### Scale
| Token | Size | Weight | Font | การใช้งาน |
|---|---|---|---|---|
| `text-hero` | 80px | 900 | Serif | เบอร์บดหลัก (Grind Number) |
| `text-display` | 32px | 800 | Serif | Hero headline |
| `text-title` | 22px | 800 | Serif | Page title |
| `text-heading` | 18px | 700 | Serif | Card heading |
| `text-body-lg` | 15px | 400 | Sans | Body text, button label |
| `text-body` | 13px | 400 | Sans | Body text |
| `text-caption` | 11px | 400 | Sans | Captions, metadata |
| `text-label` | 9px | 400 | Sans | Labels (ALL CAPS + letter-spacing: 3px) |

---

## 4. Spacing

| Token | Value | การใช้งาน |
|---|---|---|
| `space-xs` | 4px | Gap เล็กๆ ระหว่าง inline elements |
| `space-sm` | 8px | Gap ระหว่าง label กับ content |
| `space-md` | 12px | Gap ระหว่าง elements ในกลุ่มเดียว |
| `space-lg` | 18px | Padding card, section gap |
| `space-xl` | 22px | Page padding horizontal |
| `space-2xl` | 28px | Section margin |

---

## 5. Border Radius

| Token | Value | การใช้งาน |
|---|---|---|
| `radius-sm` | 8px | Tag, badge |
| `radius-md` | 14px | Sensor display, small card |
| `radius-lg` | 18–20px | Card, list item |
| `radius-xl` | 24px | Hero card, bean card |
| `radius-full` | 50px | Pill button, bottom nav |

---

## 6. Components

### 6.1 Grind Number Display (Hero)
```
- Font:       Georgia, 80px, weight 900
- Color:      color-gold (#C8922A)
- Background: white card, border 1.5px color-gold-bg
- Shadow:     0 6px 30px rgba(200,146,42,.15)
- Decorative: circle blur ขวาบน + ☕ ghost icon opacity .15
```

### 6.2 Grinder Selector (Pill Button)
```
- Shape:          border-radius: 50px (pill)
- Active:         background color-gold-pill, color white, shadow 0 4px 14px goldPill 40%
- Inactive:       background white, border color-border, color subtext
- Size:           flex:1, padding 12px 0
- Label:          Grinder letter (serif 13px bold) + roast type (sans 9px)
```

### 6.3 Bean Card (Vertical Scroll Card)
```
- Width:          120px (fixed, horizontal scroll)
- Border-radius:  20px
- Image area:     Height 90px, gradient background, ☕ emoji 40px
- Active border:  1.5px solid grinder color
- Shadow:         0 4px 18px grinder-color 30% (active only)
- Content:        Name serif 11px bold, flavor sans 9px, Agtron badge
```

### 6.4 Feedback Button
```
- 3 states: Under / Perfect / Over
- Shape:     border-radius 16px, flex:1
- Active:    border + background tint + shadow of semantic color
- Icon:      ↓ / ✓ / ↑ (20px)
- Label:     sans 10px, letter-spacing .5
```

### 6.5 Bottom Navigation (Pill Nav)
```
- Container:  background color-gold-pill, border-radius 50px, padding 6px
- Active tab: white pill background, icon color-gold
- Inactive:   transparent background, icon rgba(255,255,255,.8)
- Fixed:      bottom 0, backdrop-filter blur(16px)
- Height:     ~68px total (nav pill + safe area padding)
```

### 6.6 Sensor Badge
```
- Background:  color-gold-bg
- Border-radius: 14px
- Content:     status dot (6px circle) + label "ESP32" + value
- Status dot:  color-success green with glow shadow
```

### 6.7 Tag / Badge
```
- Background:  color-gold-bg (gold tags) / color-bg (neutral tags)
- Color:       color-gold / color-subtext
- Border-radius: 8px
- Padding:     2px 8px
- Font:        sans 9px, weight 700
```

### 6.8 Stat Card (Shot Log)
```
- Layout:   flex row, 4 equal columns
- BG:       white, border-radius 16px
- Number:   22px weight 900, semantic color
- Label:    sans 9px subtext
```

---

## 7. Elevation / Shadow

| Level | Shadow | การใช้งาน |
|---|---|---|
| `shadow-sm` | `0 2px 8px rgba(0,0,0,.06)` | List item, setting row |
| `shadow-md` | `0 4px 14px rgba(0,0,0,.08)` | Card default |
| `shadow-gold` | `0 6px 30px rgba(200,146,42,.15)` | Hero result card |
| `shadow-active` | `0 4px 14px {color}40` | Active button state |

---

## 8. Iconography

ใช้ Unicode symbols แทน icon library เพื่อให้ใช้งานได้ทันทีโดยไม่ต้อง import:

| Symbol | ความหมาย |
|---|---|
| `⌂` | Home |
| `✦` | Beans |
| `◈` | Shot Log |
| `◎` | Settings |
| `✓` | Perfect shot |
| `↓` | Under-extracted |
| `↑` | Over-extracted |
| `☕` | Coffee / Decorative |

---

## 9. Motion & Transition

```css
/* Standard transition */
transition: all 0.2s ease;

/* Button press (active state) */
transform: scale(0.97);

/* Card hover */
box-shadow: shadow-gold;
```
- ไม่ใช้ animation ที่ซับซ้อน — เน้น responsiveness
- Feedback state เปลี่ยนทันทีใน 200ms
- Hero number update ไม่มี transition (ต้องการ clarity)

---

## 10. Hero Photo Strip

```
- Height:      170px
- Background:  dark brown gradient linear-gradient(135deg, #5c3820, #2d1a0e)
- Overlay:     gradient to top rgba(20,10,5,.7) → transparent
- Content:     label (sans 11px uppercase) + bean name (serif 24px bold white)
- Production:  แทนด้วยรูปภาพจริงของเมล็ดกาแฟ หรือ barista action shot
```

---

## 11. Screen Inventory

| Screen | Path | หมายเหตุ |
|---|---|---|
| Hero / Splash | `/` | FullScreen photo + CTA button |
| Dashboard | `/home` | Grinder → Bean → Env → Result → Feedback |
| Bean Profiles | `/beans` | List ทั้ง 20 เมล็ด + baseline info |
| Shot Log | `/log` | Stats summary + chronological log |
| Settings | `/settings` | Sensor config + grinder baseline + calibration |

---

## 12. Responsive Notes (Tablet)

- **Min width:** 375px (iPhone fallback)
- **Optimal:** 480px (หน้าจอแนวตั้ง Tablet 7–10")
- **Touch target:** minimum 44×44px สำหรับทุก interactive element
- **Bottom safe area:** padding-bottom 18px + nav height
- **Font scale:** ไม่ลดต่ำกว่า 10px สำหรับ label ใดๆ

---

*Design System นี้ใช้คู่กับ GrindIQ PRD v1.0*
*อัปเดตล่าสุด: 2026-03-10*
