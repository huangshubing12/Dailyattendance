import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#F5E6D3",
          foreground: "#8B6F47",
        },
        "primary-foreground": "#8B6F47",
        secondary: {
          DEFAULT: "#E8F4F8",
          foreground: "#5A7A8A",
        },
        "secondary-foreground": "#5A7A8A",
        accent: {
          DEFAULT: "#FFF4E6",
          foreground: "#D4956A",
        },
        "accent-foreground": "#D4956A",
        success: "#E8F5E9",
        "success-foreground": "#66BB6A",
        "success-200": "#E8F5E933",
        "success-20": "#E8F5E933",
        muted: {
          DEFAULT: "#F8F9FA",
          foreground: "#6C757D",
        },
        "muted-foreground": "#6C757D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "bounce-soft": "bounceSoft 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
}

export default config
