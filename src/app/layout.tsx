import type { Metadata } from "next";
import { jetbrainsMono, inter } from "@/lib/fonts";
import { jsonLdPerson, SITE_URL } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lawrenz Matthew Garcia — Full-Stack Developer",
    template: "%s | Lawrenz Matthew Garcia",
  },
  description:
    "Portfolio of Lawrenz Matthew Garcia — 3rd-year CS student at PUP and a Full-Stack Developer, leveraging AI tools to create useful websites and cross-platform apps",
  keywords: [
    "Lawrenz Matthew Garcia",
    "full-stack",
    "React",
    "Next.js",
    "FastAPI",
    "Spring Boot",
    "PUP",
    "Philippines",
  ],
  authors: [{ name: "Lawrenz Matthew Garcia" }],
  creator: "Lawrenz Matthew Garcia",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "scarecrowdevz",
    title: "Lawrenz Matthew Garcia — Backend / AI Engineer",
    description:
      "Portfolio of Lawrenz Matthew Garcia — 3rd-year CS student at PUP and backend AI engineer. Microservices, ML pipelines, cross-platform systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lawrenz Matthew Garcia — Backend / AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawrenz Matthew Garcia — Backend / AI Engineer",
    description:
      "Portfolio of Lawrenz Matthew Garcia — Backend AI Engineer & CS Student at PUP.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="bg-background text-on-surface antialiased font-mono lowercase relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
