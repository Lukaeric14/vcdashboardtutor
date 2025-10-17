'use client'

import { FundData } from '@/types'

interface CapitalFlowTableProps {
  fundData: FundData
}

export default function CapitalFlowTable({ fundData }: CapitalFlowTableProps) {
  // Calculate derived values
  const uncalledCapital = fundData.fundSize - fundData.paidInCapital
  const uninvestedCash = fundData.paidInCapital - fundData.totalInvestments
  const totalValue = fundData.distributedCapital + fundData.unrealizedValue
  const realizedGain = fundData.distributedCapital - (fundData.totalInvestments * (fundData.distributedCapital / totalValue))
  const unrealizedGain = fundData.unrealizedValue - (fundData.totalInvestments * (fundData.unrealizedValue / totalValue))

  const capitalCalledPct = (fundData.paidInCapital / fundData.fundSize) * 100
  const deploymentRatePct = (fundData.totalInvestments / fundData.paidInCapital) * 100

  const formatCurrency = (value: number) => `$${(value / 1_000_000).toFixed(1)}M`
  const formatPct = (value: number) => `${value.toFixed(1)}%`

  return (
    <div className="space-y-6">
      {/* Capital Flow Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Capital Flow Analysis</h2>

        {/* The Flow Diagram */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Step 1: Fund Commitments</div>
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-900">Fund Size</div>
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(fundData.fundSize)}</div>
                <div className="text-xs text-blue-700 mt-1">Total committed by LPs</div>
              </div>
            </div>

            <div className="px-4">
              <div className="text-2xl text-gray-400">→</div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Step 2: Capital Calls</div>
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-900">Paid-In Capital</div>
                <div className="text-3xl font-bold text-green-600">{formatCurrency(fundData.paidInCapital)}</div>
                <div className="text-xs text-green-700 mt-1">
                  {formatPct(capitalCalledPct)} called from LPs
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="text-2xl text-gray-400">→</div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Step 3: Deployments</div>
              <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-900">Total Invested</div>
                <div className="text-3xl font-bold text-purple-600">{formatCurrency(fundData.totalInvestments)}</div>
                <div className="text-xs text-purple-700 mt-1">
                  {formatPct(deploymentRatePct)} of paid-in deployed
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Capital Breakdown */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-1">Uncalled Capital</div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(uncalledCapital)}</div>
              <div className="text-xs text-gray-500">Still committed by LPs, not yet called</div>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-600 mb-1">Uninvested Cash</div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(uninvestedCash)}</div>
              <div className="text-xs text-gray-500">Called but not yet deployed (reserves + fees)</div>
            </div>
          </div>
        </div>

        {/* Detailed Capital Account */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Capital Account Breakdown</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Item</th>
                <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-right py-2 px-3 text-sm font-semibold text-gray-700">% of Fund Size</th>
                <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-200 bg-blue-50">
                <td className="py-3 px-3 font-semibold">Fund Size (Commitments)</td>
                <td className="text-right py-3 px-3 font-bold">{formatCurrency(fundData.fundSize)}</td>
                <td className="text-right py-3 px-3">100.0%</td>
                <td className="py-3 px-3 text-gray-600">Total LP commitments</td>
              </tr>

              <tr className="border-b border-gray-200">
                <td className="py-3 px-3 pl-6">└ Paid-In Capital</td>
                <td className="text-right py-3 px-3 font-semibold text-green-700">{formatCurrency(fundData.paidInCapital)}</td>
                <td className="text-right py-3 px-3 text-green-700">{formatPct(capitalCalledPct)}</td>
                <td className="py-3 px-3 text-gray-600">Capital called from LPs</td>
              </tr>

              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-3 px-3 pl-6">└ Uncalled Capital</td>
                <td className="text-right py-3 px-3 text-gray-600">{formatCurrency(uncalledCapital)}</td>
                <td className="text-right py-3 px-3 text-gray-600">{formatPct(100 - capitalCalledPct)}</td>
                <td className="py-3 px-3 text-gray-600">Remaining commitment</td>
              </tr>

              <tr className="border-b-2 border-gray-300">
                <td className="py-3 px-3 pl-12">• Total Invested</td>
                <td className="text-right py-3 px-3 font-semibold text-purple-700">{formatCurrency(fundData.totalInvestments)}</td>
                <td className="text-right py-3 px-3 text-purple-700">{formatPct(deploymentRatePct)}</td>
                <td className="py-3 px-3 text-gray-600">Deployed into companies</td>
              </tr>

              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="py-3 px-3 pl-12">• Uninvested Cash</td>
                <td className="text-right py-3 px-3 text-gray-600">{formatCurrency(uninvestedCash)}</td>
                <td className="text-right py-3 px-3 text-gray-600">{formatPct(100 - deploymentRatePct)}</td>
                <td className="py-3 px-3 text-gray-600">Reserves + mgmt fees</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
