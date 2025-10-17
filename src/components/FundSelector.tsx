'use client'

import { useState } from 'react'
import { FundData } from '@/types'
import { TOP_VC_FUNDS, FundPreset } from '@/lib/topFunds'

interface FundSelectorProps {
  onSelectFund: (fundData: FundData) => void
  currentFundName?: string
}

export default function FundSelector({ onSelectFund, currentFundName }: FundSelectorProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedFund, setSelectedFund] = useState<FundPreset | null>(null)

  const handleSelectFund = (fund: FundPreset) => {
    setSelectedFund(fund)
  }

  const handleLoadFund = () => {
    if (selectedFund) {
      onSelectFund(selectedFund.fundData)
      setShowModal(false)
      setSelectedFund(null)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Load Top Fund
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Load Top VC Fund</h2>
                  <p className="text-gray-600">Compare your metrics against industry leaders</p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedFund(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Fund List */}
              <div className="space-y-4 mb-6">
                {TOP_VC_FUNDS.map((fund) => (
                  <div
                    key={fund.id}
                    onClick={() => handleSelectFund(fund)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedFund?.id === fund.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{fund.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{fund.description}</p>
                      </div>
                      {selectedFund?.id === fund.id && (
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Key Metrics Preview */}
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs text-gray-500">Fund Size</div>
                        <div className="text-sm font-bold text-gray-900">
                          ${(fund.fundData.fundSize / 1_000_000_000).toFixed(1)}B
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs text-gray-500">Vintage</div>
                        <div className="text-sm font-bold text-gray-900">
                          {fund.fundData.vintageYear}
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs text-gray-500">Companies</div>
                        <div className="text-sm font-bold text-gray-900">
                          {fund.fundData.numberOfCompanies}
                        </div>
                      </div>
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <div className="text-xs text-gray-500">Exits</div>
                        <div className="text-sm font-bold text-gray-900">
                          {fund.fundData.numberOfExits}
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1">
                      {fund.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleLoadFund}
                  disabled={!selectedFund}
                  className={`flex-1 px-6 py-3 text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    selectedFund
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Load Selected Fund
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedFund(null)
                  }}
                  className="px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
