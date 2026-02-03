# EV Analytics Dashboard

A modern, responsive analytics dashboard for visualizing Electric Vehicle (EV) population data. Built with React, TypeScript, and Tailwind CSS.

**[🚀 Live Demo](YOUR_DEPLOYMENT_URL_HERE)**

*(Please replace `YOUR_DEPLOYMENT_URL_HERE` with the actual URL after deployment)*

---

## 📊 Overview

This dashboard provides key insights into the EV ecosystem in Washington State, processing over 50,000 vehicle records to visualize:
- **Adoption Trends:** Year-over-year EV registration growth.
- **Market Dominance:** Top manufacturers and most popular models.
- **Geographic Data:** Distribution of EVs across counties.
- **Technology Stats:** BEV vs. PHEV split and electric range analysis.
- **Incentives:** Clean Alternative Fuel Vehicle (CAFV) eligibility.

## 🛠 Tech Stack

- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Light Theme)
- **Visualization:** Recharts
- **Data Parsing:** PapaParse

## ✨ Features

- **Performance:** Fast parsing of client-side CSV data (~50k records).
- **Design:** Clean, modern light theme with responsive grid layout.
- **Interactivity:** Interactive charts with tooltips and hover effects.
- **Type Safety:** Full TypeScript implementation for robust code.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chari143/analytics-dashboard-assessment.git
   cd analytics-dashboard-assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 to view the dashboard.

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── types/              # TypeScript interface definitions
├── utils/              # Data parsing and processing logic
├── components/         # Reusable UI cards and Chart components
├── App.tsx             # Main dashboard layout
├── main.tsx            # Entry point
└── index.css           # Tailwind directives
```

---

## 📝 Assessment Submission

- **Repository:** Private GitHub Repository
- **Dataset:** [Electric Vehicle Population Data](./data-to-visualize/Electric_Vehicle_Population_Data.csv)
- **Collaborators:** Added as requested.
