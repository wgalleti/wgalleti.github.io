/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#0A0618',
        surface: '#110A26',
        'surface-deep': '#06030F',
        border: {
          DEFAULT: '#2D1F5E',
          strong: '#3D2C78',
          soft: '#1E1440',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          soft: '#A78BFA',
          mid: '#6B7FE8',
          midSoft: '#8FA2F0',
          hover: '#4A39A0',
        },
        cyan: {
          DEFAULT: '#22D3EE',
        },
        text: {
          DEFAULT: '#EDEAFF',
          soft: '#B6AED6',
        },
        muted: '#8E87B3',
        faint: '#4A3D78',
        success: '#34D399',
        // Aliases legados — páginas de produto referenciam brand-*/accent-*.
        // Mapeamos para os shades da nova identidade (violet/cyan).
        brand: {
          50:  '#EEE7FF',
          100: '#D9C8FF',
          200: '#BCA1FF',
          300: '#A78BFA',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#2E1065',
          950: '#1A0A3E',
        },
        accent: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        card: '18px',
        btn: '11px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(100deg, #8B5CF6, #22D3EE)',
        'cta-card': 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(34,211,238,0.08))',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        cursorBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        orbPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        cursor: 'cursorBlink 1.1s step-end infinite',
        orb: 'orbPulse 9s ease-in-out infinite',
        'orb-delayed': 'orbPulse 9s ease-in-out 4s infinite',
      },
    },
  },
  plugins: [],
}
