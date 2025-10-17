'use client'

import { useState, useMemo } from 'react'
import { FundData, CalculatedMetrics } from '@/types'
import { calculateAllMetrics, getDefaultFundData } from '@/lib/benchmarks'
import { updateProgress } from '@/lib/progress'
import MetricTile from './MetricTile'
import InputPanel from './InputPanel'
import PracticeMode from './PracticeMode'
import ProgressTracker from './ProgressTracker'
import FundSelector from './FundSelector'

export default function Dashboard() {
  const [fundData, setFundData] = useState<FundData>(getDefaultFundData())
  const [showInputPanel, setShowInputPanel] = useState(true)
  const [showPracticeMode, setShowPracticeMode] = useState(false)
  const [progressKey, setProgressKey] = useState(0)

  const handleProgressUpdate = (correct: boolean) => {
    updateProgress(correct)
    setProgressKey(prev => prev + 1) // Force re-render of ProgressTracker
  }

  // Calculate all metrics whenever fund data changes
  const metrics: CalculatedMetrics = useMemo(
    () => calculateAllMetrics(fundData),
    [fundData]
  )

  // Calculate overall fund health
  const fundHealth = useMemo(() => {
    const allMetrics = Object.values(metrics)
    const excellent = allMetrics.filter((m) => m.performance === 'excellent').length
    const good = allMetrics.filter((m) => m.performance === 'good').length
    const poor = allMetrics.filter((m) => m.performance === 'poor').length
    const total = allMetrics.length

    const goodOrBetter = excellent + good
    const percentage = (goodOrBetter / total) * 100

    let healthStatus: 'excellent' | 'good' | 'poor' = 'poor'
    if (percentage >= 70) healthStatus = 'excellent'
    else if (percentage >= 50) healthStatus = 'good'

    return {
      excellent,
      good,
      poor,
      total,
      percentage: percentage.toFixed(0),
      status: healthStatus,
    }
  }, [metrics])

  const handleReset = () => {
    setFundData(getDefaultFundData())
  }

  const getHealthColor = () => {
    switch (fundHealth.status) {
      case 'excellent':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'good':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      case 'poor':
        return 'bg-red-100 border-red-500 text-red-800'
    }
  }

  // Group metrics by category
  const fundMetrics = Object.values(metrics).filter((m) => m.category === 'fund')
  const dealMetrics = Object.values(metrics).filter((m) => m.category === 'deal')
  const portfolioMetrics = Object.values(metrics).filter((m) => m.category === 'portfolio')

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setShowInputPanel(!showInputPanel)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {showInputPanel ? 'Hide' : 'Show'} Input Panel
          </button>
          <FundSelector onSelectFund={setFundData} />
          <button
            onClick={() => setShowPracticeMode(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Practice Mode
          </button>
        </div>

        {/* Overall Fund Health Summary */}
        <div className={`px-6 py-3 rounded-lg border-2 ${getHealthColor()}`}>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm font-semibold">Overall Fund Health</p>
              <p className="text-xs">
                {fundHealth.excellent} excellent, {fundHealth.good} good, {fundHealth.poor} poor
              </p>
            </div>
            <div className="text-3xl font-bold">{fundHealth.percentage}%</div>
          </div>
        </div>
      </div>

      {/* Input Panel */}
      {showInputPanel && (
        <InputPanel
          fundData={fundData}
          onUpdate={setFundData}
          onReset={handleReset}
        />
      )}

      {/* Fund-Level Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fund-Level Metrics (1-10)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {fundMetrics.map((metric) => (
            <MetricTile key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      {/* Deal-Level Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Deal-Level Metrics (11-15)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dealMetrics.map((metric) => (
            <MetricTile key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      {/* Portfolio-Level Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Portfolio-Level Metrics (16-20)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {portfolioMetrics.map((metric) => (
            <MetricTile key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      {/* Export / Download Options */}
      <div className="flex items-center justify-center gap-4 pt-8">
        <button
          onClick={() => {
            const csv = generateCSV(metrics, fundData)
            downloadCSV(csv, 'vc-metrics.csv')
          }}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Download CSV
        </button>
      </div>

      {/* Practice Mode Modal */}
      {showPracticeMode && (
        <PracticeMode
          onClose={() => setShowPracticeMode(false)}
          onUpdateProgress={handleProgressUpdate}
        />
      )}

      {/* Progress Tracker */}
      <ProgressTracker key={progressKey} />
    </div>
  )
}

// Helper function to generate CSV
function generateCSV(metrics: CalculatedMetrics, fundData: FundData): string {
  let csv = 'Metric,Value,Performance,Category\n'

  Object.values(metrics).forEach((metric) => {
    csv += `"${metric.name}","${metric.displayValue}","${metric.performance}","${metric.category}"\n`
  })

  csv += '\nFund Data\n'
  csv += `Fund Size,$${(fundData.fundSize / 1_000_000).toFixed(1)}M\n`
  csv += `Paid-In Capital,$${(fundData.paidInCapital / 1_000_000).toFixed(1)}M\n`
  csv += `Distributed Capital,$${(fundData.distributedCapital / 1_000_000).toFixed(1)}M\n`
  csv += `Unrealized Value,$${(fundData.unrealizedValue / 1_000_000).toFixed(1)}M\n`
  csv += `Vintage Year,${fundData.vintageYear}\n`
  csv += `Number of Companies,${fundData.numberOfCompanies}\n`

  return csv
}

// Helper function to download CSV
function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
