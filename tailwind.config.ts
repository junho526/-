import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-accent': 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.8) 0%, transparent 70%)'
      },
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['Playfair Display', 'serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'pulse-bright': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'king-in-danger': {
          '0%, 100%': {
            boxShadow: 'inset 0 0 20px 8px hsl(var(--destructive) / 0.7)',
          },
          '50%': {
            boxShadow: 'inset 0 0 35px 15px hsl(var(--destructive) / 0.9)',
          },
        },
        'pawn-poof': {
          '0%': { transform: 'scale(0.5)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'knight-slash': {
            '0%': { transform: 'rotate(-45deg) scale(0.5)', opacity: '0' },
            '50%': { transform: 'rotate(0deg) scale(1.5)', opacity: '1' },
            '100%': { transform: 'rotate(45deg) scale(0.5)', opacity: '0' },
        },
        'bishop-beam': {
            '0%': { transform: 'scaleY(0)', opacity: '0.5' },
            '50%': { transform: 'scaleY(1)', opacity: '1' },
            '100%': { transform: 'scaleY(0)', opacity: '0' },
        },
        'rook-smash': {
            '0%': { transform: 'scale(1.5) rotate(0deg)', opacity: '1', 'border-width': '8px' },
            '100%': { transform: 'scale(0.5) rotate(180deg)', opacity: '0', 'border-width': '0px' },
        },
        'queen-blast': {
            '0%': { transform: 'scale(0.2)', opacity: '1' },
            '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-bright': 'pulse-bright 1.5s infinite ease-in-out',
        'king-in-danger': 'king-in-danger 1.2s infinite ease-in-out',
        'pawn-poof': 'pawn-poof 0.5s ease-out forwards',
        'knight-slash': 'knight-slash 0.6s ease-in-out forwards',
        'bishop-beam': 'bishop-beam 0.7s ease-out forwards',
        'rook-smash': 'rook-smash 0.6s cubic-bezier(0.785, 0.135, 0.150, 0.860) forwards',
        'queen-blast': 'queen-blast 0.8s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
