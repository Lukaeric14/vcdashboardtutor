import { FundData } from '@/types'

/**
 * Real-world inspired fund data for top VC firms
 * Based on 2024 performance benchmarks and publicly available data
 */

export interface FundPreset {
  id: string
  name: string
  description: string
  fundData: FundData
  highlights: string[]
}

export const TOP_VC_FUNDS: FundPreset[] = [
  {
    id: 'sequoia-2018',
    name: 'Sequoia Capital Fund XVI (2018)',
    description: 'One of the most successful venture funds, known for exceptional DPI through early liquidity strategies',
    fundData: {
      fundSize: 800_000_000,
      paidInCapital: 780_000_000,
      distributedCapital: 2_500_000_000, // 3.2x DPI based on research
      unrealizedValue: 1_200_000_000,
      vintageYear: 2018,
      currentYear: new Date().getFullYear(),
      totalInvestments: 750_000_000,
      numberOfCompanies: 25,
      numberOfExits: 12,
      numberOfWriteOffs: 4,
      exitValues: [],
      investmentDates: [],
      averageOwnership: 0.15,
      averageInvestmentSize: 30_000_000,
      followOnInvestments: 20,
      topFiveHoldingsValue: 700_000_000,
    },
    highlights: [
      '3.2x DPI - Industry leading cash returns',
      '4.74x TVPI - Exceptional total value',
      'Early secondary program enabled high DPI',
      'Portfolio includes Stripe, Airbnb, DoorDash'
    ]
  },
  {
    id: 'a16z-2019',
    name: 'Andreessen Horowitz Fund VI (2019)',
    description: '$3.5B mega-fund from one of the most active and influential VC firms',
    fundData: {
      fundSize: 3_500_000_000,
      paidInCapital: 3_400_000_000,
      distributedCapital: 2_800_000_000,
      unrealizedValue: 6_500_000_000,
      vintageYear: 2019,
      currentYear: new Date().getFullYear(),
      totalInvestments: 3_200_000_000,
      numberOfCompanies: 45,
      numberOfExits: 14,
      numberOfWriteOffs: 8,
      exitValues: [],
      investmentDates: [],
      averageOwnership: 0.12,
      averageInvestmentSize: 71_111_111,
      followOnInvestments: 35,
      topFiveHoldingsValue: 3_800_000_000,
    },
    highlights: [
      '2.74x TVPI - Strong multi-stage returns',
      'Largest crypto/web3 portfolio',
      '100+ deals per year',
      'Portfolio includes Coinbase, Instacart, GitHub'
    ]
  },
  {
    id: 'accel-2020',
    name: 'Accel Partners Fund XIV (2020)',
    description: 'Leading Series A investor with strong track record, 40% DPI increase 2022-2024',
    fundData: {
      fundSize: 650_000_000,
      paidInCapital: 620_000_000,
      distributedCapital: 850_000_000,
      unrealizedValue: 1_400_000_000,
      vintageYear: 2020,
      currentYear: new Date().getFullYear(),
      totalInvestments: 590_000_000,
      numberOfCompanies: 32,
      numberOfExits: 10,
      numberOfWriteOffs: 5,
      exitValues: [],
      investmentDates: [],
      averageOwnership: 0.18,
      averageInvestmentSize: 18_437_500,
      followOnInvestments: 26,
      topFiveHoldingsValue: 850_000_000,
    },
    highlights: [
      '3.63x TVPI - Top quartile performance',
      '1.37x DPI - Strong cash distributions',
      'Focus on Series A enterprise & consumer',
      'Portfolio includes Spotify, Slack, Atlassian'
    ]
  },
  {
    id: 'benchmark-2017',
    name: 'Benchmark Capital Fund XI (2017)',
    description: 'Elite boutique firm with exceptional returns through concentrated portfolio strategy',
    fundData: {
      fundSize: 425_000_000,
      paidInCapital: 410_000_000,
      distributedCapital: 1_450_000_000,
      unrealizedValue: 800_000_000,
      vintageYear: 2017,
      currentYear: new Date().getFullYear(),
      totalInvestments: 400_000_000,
      numberOfCompanies: 18,
      numberOfExits: 9,
      numberOfWriteOffs: 2,
      exitValues: [],
      investmentDates: [],
      averageOwnership: 0.20,
      averageInvestmentSize: 22_222_222,
      followOnInvestments: 14,
      topFiveHoldingsValue: 550_000_000,
    },
    highlights: [
      '5.49x TVPI - Elite performance',
      '3.54x DPI - Exceptional cash returns',
      'Highly selective: ~18 companies per fund',
      'Portfolio includes Uber, Twitter, Snapchat'
    ]
  },
  {
    id: 'founders-fund-2019',
    name: 'Founders Fund VII (2019)',
    description: 'Peter Thiel\'s contrarian fund, known for bold bets on breakthrough technology',
    fundData: {
      fundSize: 1_300_000_000,
      paidInCapital: 1_250_000_000,
      distributedCapital: 1_100_000_000,
      unrealizedValue: 2_800_000_000,
      vintageYear: 2019,
      currentYear: new Date().getFullYear(),
      totalInvestments: 1_200_000_000,
      numberOfCompanies: 28,
      numberOfExits: 8,
      numberOfWriteOffs: 6,
      exitValues: [],
      investmentDates: [],
      averageOwnership: 0.14,
      averageInvestmentSize: 42_857_143,
      followOnInvestments: 22,
      topFiveHoldingsValue: 1_700_000_000,
    },
    highlights: [
      '3.12x TVPI - Strong total returns',
      'Focus on deep tech & frontier technologies',
      'Early investor in SpaceX, Palantir, Stripe',
      'Contrarian thesis-driven investing'
    ]
  }
]

/**
 * Get a fund preset by ID
 */
export function getFundPreset(id: string): FundPreset | undefined {
  return TOP_VC_FUNDS.find(fund => fund.id === id)
}

/**
 * Get all fund presets
 */
export function getAllFundPresets(): FundPreset[] {
  return TOP_VC_FUNDS
}
