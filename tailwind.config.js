/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Navy Base
        navy: {
          800: '#0f172a',
          900: '#020617',
          950: '#010409',
        },
        // Glass Surface Colors
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          light: 'rgba(255, 255, 255, 0.06)',
          medium: 'rgba(255, 255, 255, 0.08)',
          heavy: 'rgba(255, 255, 255, 0.12)',
          solid: 'rgba(255, 255, 255, 0.15)',
        },
        // Powerstarter Accent Colors
        powerstarter: {
          blue: '#2563eb',
          blueBright: '#38bdf8',
          blueDeep: '#1d4ed8',
          red: '#ef4444',
          redBright: '#ff3b30',
          redDeep: '#991b1b',
        },
        // Legacy accent aliases kept for compatibility with the scaffold utilities
        neon: {
          blue: '#ef4444',
          cyan: '#38bdf8',
          blueDeep: '#1d4ed8',
          orange: '#f97316',
          red: '#ef4444',
          amber: '#f59e0b',
        },
        // Surface Colors
        surface: {
          dark: 'rgba(10, 10, 20, 0.8)',
          medium: 'rgba(20, 20, 35, 0.8)',
          light: 'rgba(30, 30, 50, 0.6)',
        }
      },
      backgroundImage: {
        // Deep Navy Gradient (Primary Background)
        'navy-gradient': 'radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.13), transparent 32%), radial-gradient(circle at 82% 12%, rgba(239, 68, 68, 0.10), transparent 30%), linear-gradient(180deg, #050814 0%, #080b16 52%, #050814 100%)',
        'navy-radial': 'radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.13), transparent 32%), radial-gradient(circle at 82% 12%, rgba(239, 68, 68, 0.10), transparent 30%), linear-gradient(180deg, #050814 0%, #080b16 52%, #050814 100%)',
        'powerstarter-gradient': 'linear-gradient(135deg, #2563eb 0%, #38bdf8 72%, #ef4444 140%)',
        'powerstarter-radial': 'radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.13), transparent 32%), radial-gradient(circle at 82% 12%, rgba(239, 68, 68, 0.10), transparent 30%)',
        // Light Streak Effects
        'streak-blue': 'linear-gradient(135deg, transparent 0%, rgba(37, 99, 235, 0.15) 50%, transparent 100%)',
        'streak-red': 'linear-gradient(45deg, transparent 0%, rgba(239, 68, 68, 0.12) 50%, transparent 100%)',
        'streak-cyan': 'linear-gradient(225deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
        // Card Glass Gradient
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'glass-card-hover': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
        // Neon Gradients
        'neon-blue-red': 'linear-gradient(135deg, #2563eb 0%, #ef4444 100%)',
        'neon-red-bright': 'linear-gradient(135deg, #ef4444 0%, #38bdf8 100%)',
        'neon-blue-deepRed': 'linear-gradient(135deg, #2563eb 0%, #991b1b 100%)',
        'neon-blue-deep': 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
        // Sidebar gradient
        'sidebar': 'linear-gradient(180deg, rgba(20, 20, 35, 0.95) 0%, rgba(10, 10, 20, 0.95) 100%)',
        // Topbar gradient
        'topbar': 'linear-gradient(90deg, rgba(15, 15, 25, 0.9) 0%, rgba(20, 20, 35, 0.85) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.25)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'glass-xl': '0 24px 64px rgba(0, 0, 0, 0.5)',
        'glow-blue-red': '0 0 18px rgba(56, 189, 248, 0.18), 0 0 34px rgba(239, 68, 68, 0.10)',
        'glow-blue-red-lg': '0 0 26px rgba(56, 189, 248, 0.24), 0 0 54px rgba(239, 68, 68, 0.14)',
        'glow-blue': '0 0 18px rgba(56, 189, 248, 0.18), 0 0 34px rgba(56, 189, 248, 0.10)',
        'glow-cyan': '0 0 18px rgba(29, 78, 216, 0.18), 0 0 34px rgba(29, 78, 216, 0.10)',
        'glow-blue-soft': '0 0 18px rgba(37, 99, 235, 0.18), 0 0 34px rgba(37, 99, 235, 0.10)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.28), 0 0 40px rgba(239, 68, 68, 0.14)',
        'glow-powerstarter': '0 0 18px rgba(56, 189, 248, 0.18), 0 0 34px rgba(239, 68, 68, 0.10)',
        'glow-powerstarter-lg': '0 0 26px rgba(56, 189, 248, 0.24), 0 0 54px rgba(239, 68, 68, 0.14)',
        'glow-subtle': '0 0 12px rgba(56, 189, 248, 0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'inner-glow-strong': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'fab': '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        'xs': '4px',
        'glass': '20px',
        'glass-lg': '30px',
        'glass-xl': '40px',
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '88': '22rem',
        '128': '32rem',
        'sidebar-collapsed': '68px',
        'sidebar-expanded': '260px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-fast': 'glow-pulse 1.5s ease-in-out infinite',
        'streak-move': 'streak-move 8s linear infinite',
        'streak-move-slow': 'streak-move 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 1.2s steps(3) infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'streak-move': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'typing': {
          '0%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
    },
  },
  plugins: [],
}
