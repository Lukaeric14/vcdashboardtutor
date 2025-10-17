import { MetricDefinition, FundData, CalculatedMetrics, MetricResult } from '@/types'
import {
  calculateTVPI,
  calculateDPI,
  calculateRVPI,
  calculateIRR,
  calculateMOIC,
  calculateCapitalCalled,
  calculateDeploymentRate,
  calculateCashYield,
  calculateFundAge,
  calculateNetAssetValue,
  calculateAverageCheckSize,
  calculateOwnershipPercentage,
  calculateMarkupRatio,
  calculateFollowOnRate,
  calculateEntryValuation,
  calculateLossRatio,
  calculateExitRate,
  calculateConcentration,
  calculateSuccessRate,
  calculatePortfolioSize,
  formatMetricValue,
  getPerformanceLevel,
} from './metrics'

/**
 * All 20 VC metrics with definitions, formulas, and benchmarks
 */
export const METRIC_DEFINITIONS: MetricDefinition[] = [
  // FUND-LEVEL METRICS (1-10)
  {
    name: 'TVPI',
    key: 'tvpi',
    category: 'fund',
    description: 'Total Value to Paid-In: measures overall fund performance (realized + unrealized returns)',
    formula: '(Distributed + Unrealized) / Paid-In Capital',
    benchmarks: {
      excellent: { min: 3.0, description: '3.0x+' },
      good: { min: 2.0, max: 3.0, description: '2.0-3.0x' },
      poor: { description: '<2.0x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'DPI',
    key: 'dpi',
    category: 'fund',
    description: 'Distributed to Paid-In: measures cash actually returned to investors',
    formula: 'Distributed Capital / Paid-In Capital',
    benchmarks: {
      excellent: { min: 2.5, description: '2.5x+' },
      good: { min: 1.5, max: 2.5, description: '1.5-2.5x' },
      poor: { description: '<1.5x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'RVPI',
    key: 'rvpi',
    category: 'fund',
    description: 'Residual Value to Paid-In: measures remaining unrealized value in portfolio',
    formula: 'Unrealized Value / Paid-In Capital',
    benchmarks: {
      excellent: { min: 2.0, description: '2.0x+' },
      good: { min: 1.0, max: 2.0, description: '1.0-2.0x' },
      poor: { description: '<1.0x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'IRR',
    key: 'irr',
    category: 'fund',
    description: 'Internal Rate of Return: annualized return rate accounting for timing of cash flows',
    formula: '((Total Value / Paid-In) ^ (1 / Fund Age)) - 1',
    benchmarks: {
      excellent: { min: 30, description: '30%+' },
      good: { min: 20, max: 30, description: '20-30%' },
      poor: { description: '<20%' },
    },
    unit: 'percentage',
  },
  {
    name: 'MOIC',
    key: 'moic',
    category: 'fund',
    description: 'Multiple on Invested Capital: total return multiple on capital deployed',
    formula: 'Total Value / Total Invested',
    benchmarks: {
      excellent: { min: 3.5, description: '3.5x+' },
      good: { min: 2.5, max: 3.5, description: '2.5-3.5x' },
      poor: { description: '<2.5x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'Capital Called',
    key: 'capitalCalled',
    category: 'fund',
    description: 'Percentage of committed capital that has been called from LPs',
    formula: 'Paid-In Capital / Fund Size',
    benchmarks: {
      excellent: { min: 80, description: '80%+' },
      good: { min: 60, max: 80, description: '60-80%' },
      poor: { description: '<60%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Deployment Rate',
    key: 'deploymentRate',
    category: 'fund',
    description: 'Percentage of called capital that has been invested',
    formula: 'Total Invested / Paid-In Capital',
    benchmarks: {
      excellent: { min: 90, description: '90%+' },
      good: { min: 75, max: 90, description: '75-90%' },
      poor: { description: '<75%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Cash Yield',
    key: 'cashYield',
    category: 'fund',
    description: 'Cash distributions as a multiple of capital called (same as DPI)',
    formula: 'Distributed Capital / Paid-In Capital',
    benchmarks: {
      excellent: { min: 2.0, description: '2.0x+' },
      good: { min: 1.0, max: 2.0, description: '1.0-2.0x' },
      poor: { description: '<1.0x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'Fund Age',
    key: 'fundAge',
    category: 'fund',
    description: 'Number of years since fund vintage',
    formula: 'Current Year - Vintage Year',
    benchmarks: {
      excellent: { min: 5, max: 10, description: '5-10 years' },
      good: { min: 3, max: 12, description: '3-12 years' },
      poor: { description: '<3 or >12 years' },
    },
    unit: 'years',
  },
  {
    name: 'Net Asset Value',
    key: 'netAssetValue',
    category: 'fund',
    description: 'Current fair market value of remaining portfolio holdings',
    formula: 'Unrealized Value',
    benchmarks: {
      excellent: { min: 50_000_000, description: '$50M+' },
      good: { min: 20_000_000, max: 50_000_000, description: '$20-50M' },
      poor: { description: '<$20M' },
    },
    unit: 'currency',
  },

  // DEAL-LEVEL METRICS (11-15)
  {
    name: 'Average Check Size',
    key: 'averageCheckSize',
    category: 'deal',
    description: 'Average investment amount per portfolio company',
    formula: 'Total Investments / Number of Companies',
    benchmarks: {
      excellent: { min: 5_000_000, description: '$5M+' },
      good: { min: 2_000_000, max: 5_000_000, description: '$2-5M' },
      poor: { description: '<$2M' },
    },
    unit: 'currency',
  },
  {
    name: 'Ownership %',
    key: 'ownershipPercentage',
    category: 'deal',
    description: 'Average equity ownership across portfolio companies',
    formula: 'Average Ownership',
    benchmarks: {
      excellent: { min: 15, description: '15%+' },
      good: { min: 10, max: 15, description: '10-15%' },
      poor: { description: '<10%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Markup Ratio',
    key: 'markupRatio',
    category: 'deal',
    description: 'Ratio of current valuation to cost basis for unrealized investments',
    formula: 'Unrealized Value / Cost Basis',
    benchmarks: {
      excellent: { min: 3.0, description: '3.0x+' },
      good: { min: 2.0, max: 3.0, description: '2.0-3.0x' },
      poor: { description: '<2.0x' },
    },
    unit: 'multiplier',
  },
  {
    name: 'Follow-On Rate',
    key: 'followOnRate',
    category: 'deal',
    description: 'Percentage of portfolio companies that received follow-on funding',
    formula: 'Follow-On Investments / Total Companies',
    benchmarks: {
      excellent: { min: 70, description: '70%+' },
      good: { min: 50, max: 70, description: '50-70%' },
      poor: { description: '<50%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Entry Valuation',
    key: 'entryValuation',
    category: 'deal',
    description: 'Average post-money valuation at initial investment',
    formula: 'Investment Size / Ownership %',
    benchmarks: {
      excellent: { min: 10_000_000, max: 50_000_000, description: '$10-50M' },
      good: { min: 5_000_000, max: 100_000_000, description: '$5-100M' },
      poor: { description: '<$5M or >$100M' },
    },
    unit: 'currency',
  },

  // PORTFOLIO-LEVEL METRICS (16-20)
  {
    name: 'Loss Ratio',
    key: 'lossRatio',
    category: 'portfolio',
    description: 'Percentage of portfolio companies that became total losses',
    formula: 'Write-offs / Total Companies',
    benchmarks: {
      excellent: { max: 30, description: '<30%' },
      good: { min: 30, max: 50, description: '30-50%' },
      poor: { description: '>50%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Exit Rate',
    key: 'exitRate',
    category: 'portfolio',
    description: 'Percentage of portfolio companies that have exited',
    formula: 'Number of Exits / Total Companies',
    benchmarks: {
      excellent: { min: 40, description: '40%+' },
      good: { min: 25, max: 40, description: '25-40%' },
      poor: { description: '<25%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Concentration',
    key: 'concentration',
    category: 'portfolio',
    description: 'Percentage of total value in top 5 holdings',
    formula: 'Top 5 Holdings Value / Total Value',
    benchmarks: {
      excellent: { min: 50, max: 70, description: '50-70%' },
      good: { min: 40, max: 80, description: '40-80%' },
      poor: { description: '<40% or >80%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Success Rate',
    key: 'successRate',
    category: 'portfolio',
    description: 'Percentage of companies with positive returns',
    formula: '(Total Companies - Write-offs) / Total Companies',
    benchmarks: {
      excellent: { min: 70, description: '70%+' },
      good: { min: 50, max: 70, description: '50-70%' },
      poor: { description: '<50%' },
    },
    unit: 'percentage',
  },
  {
    name: 'Portfolio Size',
    key: 'portfolioSize',
    category: 'portfolio',
    description: 'Total number of portfolio companies',
    formula: 'Number of Companies',
    benchmarks: {
      excellent: { min: 20, max: 40, description: '20-40 companies' },
      good: { min: 15, max: 50, description: '15-50 companies' },
      poor: { description: '<15 or >50 companies' },
    },
    unit: 'number',
  },
]

/**
 * Calculate all metrics for given fund data
 */
export function calculateAllMetrics(data: FundData): CalculatedMetrics {
  const createMetricResult = (
    definition: MetricDefinition,
    calculateFn: (data: FundData) => number
  ): MetricResult => {
    const value = calculateFn(data)
    const displayValue = formatMetricValue(value, definition.unit)
    const performance = getPerformanceLevel(
      value,
      definition.benchmarks.excellent,
      definition.benchmarks.good
    )

    return {
      name: definition.name,
      value,
      displayValue,
      performance,
      category: definition.category,
      tooltip: `${definition.description}\n\nFormula: ${definition.formula}\n\nBenchmarks:\n🟢 Excellent: ${definition.benchmarks.excellent.description}\n🟡 Good: ${definition.benchmarks.good.description}\n🔴 Poor: ${definition.benchmarks.poor.description}`,
      benchmark: {
        excellent: definition.benchmarks.excellent.description,
        good: definition.benchmarks.good.description,
        poor: definition.benchmarks.poor.description,
      },
    }
  }

  return {
    tvpi: createMetricResult(METRIC_DEFINITIONS[0], calculateTVPI),
    dpi: createMetricResult(METRIC_DEFINITIONS[1], calculateDPI),
    rvpi: createMetricResult(METRIC_DEFINITIONS[2], calculateRVPI),
    irr: createMetricResult(METRIC_DEFINITIONS[3], calculateIRR),
    moic: createMetricResult(METRIC_DEFINITIONS[4], calculateMOIC),
    capitalCalled: createMetricResult(METRIC_DEFINITIONS[5], calculateCapitalCalled),
    deploymentRate: createMetricResult(METRIC_DEFINITIONS[6], calculateDeploymentRate),
    cashYield: createMetricResult(METRIC_DEFINITIONS[7], calculateCashYield),
    fundAge: createMetricResult(METRIC_DEFINITIONS[8], calculateFundAge),
    netAssetValue: createMetricResult(METRIC_DEFINITIONS[9], calculateNetAssetValue),
    averageCheckSize: createMetricResult(METRIC_DEFINITIONS[10], calculateAverageCheckSize),
    ownershipPercentage: createMetricResult(METRIC_DEFINITIONS[11], calculateOwnershipPercentage),
    markupRatio: createMetricResult(METRIC_DEFINITIONS[12], calculateMarkupRatio),
    followOnRate: createMetricResult(METRIC_DEFINITIONS[13], calculateFollowOnRate),
    entryValuation: createMetricResult(METRIC_DEFINITIONS[14], calculateEntryValuation),
    lossRatio: createMetricResult(METRIC_DEFINITIONS[15], calculateLossRatio),
    exitRate: createMetricResult(METRIC_DEFINITIONS[16], calculateExitRate),
    concentration: createMetricResult(METRIC_DEFINITIONS[17], calculateConcentration),
    successRate: createMetricResult(METRIC_DEFINITIONS[18], calculateSuccessRate),
    portfolioSize: createMetricResult(METRIC_DEFINITIONS[19], calculatePortfolioSize),
  }
}

/**
 * Get default/empty fund data
 */
export function getDefaultFundData(): FundData {
  return {
    fundSize: 100_000_000,
    paidInCapital: 80_000_000,
    distributedCapital: 40_000_000,
    unrealizedValue: 120_000_000,
    vintageYear: 2019,
    currentYear: new Date().getFullYear(),
    totalInvestments: 75_000_000,
    numberOfCompanies: 25,
    numberOfExits: 8,
    numberOfWriteOffs: 5,
    exitValues: [],
    investmentDates: [],
    averageOwnership: 0.12,
    averageInvestmentSize: 3_000_000,
    followOnInvestments: 18,
    topFiveHoldingsValue: 70_000_000,
  }
}
