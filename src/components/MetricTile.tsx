'use client'

import { MetricResult } from '@/types'
import { useState } from 'react'

interface MetricTileProps {
  metric: MetricResult
}

export default function MetricTile({ metric }: MetricTileProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const getPerformanceColor = () => {
    switch (metric.performance) {
      case 'excellent':
        return 'border-green-500 bg-green-50'
      case 'good':
        return 'border-yellow-500 bg-yellow-50'
      case 'poor':
        return 'border-red-500 bg-red-50'
      default:
        return 'border-gray-300 bg-white'
    }
  }

  const getPerformanceIcon = () => {
    switch (metric.performance) {
      case 'excellent':
        return '🟢'
      case 'good':
        return '🟡'
      case 'poor':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const getPerformanceBadge = () => {
    switch (metric.performance) {
      case 'excellent':
        return (
          <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
            Excellent
          </span>
        )
      case 'good':
        return (
          <span className="text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
            Good
          </span>
        )
      case 'poor':
        return (
          <span className="text-xs font-medium text-red-700 bg-red-100 px-2 py-1 rounded">
            Needs Work
          </span>
        )
    }
  }

  return (
    <div
      className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${getPerformanceColor()}`}
    >
      {/* Metric Name and Info Icon */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{metric.name}</h3>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Info"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Metric Value */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-bold text-gray-900">
          {metric.displayValue}
        </span>
        <span className="text-xl">{getPerformanceIcon()}</span>
      </div>

      {/* Performance Badge */}
      <div className="flex items-center justify-between">
        {getPerformanceBadge()}
        <span className="text-xs text-gray-500 capitalize">{metric.category}</span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute z-10 w-72 p-4 mt-2 text-sm bg-gray-900 text-white rounded-lg shadow-xl left-0 top-full">
          <div className="space-y-2">
            <p className="font-semibold">{metric.name}</p>
            <p className="text-gray-300 whitespace-pre-line">{metric.tooltip}</p>
          </div>
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 transform rotate-45"></div>
        </div>
      )}
    </div>
  )
}
