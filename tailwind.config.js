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
        // Neon Accent Colors
        neon: {
          violet: '#8B5CF6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          purple: '#A855F7',
          pink: '#EC4899',
          green: '#22C55E',
          orange: '#F97316',
          red: '#EF4444',
          amber: '#F59E0B',
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
        'navy-gradient': 'linear-gradient(135deg, #020617 0%, #0f0a1f 25%, #0a0f1f 50%, #030712 75%, #020617 100%)',
        'navy-radial': 'radial-gradient(ellipse at center, #0f0a1f 0%, #020617 70%)',
        // Light Streak Effects
        'streak-violet': 'linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)',
        'streak-blue': 'linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.12) 50%, transparent 100%)',
        'streak-cyan': 'linear-gradient(225deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)',
        // Card Glass Gradient
        'glass-card': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'glass-card-hover': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
        // Neon Gradients
        'neon-violet-blue': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
        'neon-blue-cyan': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
        'neon-violet-pink': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'neon-purple-violet': 'linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%)',
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
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.15)',
        'glow-violet-lg': '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.15)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.15)',
        'glow-subtle': '0 0 15px rgba(139, 92, 246, 0.15)',
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
