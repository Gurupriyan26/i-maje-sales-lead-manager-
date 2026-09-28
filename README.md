# 🚀 ApexLead AI — Enterprise Sales Lead Manager

A modern, high-velocity Sales Lead Management web application built for the **Vibe Coding Challenge**.

---

## 🌟 Executive Summary & Highlights
- **Zero-Config Execution**: Works directly by opening `index.html` in any modern web browser without dependencies or build setups.
- **🔔 Follow-Up Alert System & Notification Hub**: Real-time notification bell with animated ringing indicator, unread badge count, dedicated Alert Center dropdown categorized by **Overdue**, **Due Today**, and **Upcoming**, with 1-click snooze actions (+1 Day, +3 Days) and quick email/call launchers.
- **Dual Visual Workflows**: Interactive **Kanban Pipeline Board** with HTML5 drag-and-drop + Sortable **Data Table View**.
- **Real-Time KPI Dashboard**: Live tracking of Total Leads, Converted Leads (with conversion %), Pending Leads, Urgent Overdue actions, and Average AI Score.
- **🤖 Embedded Lead AI Subsystem**: Rule-based AI lead scoring (0-100), automated deal health verdict, AI next-best action recommendations, and one-click personalized email pitch drafter.
- **Strict Validation & Data Integrity**: Client-side validation for all mandatory fields with real-time feedback and persistent **LocalStorage** engine.
- **Data Portability**: Built-in 1-click **Export to CSV (Excel)**, **Export to JSON**, **Import JSON**, and **Reset Demo Leads**.

---

## 🎯 Quick Start & Localhost Access

### Option 1: Run Local Dev Server (Recommended)
```bash
# 1. Install / Run local static server
npm run dev
# or: npx serve .
```
🌐 **Localhost URL:** [http://localhost:3000](http://localhost:3000) *(or http://localhost:5000)*

---

### Option 2: Direct Browser Execution (Zero Dependencies)
Simply open or double-click **`index.html`** in any web browser (Chrome, Edge, Firefox, Safari).

---

## 📋 Comprehensive Requirements Mapping

| Mandatory Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **1. Customer Name** | ✅ Implemented | Text field with min 2-character validation and avatar initials |
| **2. Company** | ✅ Implemented | Organization/company name with link & card tags |
| **3. Email** | ✅ Implemented | Strict email regex validation + click-to-email (`mailto:`) links |
| **4. Phone** | ✅ Implemented | Minimum 7 digits validation + click-to-call (`tel:`) links |
| **5. Lead Source** | ✅ Implemented | `Website`, `Google`, `Social Media`, `Referral`, `Email`, `Phone`, `Other` |
| **6. Assigned Employee** | ✅ Implemented | Dynamic sales rep assignment with auto-populated filter dropdowns |
| **7. Lead Status** | ✅ Implemented | `New`, `Contacted`, `Interested`, `Follow-up`, `Converted`, `Not Interested` |
| **8. Priority** | ✅ Implemented | `Low` (🟢), `Medium` (🟡), `High` (🔴) with visual badges |
| **9. Follow-up Date & Alerts** | ✅ Implemented | Auto-detects Overdue (< today) and Today's follow-ups with pulsing badges |
| **10. Notes & Activity Log** | ✅ Implemented | Chronological timeline log + inline quick note adder + AI enhancement |
| **11. Full CRUD Operations** | ✅ Implemented | Add modal, detailed Profile drawer, inline & modal Edit, Delete with modal confirmation |
| **12. Real-Time Search** | ✅ Implemented | Instant search matching customer name, company, email, phone, notes, and rep |
| **13. Multi-Filter Engine** | ✅ Implemented | Independent filters for Status, Source, Employee, Priority with removable badge tags |
| **14. KPI Summary Dashboard** | ✅ Implemented | Total Leads, Converted Leads, Overdue Leads, Due Today, Total Deal Value |
| **15. Form Validation** | ✅ Implemented | Strict visual error highlights (red glow + helper text) preventing invalid submissions |
| **16. Commission Calculator (Sec D)** | ✅ Implemented | Built-in debugged calculator ($800k @ 7% = $56k commission, $856k total) |
| **17. Storage & Portability** | ✅ Implemented | Persistent browser LocalStorage + JSON/CSV export & JSON import |
| **18. Responsive UI/UX** | ✅ Implemented | Dark/Light themes, Glassmorphism, animations, mobile/tablet layout support |

---

## 📂 Project Structure

```
i-maje-sales-lead-manager-/
│
├── index.html         # Application layout, KPI dashboard, Kanban & Table grids, modals
├── style.css          # Glassmorphism design system, dark/light modes, animations, responsive CSS
├── app.js             # State engine, CRUD handlers, validation, AI score calculation, storage
├── package.json       # Dev script runner (serve)
└── README.md          # Project documentation & interview reference
```

---

## 🎯 Demo Walkthrough for Reviewers

1. **Step 1: Dashboard & KPIs** — Check live metrics including Overdue and Due Today counters. Click the *🚨 Overdue* card to test instant 1-click filtering.
2. **Step 2: Kanban Pipeline** — Drag and drop any card between stages (e.g. from *Contacted* to *Converted*).
3. **Step 3: Table View** — Toggle to Table view and test multi-column sorting (Customer, Company, Status, Deal Value).
4. **Step 4: Lead Profile & AI Copilot** — Click on any lead to view interaction history, AI win score, and 1-click AI email draft.
5. **Step 5: Commission Calculator (Section D)** — Click *Commission Calc* in top bar to test live commission calculations (includes $800k @ 7% preset).
6. **Step 6: Data Portability** — Open the *Data* menu to export full pipeline to CSV or JSON.
