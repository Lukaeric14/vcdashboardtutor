'use client'

import { useState } from 'react'
import { PracticeScenario, CalculatedMetrics } from '@/types'
import { generateRandomScenario } from '@/lib/practiceScenarios'
import { calculateAllMetrics } from '@/lib/benchmarks'

interface PracticeModeProps {
  onClose: () => void
  onUpdateProgress?: (correct: boolean) => void
}

export default function PracticeMode({ onClose, onUpdateProgress }: PracticeModeProps) {
  const [scenario, setScenario] = useState<PracticeScenario>(generateRandomScenario())
  const [userEstimates, setUserEstimates] = useState<{ [key: string]: string }>({
    tvpi: '',
    dpi: '',
    irr: '',
  })
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<CalculatedMetrics | null>(null)

  const handleSubmit = () => {
    const calculated = calculateAllMetrics(scenario.fundData as any)
    setResults(calculated)
    setShowResults(true)

    // Check if estimates are close enough
    const tvpiCorrect = Math.abs(calculated.tvpi.value - parseFloat(userEstimates.tvpi || '0')) <= 0.3
    const dpiCorrect = Math.abs(calculated.dpi.value - parseFloat(userEstimates.dpi || '0')) <= 0.2
    const irrCorrect = Math.abs(calculated.irr.value - parseFloat(userEstimates.irr || '0')) <= 5

    const allCorrect = tvpiCorrect && dpiCorrect && irrCorrect
    if (onUpdateProgress) {
      onUpdateProgress(allCorrect)
    }
  }

  const handleNewScenario = () => {
    setScenario(generateRandomScenario())
    setUserEstimates({ tvpi: '', dpi: '', irr: '' })
    setShowResults(false)
    setResults(null)
  }

  const getAccuracyColor = (estimated: number, actual: number, tolerance: number) => {
    const diff = Math.abs(estimated - actual)
    if (diff <= tolerance) return 'text-green-600 bg-green-50'
    if (diff <= tolerance * 2) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Practice Mode</h2>
              <p className="text-gray-600">Test your VC metrics knowledge</p>
            </div>
            <button
              onClick={onClose}
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

          {/* Scenario Description */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{scenario.name}</h3>
            <p className="text-blue-700 mb-4">{scenario.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-blue-900">Fund Size:</span>{' '}
                <span className="text-blue-700">
                  ${(scenario.fundData.fundSize! / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Paid-In:</span>{' '}
                <span className="text-blue-700">
                  ${(scenario.fundData.paidInCapital! / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Distributed:</span>{' '}
                <span className="text-blue-700">
                  ${(scenario.fundData.distributedCapital! / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Unrealized:</span>{' '}
                <span className="text-blue-700">
                  ${(scenario.fundData.unrealizedValue! / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Vintage:</span>{' '}
                <span className="text-blue-700">{scenario.fundData.vintageYear}</span>
              </div>
              <div>
                <span className="font-medium text-blue-900">Companies:</span>{' '}
                <span className="text-blue-700">{scenario.fundData.numberOfCompanies}</span>
              </div>
            </div>
          </div>

          {/* Estimation Form */}
          {!showResults && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Estimate the following metrics:
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TVPI (Total Value to Paid-In)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={userEstimates.tvpi}
                  onChange={(e) =>
                    setUserEstimates({ ...userEstimates, tvpi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2.5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hint: (Distributed + Unrealized) / Paid-In
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DPI (Distributed to Paid-In)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={userEstimates.dpi}
                  onChange={(e) =>
                    setUserEstimates({ ...userEstimates, dpi: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1.2"
                />
                <p className="text-xs text-gray-500 mt-1">Hint: Distributed / Paid-In</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IRR (Internal Rate of Return %)
                </label>
                <input
                  type="number"
                  step="1"
                  value={userEstimates.irr}
                  onChange={(e) =>
                    setUserEstimates({ ...userEstimates, irr: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 25"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Hint: Annualized return percentage
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                Check My Answers
              </button>
            </div>
          )}

          {/* Results */}
          {showResults && results && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Results:</h3>

              <div className="space-y-3">
                <div className={`p-4 rounded-lg ${getAccuracyColor(parseFloat(userEstimates.tvpi || '0'), results.tvpi.value, 0.3)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">TVPI</span>
                    <div className="text-right">
                      <div>Your estimate: {userEstimates.tvpi}x</div>
                      <div>Actual: {results.tvpi.displayValue}</div>
                      <div className="text-sm">
                        Difference: {Math.abs(parseFloat(userEstimates.tvpi || '0') - results.tvpi.value).toFixed(2)}x
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${getAccuracyColor(parseFloat(userEstimates.dpi || '0'), results.dpi.value, 0.2)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">DPI</span>
                    <div className="text-right">
                      <div>Your estimate: {userEstimates.dpi}x</div>
                      <div>Actual: {results.dpi.displayValue}</div>
                      <div className="text-sm">
                        Difference: {Math.abs(parseFloat(userEstimates.dpi || '0') - results.dpi.value).toFixed(2)}x
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${getAccuracyColor(parseFloat(userEstimates.irr || '0'), results.irr.value, 5)}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">IRR</span>
                    <div className="text-right">
                      <div>Your estimate: {userEstimates.irr}%</div>
                      <div>Actual: {results.irr.displayValue}</div>
                      <div className="text-sm">
                        Difference: {Math.abs(parseFloat(userEstimates.irr || '0') - results.irr.value).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleNewScenario}
                  className="flex-1 px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                >
                  Try Another Scenario
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                >
                  Exit Practice Mode
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
