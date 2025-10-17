import { FundData, PerformanceLevel } from '@/types'

/**
 * Calculate TVPI (Total Value to Paid-In)
 * Formula: (Distributed + Unrealized) / Paid-In Capital
 */
export function calculateTVPI(data: FundData): number {
  if (data.paidInCapital === 0) return 0
  return (data.distributedCapital + data.unrealizedValue) / data.paidInCapital
}

/**
 * Calculate DPI (Distributed to Paid-In)
 * Formula: Distributed Capital / Paid-In Capital
 */
export function calculateDPI(data: FundData): number {
  if (data.paidInCapital === 0) return 0
  return data.distributedCapital / data.paidInCapital
}

/**
 * Calculate RVPI (Residual Value to Paid-In)
 * Formula: Unrealized Value / Paid-In Capital
 */
export function calculateRVPI(data: FundData): number {
  if (data.paidInCapital === 0) return 0
  return data.unrealizedValue / data.paidInCapital
}

/**
 * Calculate IRR (Internal Rate of Return)
 * Simplified approximation: ((Total Value / Paid-In) ^ (1 / Fund Age)) - 1
 * For accurate IRR, you'd need actual cash flow dates
 */
export function calculateIRR(data: FundData): number {
  const fundAge = data.currentYear - data.vintageYear
  if (fundAge === 0 || data.paidInCapital === 0) return 0

  const totalValue = data.distributedCapital + data.unrealizedValue
  const multiple = totalValue / data.paidInCapital

  // Annualized return approximation
  const irr = (Math.pow(multiple, 1 / fundAge) - 1) * 100
  return irr
}

/**
 * Calculate MOIC (Multiple on Invested Capital)
 * Formula: Total Value / Total Invested
 */
export function calculateMOIC(data: FundData): number {
  if (data.totalInvestments === 0) return 0
  const totalValue = data.distributedCapital + data.unrealizedValue
  return totalValue / data.totalInvestments
}

/**
 * Calculate Capital Called Percentage
 * Formula: Paid-In Capital / Fund Size
 */
export function calculateCapitalCalled(data: FundData): number {
  if (data.fundSize === 0) return 0
  return (data.paidInCapital / data.fundSize) * 100
}

/**
 * Calculate Deployment Rate
 * Formula: Total Invested / Paid-In Capital
 */
export function calculateDeploymentRate(data: FundData): number {
  if (data.paidInCapital === 0) return 0
  return (data.totalInvestments / data.paidInCapital) * 100
}

/**
 * Calculate Cash Yield
 * Formula: Distributed Capital / Paid-In Capital (same as DPI)
 */
export function calculateCashYield(data: FundData): number {
  return calculateDPI(data)
}

/**
 * Calculate Fund Age
 * Formula: Current Year - Vintage Year
 */
export function calculateFundAge(data: FundData): number {
  return data.currentYear - data.vintageYear
}

/**
 * Calculate Net Asset Value
 * Formula: Unrealized Value
 */
export function calculateNetAssetValue(data: FundData): number {
  return data.unrealizedValue
}

/**
 * Calculate Average Check Size
 * Formula: Total Investments / Number of Companies
 */
export function calculateAverageCheckSize(data: FundData): number {
  if (data.numberOfCompanies === 0) return 0
  return data.totalInvestments / data.numberOfCompanies
}

/**
 * Calculate Ownership Percentage
 * Returns the average ownership across portfolio
 */
export function calculateOwnershipPercentage(data: FundData): number {
  return data.averageOwnership * 100
}

/**
 * Calculate Markup Ratio
 * Formula: Current Unrealized Value / (Total Investments - Distributed)
 */
export function calculateMarkupRatio(data: FundData): number {
  const costBasis = data.totalInvestments - data.distributedCapital
  if (costBasis === 0) return 0
  return data.unrealizedValue / costBasis
}

/**
 * Calculate Follow-On Rate
 * Formula: Follow-On Investments / Total Companies
 */
export function calculateFollowOnRate(data: FundData): number {
  if (data.numberOfCompanies === 0) return 0
  return (data.followOnInvestments / data.numberOfCompanies) * 100
}

/**
 * Calculate Entry Valuation
 * Formula: Average Investment Size / Average Ownership
 */
export function calculateEntryValuation(data: FundData): number {
  if (data.averageOwnership === 0) return 0
  return data.averageInvestmentSize / data.averageOwnership
}

/**
 * Calculate Loss Ratio
 * Formula: Number of Write-offs / Total Companies
 */
export function calculateLossRatio(data: FundData): number {
  if (data.numberOfCompanies === 0) return 0
  return (data.numberOfWriteOffs / data.numberOfCompanies) * 100
}

/**
 * Calculate Exit Rate
 * Formula: Number of Exits / Total Companies
 */
export function calculateExitRate(data: FundData): number {
  if (data.numberOfCompanies === 0) return 0
  return (data.numberOfExits / data.numberOfCompanies) * 100
}

/**
 * Calculate Concentration
 * Formula: Top 5 Holdings Value / Total Portfolio Value
 */
export function calculateConcentration(data: FundData): number {
  const totalValue = data.distributedCapital + data.unrealizedValue
  if (totalValue === 0) return 0
  return (data.topFiveHoldingsValue / totalValue) * 100
}

/**
 * Calculate Success Rate
 * Formula: (Total Companies - Write-offs) / Total Companies
 */
export function calculateSuccessRate(data: FundData): number {
  if (data.numberOfCompanies === 0) return 0
  const successfulCompanies = data.numberOfCompanies - data.numberOfWriteOffs
  return (successfulCompanies / data.numberOfCompanies) * 100
}

/**
 * Calculate Portfolio Size
 * Formula: Number of Companies
 */
export function calculatePortfolioSize(data: FundData): number {
  return data.numberOfCompanies
}

/**
 * Format values for display
 */
export function formatMetricValue(
  value: number,
  unit: 'multiplier' | 'percentage' | 'currency' | 'number' | 'years'
): string {
  if (isNaN(value) || !isFinite(value)) return 'N/A'

  switch (unit) {
    case 'multiplier':
      return `${value.toFixed(2)}x`
    case 'percentage':
      return `${value.toFixed(1)}%`
    case 'currency':
      return `$${(value / 1_000_000).toFixed(1)}M`
    case 'years':
      return `${value.toFixed(0)} yrs`
    case 'number':
      return value.toFixed(0)
    default:
      return value.toFixed(2)
  }
}

/**
 * Determine performance level based on benchmarks
 */
export function getPerformanceLevel(
  value: number,
  excellent: { min?: number; max?: number },
  good: { min?: number; max?: number }
): PerformanceLevel {
  // Check excellent range
  if (excellent.min !== undefined && excellent.max !== undefined) {
    if (value >= excellent.min && value <= excellent.max) return 'excellent'
  } else if (excellent.min !== undefined) {
    if (value >= excellent.min) return 'excellent'
  } else if (excellent.max !== undefined) {
    if (value <= excellent.max) return 'excellent'
  }

  // Check good range
  if (good.min !== undefined && good.max !== undefined) {
    if (value >= good.min && value <= good.max) return 'good'
  } else if (good.min !== undefined) {
    if (value >= good.min) return 'good'
  } else if (good.max !== undefined) {
    if (value <= good.max) return 'good'
  }

  return 'poor'
}
