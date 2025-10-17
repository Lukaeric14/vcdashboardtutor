import { FundData, PracticeScenario } from '@/types'

/**
 * Generate a random practice scenario
 */
export function generateRandomScenario(): PracticeScenario {
  const scenarios = [
    {
      name: 'Early-Stage Seed Fund',
      description: 'A 2019 vintage seed fund with $50M AUM',
      fundData: {
        fundSize: 50_000_000,
        paidInCapital: 45_000_000,
        distributedCapital: 15_000_000,
        unrealizedValue: 80_000_000,
        vintageYear: 2019,
        currentYear: new Date().getFullYear(),
        totalInvestments: 42_000_000,
        numberOfCompanies: 35,
        numberOfExits: 6,
        numberOfWriteOffs: 8,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.08,
        averageInvestmentSize: 1_200_000,
        followOnInvestments: 25,
        topFiveHoldingsValue: 50_000_000,
      },
    },
    {
      name: 'Growth-Stage VC Fund',
      description: 'A 2018 vintage growth fund with $200M AUM',
      fundData: {
        fundSize: 200_000_000,
        paidInCapital: 180_000_000,
        distributedCapital: 120_000_000,
        unrealizedValue: 280_000_000,
        vintageYear: 2018,
        currentYear: new Date().getFullYear(),
        totalInvestments: 165_000_000,
        numberOfCompanies: 20,
        numberOfExits: 10,
        numberOfWriteOffs: 3,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.15,
        averageInvestmentSize: 8_250_000,
        followOnInvestments: 16,
        topFiveHoldingsValue: 180_000_000,
      },
    },
    {
      name: 'Series A Fund',
      description: 'A 2020 vintage Series A fund with $100M AUM',
      fundData: {
        fundSize: 100_000_000,
        paidInCapital: 85_000_000,
        distributedCapital: 25_000_000,
        unrealizedValue: 150_000_000,
        vintageYear: 2020,
        currentYear: new Date().getFullYear(),
        totalInvestments: 78_000_000,
        numberOfCompanies: 18,
        numberOfExits: 4,
        numberOfWriteOffs: 2,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.18,
        averageInvestmentSize: 4_333_333,
        followOnInvestments: 14,
        topFiveHoldingsValue: 95_000_000,
      },
    },
    {
      name: 'Mature Multi-Stage Fund',
      description: 'A 2016 vintage multi-stage fund with $300M AUM',
      fundData: {
        fundSize: 300_000_000,
        paidInCapital: 280_000_000,
        distributedCapital: 350_000_000,
        unrealizedValue: 180_000_000,
        vintageYear: 2016,
        currentYear: new Date().getFullYear(),
        totalInvestments: 270_000_000,
        numberOfCompanies: 30,
        numberOfExits: 18,
        numberOfWriteOffs: 7,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.13,
        averageInvestmentSize: 9_000_000,
        followOnInvestments: 22,
        topFiveHoldingsValue: 110_000_000,
      },
    },
    {
      name: 'Struggling Fund',
      description: 'A 2017 vintage fund facing challenges',
      fundData: {
        fundSize: 75_000_000,
        paidInCapital: 70_000_000,
        distributedCapital: 20_000_000,
        unrealizedValue: 40_000_000,
        vintageYear: 2017,
        currentYear: new Date().getFullYear(),
        totalInvestments: 65_000_000,
        numberOfCompanies: 22,
        numberOfExits: 3,
        numberOfWriteOffs: 12,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.11,
        averageInvestmentSize: 2_954_545,
        followOnInvestments: 8,
        topFiveHoldingsValue: 28_000_000,
      },
    },
  ]

  const randomIndex = Math.floor(Math.random() * scenarios.length)
  const scenario = scenarios[randomIndex]

  return {
    id: `scenario-${Date.now()}`,
    ...scenario,
    targetMetrics: [
      { metric: 'tvpi', estimatedValue: 0, tolerance: 0.3 },
      { metric: 'dpi', estimatedValue: 0, tolerance: 0.2 },
      { metric: 'irr', estimatedValue: 0, tolerance: 5 },
    ],
  }
}

/**
 * Get predefined practice scenarios
 */
export function getPracticeScenarios(): PracticeScenario[] {
  return [
    {
      id: 'seed-fund-1',
      name: 'Seed Fund Challenge',
      description: 'Early-stage seed fund, high growth potential',
      fundData: {
        fundSize: 50_000_000,
        paidInCapital: 45_000_000,
        distributedCapital: 15_000_000,
        unrealizedValue: 80_000_000,
        vintageYear: 2019,
        currentYear: new Date().getFullYear(),
        totalInvestments: 42_000_000,
        numberOfCompanies: 35,
        numberOfExits: 6,
        numberOfWriteOffs: 8,
        exitValues: [],
        investmentDates: [],
        averageOwnership: 0.08,
        averageInvestmentSize: 1_200_000,
        followOnInvestments: 25,
        topFiveHoldingsValue: 50_000_000,
      },
      targetMetrics: [
        { metric: 'tvpi', estimatedValue: 2.11, tolerance: 0.3 },
        { metric: 'dpi', estimatedValue: 0.33, tolerance: 0.2 },
      ],
    },
  ]
}
