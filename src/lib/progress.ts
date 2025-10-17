import { UserProgress } from '@/types'

const STORAGE_KEY = 'vc-dashboard-progress'

/**
 * Get user progress from localStorage
 */
export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress()
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading progress:', error)
  }

  return getDefaultProgress()
}

/**
 * Save user progress to localStorage
 */
export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

/**
 * Update progress after a practice attempt
 */
export function updateProgress(correct: boolean): UserProgress {
  const progress = getProgress()
  const today = new Date().toISOString().split('T')[0]

  progress.totalAttempts += 1

  if (correct) {
    progress.correctEstimates += 1
    progress.xp += 10

    // Check if practicing on consecutive days
    const lastDate = new Date(progress.lastPracticeDate)
    const todayDate = new Date(today)
    const daysDiff = Math.floor(
      (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysDiff === 1) {
      // Consecutive day
      progress.streak += 1
    } else if (daysDiff > 1) {
      // Streak broken
      progress.streak = 1
    }
    // If same day (daysDiff === 0), keep streak as is
  } else {
    progress.xp += 2 // Small XP for trying
  }

  progress.lastPracticeDate = today
  progress.level = Math.floor(progress.xp / 100) + 1

  saveProgress(progress)
  return progress
}

/**
 * Reset progress
 */
export function resetProgress(): UserProgress {
  const defaultProgress = getDefaultProgress()
  saveProgress(defaultProgress)
  return defaultProgress
}

/**
 * Get default progress object
 */
function getDefaultProgress(): UserProgress {
  return {
    totalAttempts: 0,
    correctEstimates: 0,
    streak: 0,
    lastPracticeDate: new Date().toISOString().split('T')[0],
    xp: 0,
    level: 1,
    scenariosCompleted: [],
  }
}
