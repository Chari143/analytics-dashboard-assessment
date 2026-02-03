# EV Analytics Dashboard

A simple dashboard I built to visualize electric vehicle data from Washington State. Uses React, TypeScript, and Tailwind CSS.

**[Live Demo →](https://analytics-dashboard-assessment-fawn-five.vercel.app/)**

---

## What it does

Loads around 50k vehicle records and shows:
- How EV adoption has grown over the years
- Which manufacturers dominate the market (spoiler: Tesla)
- Where EVs are most popular in the state
- Battery vs plug-in hybrid split
- Electric range distribution
- Incentive eligibility stats

## Tech I used

- React 18 with Vite for fast dev
- TypeScript for type safety
- Tailwind CSS for styling
- Recharts for the charts
- PapaParse for CSV parsing

## Running locally

```bash
# clone it
git clone https://github.com/Chari143/analytics-dashboard-assessment.git
cd analytics-dashboard-assessment

# install deps
npm install

# start dev server
npm run dev
```

Then open http://localhost:5173

## Building for prod

```bash
npm run build
```

Output goes to the `dist` folder.

## Project layout

```
src/
├── types/         # TS interfaces
├── utils/         # data processing
├── components/    # chart components
├── App.tsx        # main layout
└── index.css      # tailwind
```

---

Built for the MapUp Analytics Dashboard Assessment.
