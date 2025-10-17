import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        excellent: '#10b981', // green
        good: '#fbbf24', // yellow
        poor: '#ef4444', // red
      },
    },
  },
  plugins: [],
}
export default config
