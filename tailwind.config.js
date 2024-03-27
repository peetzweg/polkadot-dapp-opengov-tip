/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "draft-pattern":
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABCCAYAAAB5NxUwAAAABGdBTUEAA1teXP8meAAABHFJREFUeAHtnItx00AURTEVuAPUAe4g7gB3kFABpgJMBYYKHCpIqMCigoQKbCrAVGDO9WgzijeZkfWxPr47c7OrHWl3331HKyXYjPb7/RsXO5B34G3+wG07IAcMhTmIHDAUkSXuMBRmIHLAUESWuMNQmIHIAUMRWeIOQ2EGIgcMRWSJOwyFGYgcMBSRJe4wFGYgcsBQRJa4w1CYgcgBQxFZ4g5DYQYiB0ZRz4A6RqNRQjjSBI3RO5SgUBIaUihbGlIoWxp/0A49oi0fStpSD7qMhhJdBsCUeN4jQaB2UyVlYEHyG6VDA6XXUADCjKRcIdUJaqtsmThFPwHknrrXpXdQZCB8wHWBMO6g+zvWJDB6C0gvoAAEJX+OrlGC+lK2LPQHuh3aI6a1BOg9Aa3QfgBSHElrZvZ9YpmHhgLDMdCdh2PUJYAAITwmPrEutYdcvhLcNx4ru64F2RkoAGKKOSuUoLrLIwPKfNX/ssHTrD6uEjokFf16O0aTrKaqtWwZ7SNgpLWO2vfBtDugJTreZssebxhLW/QNUjJrKYyldU7RAq1R2fW9dJ3iF3wuGDFBDzUYfMcYc5Sc01XmEyRK6Aa9lOxT+uRDbRCf04fa5sKAGfpbwUwl4uwgvGYAaxHgK1QlJl07e22OQfcTuLb2U+6i/LnrLhvH2sZZfJsKMd4MGoDj4DLD8kku2tb2Oj0er8vHFeFYdDm22taGSStUFIJwnrbUeW2LaGEg1q+X0zKPFfk1zBdQBYbuUEh00XrNNUkLeax9SsWBFE/R2MN52iEH4cGTqQSkN/RNCTMWT4MMqIEPejkOCS9a9363PKSQwLU7LEsaMOg3cDyZICW6KBThvLWu7eU9wsL120WZoHVNP4M+MVPEqcfJAwoJP6Ve6foTp2zndBYqGDYlA70YIEJ28Em7aVkwBJHg6N5NxKJE/BIpqVpoGcmYJJh1STVxCwwlt4xv4Zo11+uGHLfmHZMLhDmqQnkIaNVqMK25+HxiPFig4EmV+o5xmgeESfRipImUwA2qsuhwrXaW+XNrLvsIP6Y1+iufddMu0QwlRd3l3Gd/JdT2E55R+kBs/rjomEXOSzlJ/2S8LXLyJZ1DPuT5FzRvKO6UcXdIn0RXSQ8/cz8ExT533HRTi/kMDLdNT9T38bObdUkck7PHIijOID0q9Mwcnz3Ank+IZ3psb9A58nSY403DkxmGmqA8JxxNQSGyRbh3hpqgCMPgqV4a16jJnaO2dwq9L9yj77wzPIYgXDfjAFAkjHyDrlGCaiuMXQkKJT9F+jaUapcWHCCHE6adIgGidqVyKhQpswmEQX6xtpKTHbmYhI5ZyhQJjqusVl/hcgxFmrvyV9ZW386PhJwzPWuS5IQlSwJFgISvLtB86lP7UEYkO7Rd24GDA/6fbAxC5IChiCxxh6EwA5EDhiKyxB2GwgxEDhiKyBJ3GAozEDlgKCJL3GEozEDkgKGILHGHoTADkQOGIrLEHYbCDEQOGIrIEncYCjMQOWAoIkvc8R8N40GHE7mQ8AAAAABJRU5ErkJggg==')",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
