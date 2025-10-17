// Performance levels for color coding
export type PerformanceLevel = 'excellent' | 'good' | 'poor'

// Fund input data
export interface FundData {
  // Fund-level inputs
  fundSize: number
  paidInCapital: number
  distributedCapital: number
  unrealizedValue: number
  vintageYear: number
  currentYear: number

  // Portfolio-level inputs
  totalInvestments: number
  numberOfCompanies: number
  numberOfExits: number
  numberOfWriteOffs: number
  exitValues: number[]
  investmentDates: Date[]

  // Deal-level inputs
  averageOwnership: number
  averageInvestmentSize: number
  followOnInvestments: number
  topFiveHoldingsValue: number
}

// Individual metric result
export interface MetricResult {
  name: string
  value: number | string
  displayValue: string
  performance: PerformanceLevel
  category: 'fund' | 'deal' | 'portfolio'
  tooltip: string
  benchmark: {
    excellent: string
    good: string
    poor: string
  }
}

// All calculated metrics
export interface CalculatedMetrics {
  // Fund-Level Metrics (1-10)
  tvpi: MetricResult
  dpi: MetricResult
  rvpi: MetricResult
  irr: MetricResult
  moic: MetricResult
  capitalCalled: MetricResult
  deploymentRate: MetricResult
  cashYield: MetricResult
  fundAge: MetricResult
  netAssetValue: MetricResult

  // Deal-Level Metrics (11-15)
  averageCheckSize: MetricResult
  ownershipPercentage: MetricResult
  markupRatio: MetricResult
  followOnRate: MetricResult
  entryValuation: MetricResult

  // Portfolio-Level Metrics (16-20)
  lossRatio: MetricResult
  exitRate: MetricResult
  concentration: MetricResult
  successRate: MetricResult
  portfolioSize: MetricResult
}

// Metric metadata for tooltips and benchmarks
export interface MetricDefinition {
  name: string
  key: keyof CalculatedMetrics
  category: 'fund' | 'deal' | 'portfolio'
  description: string
  formula: string
  benchmarks: {
    excellent: { min?: number; max?: number; description: string }
    good: { min?: number; max?: number; description: string }
    poor: { description: string }
  }
  unit: 'multiplier' | 'percentage' | 'currency' | 'number' | 'years'
}

// Practice mode scenario
export interface PracticeScenario {
  id: string
  name: string
  description: string
  fundData: Partial<FundData>
  targetMetrics: {
    metric: keyof CalculatedMetrics
    estimatedValue: number
    tolerance: number
  }[]
}

// User progress tracking
export interface UserProgress {
  totalAttempts: number
  correctEstimates: number
  streak: number
  lastPracticeDate: string
  xp: number
  level: number
  scenariosCompleted: string[]
}
