import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono, inter } from "@/lib/fonts";
import { jsonLdPerson, SITE_URL } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lawrenz Matthew Garcia",
    template: "%s | scarecrow",
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
    siteName: "scarecrow",
    title: "scarecrow — backend / ai engineer",
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
    title: "scarecrow — backend / ai engineer",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased font-sans lowercase relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
