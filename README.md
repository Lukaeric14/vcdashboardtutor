# VC Metrics Dashboard

An interactive learning dashboard for mastering the 20 most common venture capital metrics. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 1. Interactive Metric Dashboard
- **20 VC Metrics** organized into three categories:
  - **Fund-Level (1-10)**: TVPI, DPI, RVPI, IRR, MOIC, Capital Called, Deployment Rate, Cash Yield, Fund Age, Net Asset Value
  - **Deal-Level (11-15)**: Average Check Size, Ownership %, Markup Ratio, Follow-On Rate, Entry Valuation
  - **Portfolio-Level (16-20)**: Loss Ratio, Exit Rate, Concentration, Success Rate, Portfolio Size

### 2. Color-Coded Performance
- 🟢 **Excellent**: Top-tier performance
- 🟡 **Good**: Within target range
- 🔴 **Poor**: Below market norms

### 3. Top VC Fund Comparison (NEW!)
- **Load real-world inspired data from 5 top-tier VC funds**:
  - **Sequoia Capital Fund XVI (2018)**: 3.2x DPI, industry-leading cash returns
  - **Andreessen Horowitz Fund VI (2019)**: $3.5B mega-fund, 2.74x TVPI
  - **Accel Partners Fund XIV (2020)**: 3.63x TVPI, strong Series A focus
  - **Benchmark Capital Fund XI (2017)**: 5.49x TVPI, elite boutique performance
  - **Founders Fund VII (2019)**: 3.12x TVPI, contrarian deep tech bets
- Compare your fund's metrics against the best performers
- Based on 2024 industry benchmarks and publicly available data

### 4. Interactive Input Panel
- Real-time metric calculation
- Edit fund data:
  - Fund size, paid-in capital, distributed capital
  - Portfolio companies, exits, write-offs
  - Ownership percentages and investment sizes
- Reset to default values

### 5. Tooltips & Learning
- Hover over any metric's (?) icon to see:
  - Detailed explanation
  - Formula used
  - Benchmark ranges for excellent/good/poor performance

### 6. Practice Mode
- Random scenario generator with 5 different fund scenarios:
  - Early-Stage Seed Fund
  - Growth-Stage VC Fund
  - Series A Fund
  - Mature Multi-Stage Fund
  - Struggling Fund
- Estimate key metrics (TVPI, DPI, IRR)
- Get instant feedback on accuracy
- Color-coded results showing your estimates vs. actual values

### 7. Progress Tracking
- **Gamified Learning System**:
  - XP points and levels
  - Daily streak tracking 🔥
  - Accuracy percentage
  - Achievements system
- **Persistent Progress**: All data saved to localStorage
- **Stats Dashboard**: View detailed progress and achievements

### 8. Export Functionality
- Download CSV with all metrics and fund data
- Easy sharing and analysis

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lukaeric14/vcdashboardtutor.git
cd vcdashboardtutor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vcdashboardtutor/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── MetricTile.tsx      # Individual metric display
│   │   ├── InputPanel.tsx      # Fund data input form
│   │   ├── FundSelector.tsx    # Top fund selector UI
│   │   ├── PracticeMode.tsx    # Practice scenario UI
│   │   └── ProgressTracker.tsx # User progress display
│   ├── lib/
│   │   ├── metrics.ts          # Metric calculation functions
│   │   ├── benchmarks.ts       # Metric definitions & benchmarks
│   │   ├── topFunds.ts         # Top VC fund presets
│   │   ├── practiceScenarios.ts # Practice scenario generator
│   │   └── progress.ts         # Progress tracking utilities
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Metric Formulas

### Fund-Level Metrics
1. **TVPI** = (Distributed + Unrealized) / Paid-In Capital
2. **DPI** = Distributed Capital / Paid-In Capital
3. **RVPI** = Unrealized Value / Paid-In Capital
4. **IRR** = ((Total Value / Paid-In) ^ (1 / Fund Age)) - 1
5. **MOIC** = Total Value / Total Invested
6. **Capital Called** = Paid-In Capital / Fund Size
7. **Deployment Rate** = Total Invested / Paid-In Capital
8. **Cash Yield** = Distributed Capital / Paid-In Capital
9. **Fund Age** = Current Year - Vintage Year
10. **Net Asset Value** = Unrealized Value

### Deal-Level Metrics
11. **Average Check Size** = Total Investments / Number of Companies
12. **Ownership %** = Average Ownership across portfolio
13. **Markup Ratio** = Unrealized Value / Cost Basis
14. **Follow-On Rate** = Follow-On Investments / Total Companies
15. **Entry Valuation** = Investment Size / Ownership %

### Portfolio-Level Metrics
16. **Loss Ratio** = Write-offs / Total Companies
17. **Exit Rate** = Exits / Total Companies
18. **Concentration** = Top 5 Holdings Value / Total Value
19. **Success Rate** = (Total Companies - Write-offs) / Total Companies
20. **Portfolio Size** = Number of Companies

## Benchmark Ranges

| Metric | Excellent | Good | Poor |
|--------|-----------|------|------|
| TVPI | 3.0x+ | 2.0-3.0x | <2.0x |
| DPI | 2.5x+ | 1.5-2.5x | <1.5x |
| IRR | 30%+ | 20-30% | <20% |
| Loss Ratio | <30% | 30-50% | >50% |
| Exit Rate | 40%+ | 25-40% | <25% |

*See benchmarks.ts for complete benchmark definitions*

## Usage Guide

### Learning the Metrics
1. Start with the default fund data to see example metrics
2. Hover over the (?) icon on any metric to learn:
   - What it measures
   - How it's calculated
   - What values are considered good/excellent/poor
3. Adjust the input values to see how metrics change in real-time

### Comparing with Top Funds
1. Click "Load Top Fund" button
2. Browse the 5 elite VC funds with their performance highlights
3. Select a fund to load (e.g., Sequoia Capital, a16z, Accel)
4. Compare the metrics to understand what top-tier performance looks like
5. Learn from the best:
   - Sequoia: 3.2x DPI shows excellent cash distribution
   - Benchmark: 5.49x TVPI demonstrates elite total returns
   - a16z: Large fund size with strong multi-stage strategy

### Practice Mode
1. Click "Practice Mode" button
2. Review the randomly generated scenario
3. Estimate TVPI, DPI, and IRR based on the fund data
4. Submit your estimates
5. Review your accuracy with color-coded feedback:
   - 🟢 Green: Within tolerance
   - 🟡 Yellow: Close but not quite
   - 🔴 Red: Needs improvement
6. Try another scenario or exit

### Progress Tracking
1. Click the progress badge in the bottom-right corner
2. View your stats:
   - Current level and XP
   - Total attempts and accuracy
   - Daily streak
   - Unlocked achievements
3. Reset progress if you want to start fresh

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **localStorage** - Progress persistence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Built as a learning tool for aspiring VCs and fund managers.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy Learning!** Master these 20 metrics and you'll be well-equipped to analyze any VC fund.
