/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2ECC71', // Verde Fresco
          hover: '#28B463',
          soft: '#EAF9F1',
        },
        secondary: {
          DEFAULT: '#34495E', // Azul Profundo
          hover: '#2C3E50',
        },
        accent: '#F39C12',   // Laranja Vibrante
        success: '#27AE60',
        warning: '#F1C40F',
        danger: '#E74C3C',
        background: {
          app: '#F4F6F8',     // Fundo principal da aplicação
          component: '#FFFFFF', // Fundo de cards, modais, inputs
        },
        text: {
          primary: '#2C3E50',   // Para títulos e textos importantes
          secondary: '#7F8C8D', // Para parágrafos e textos de apoio
          disabled: '#BDC3C7',  // Para placeholders e estados desativados
        },
        border: '#EAECEE',     // Cor padrão para bordas e divisórias
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
      },
      fontSize: {
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'button': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.5rem',  // 8px
        'lg': '0.75rem', // 12px
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      },
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px 
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)'
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

