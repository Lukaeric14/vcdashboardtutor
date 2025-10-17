'use client'

import { useEffect, useState } from 'react'
import { UserProgress } from '@/types'
import { getProgress, resetProgress } from '@/lib/progress'

export default function ProgressTracker() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    setProgress(getProgress())
  }, [])

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      const newProgress = resetProgress()
      setProgress(newProgress)
    }
  }

  if (!progress) return null

  const accuracy = progress.totalAttempts > 0
    ? ((progress.correctEstimates / progress.totalAttempts) * 100).toFixed(0)
    : '0'

  const xpToNextLevel = ((progress.level + 1) * 100) - progress.xp
  const xpProgress = ((progress.xp % 100) / 100) * 100

  return (
    <>
      {/* Compact Progress Badge */}
      <button
        onClick={() => setShowStats(!showStats)}
        className="fixed bottom-4 right-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 z-40"
      >
        <div className="text-left">
          <div className="text-xs font-medium opacity-90">Level {progress.level}</div>
          <div className="text-sm font-bold">{progress.xp} XP</div>
        </div>
        {progress.streak > 0 && (
          <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-bold">{progress.streak}</span>
          </div>
        )}
      </button>

      {/* Detailed Stats Panel */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
              <button
                onClick={() => setShowStats(false)}
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

            {/* Level and XP */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">
                  Level {progress.level}
                </span>
                <span className="text-sm text-gray-600">
                  {progress.xp} / {(progress.level + 1) * 100} XP
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">{xpToNextLevel} XP to next level</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {progress.totalAttempts}
                </div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 flex items-center gap-1">
                  🔥 {progress.streak}
                </div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {progress.correctEstimates}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
              <div className="space-y-2">
                {progress.totalAttempts >= 10 && (
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-medium text-sm">Dedicated Learner</p>
                      <p className="text-xs text-gray-600">Completed 10+ practice attempts</p>
                    </div>
                  </div>
                )}
                {progress.streak >= 3 && (
                  <div className="flex items-center gap-3 p-2 bg-orange-50 rounded">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-medium text-sm">On Fire</p>
                      <p className="text-xs text-gray-600">3+ day streak</p>
                    </div>
                  </div>
                )}
                {progress.level >= 5 && (
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <p className="font-medium text-sm">Expert Level</p>
                      <p className="text-xs text-gray-600">Reached Level 5</p>
                    </div>
                  </div>
                )}
                {progress.totalAttempts === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    Complete practice scenarios to unlock achievements!
                  </p>
                )}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reset Progress
            </button>
          </div>
        </div>
      )}
    </>
  )
}
