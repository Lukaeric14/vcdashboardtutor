'use client'

import { FundData } from '@/types'

interface InputPanelProps {
  fundData: FundData
  onUpdate: (data: FundData) => void
  onReset: () => void
}

export default function InputPanel({ fundData, onUpdate, onReset }: InputPanelProps) {
  const handleChange = (field: keyof FundData, value: number) => {
    onUpdate({
      ...fundData,
      [field]: value,
    })
  }

  const formatCurrency = (value: number) => {
    return (value / 1_000_000).toFixed(1)
  }

  const parseCurrency = (value: string) => {
    return parseFloat(value) * 1_000_000
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Fund Data Input</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset to Default
        </button>
      </div>

      <div className="space-y-6">
        {/* Fund-Level Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Fund-Level Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fund Size ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.fundSize)}
                onChange={(e) => handleChange('fundSize', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid-In Capital ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.paidInCapital)}
                onChange={(e) => handleChange('paidInCapital', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distributed Capital ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.distributedCapital)}
                onChange={(e) => handleChange('distributedCapital', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unrealized Value ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.unrealizedValue)}
                onChange={(e) => handleChange('unrealizedValue', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vintage Year
              </label>
              <input
                type="number"
                value={fundData.vintageYear}
                onChange={(e) => handleChange('vintageYear', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="2000"
                max="2030"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Investments ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.totalInvestments)}
                onChange={(e) => handleChange('totalInvestments', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Portfolio-Level Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Portfolio Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Companies
              </label>
              <input
                type="number"
                value={fundData.numberOfCompanies}
                onChange={(e) => handleChange('numberOfCompanies', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Exits
              </label>
              <input
                type="number"
                value={fundData.numberOfExits}
                onChange={(e) => handleChange('numberOfExits', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Write-Offs
              </label>
              <input
                type="number"
                value={fundData.numberOfWriteOffs}
                onChange={(e) => handleChange('numberOfWriteOffs', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top 5 Holdings Value ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.topFiveHoldingsValue)}
                onChange={(e) => handleChange('topFiveHoldingsValue', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Deal-Level Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Deal Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Ownership (%)
              </label>
              <input
                type="number"
                value={(fundData.averageOwnership * 100).toFixed(1)}
                onChange={(e) => handleChange('averageOwnership', parseFloat(e.target.value) / 100)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Investment Size ($M)
              </label>
              <input
                type="number"
                value={formatCurrency(fundData.averageInvestmentSize)}
                onChange={(e) => handleChange('averageInvestmentSize', parseCurrency(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-On Investments (Count)
              </label>
              <input
                type="number"
                value={fundData.followOnInvestments}
                onChange={(e) => handleChange('followOnInvestments', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
