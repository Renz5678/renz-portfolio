import localFont from "next/font/local";

// Vendor the existing Latin font subsets to avoid build-time Google Fonts
// requests and extensionless-URL parsing failures in next/font/google.
export const spaceGrotesk = localFont({
  src: "./font-files/space-grotesk-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const jetbrainsMono = localFont({
  src: [
    { path: "./font-files/jetbrains-mono-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./font-files/jetbrains-mono-latin-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const inter = localFont({
  src: "./font-files/inter-latin.woff2",
  weight: "300 600",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
