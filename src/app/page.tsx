'use client'

import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">VC Metrics Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Practice and understand the 20 most common venture capital metrics
        </p>
      </header>
      <Dashboard />
    </main>
  )
}
