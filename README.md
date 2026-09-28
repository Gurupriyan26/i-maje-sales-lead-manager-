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
| **9. Follow-up Date** | ✅ Implemented | Date picker with dynamic **Overdue** (red) and **Today** (yellow) alerts |
| **10. Notes & Activity Log** | ✅ Implemented | Chronological timeline log + inline quick note adder + AI enhancement |
| **11. Full CRUD Operations** | ✅ Implemented | Add modal, detailed Profile drawer, inline & modal Edit, Delete with modal confirmation |
| **12. Real-Time Search** | ✅ Implemented | Instant search matching customer name, company, email, phone, notes, and rep |
| **13. Multi-Filter Engine** | ✅ Implemented | Independent filters for Status, Source, Employee, Priority with removable badge tags |
| **14. KPI Summary Bar** | ✅ Implemented | Total Leads, Converted Leads, Pending in Pipeline, Urgent Overdue, Avg AI Score |
| **15. Form Validation** | ✅ Implemented | Strict visual error highlights (red glow + helper text) preventing invalid submissions |
| **16. Storage Method** | ✅ Implemented | Persistent browser LocalStorage + JSON/CSV export & JSON import |
| **17. Responsive UI/UX** | ✅ Implemented | Dark/Light themes, Glassmorphism, animations, mobile/tablet layout support |

---

## 📂 Project Structure

```
i-maje-sales-lead-manager-/
│
├── index.html         # Application layout, KPI dashboard, Kanban & Table grids, modals
├── style.css          # Glassmorphism design system, dark/light modes, animations, responsive CSS
├── app.js             # State engine, CRUD handlers, validation, AI score calculation, storage
└── README.md          # Project documentation & interview reference
```

---

## 🎯 How to Run and Demo the Application

1. **Direct Launch**:
   - Double-click or open **`index.html`** in **Google Chrome**, **Microsoft Edge**, **Firefox**, or **Safari**.
2. **Keyboard Shortcuts**:
   - Press <kbd>/</kbd> to quickly jump focus to the global search bar.
   - Press <kbd>Esc</kbd> to close any active modal or drawer.
3. **Demo Steps for Interviewers**:
   - **Step 1**: Show the **Kanban Board** and drag a lead card across stages (e.g. from *New* to *Interested* or *Converted*).
   - **Step 2**: Click the **Table** toggle at the top right to demonstrate sortable columns and contact links.
   - **Step 3**: Click **`+ Add New Lead`** and hit save without filling to show **form validation**. Then add a realistic lead.
   - **Step 4**: Click any lead card to open the **Lead Profile Drawer** and showcase the **Lead AI Intelligence**, **AI Email Drafter**, and **Activity Log**.
   - **Step 5**: Test the search bar and filter dropdowns to show dynamic KPI recalculation.
   - **Step 6**: Open the **`Data`** dropdown to export to CSV for Excel.
