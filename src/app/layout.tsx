import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono, inter } from "@/lib/fonts";
import { jsonLdPerson, SITE_URL } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lawrenz Garcia | Full-Stack Developer in the Philippines",
    template: "%s | Lawrenz Garcia",
  },
  description:
    "Lawrenz Garcia builds web and mobile applications with React, React Native, FastAPI, and AWS. Explore his projects, experience, and development work.",
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
  applicationName: "Lawrenz Garcia",
  category: "technology",
  icons: {icon:[{url:"/icon.png",sizes:"64x64",type:"image/png"}],apple:[{url:"/apple-icon.png",sizes:"180x180",type:"image/png"}]},
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "Lawrenz Garcia",
    title: "Lawrenz Garcia | Full-Stack Developer",
    description:
      "Web and mobile applications, APIs, and databases. Projects and experience from Lawrenz Garcia, a full-stack developer based in the Philippines.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lawrenz Garcia | Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawrenz Garcia | Full-Stack Developer",
    description:
      "Lawrenz Garcia — developer and computer science student at PUP.",
    images: ["/opengraph-image"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdPerson,{"@context":"https://schema.org","@type":"WebSite","@id":`${SITE_URL}/#website`,url:SITE_URL,name:"Lawrenz Garcia",description:"Web and mobile development portfolio",inLanguage:"en",publisher:{"@id":`${SITE_URL}/#person`}}]) }}
        />
      </head>
      <body
        className="bg-bg text-fg antialiased font-sans lowercase relative overflow-x-hidden"
        style={{ backgroundColor: "#080a0c", color: "#c8cdd2" }}
      >
        {children}
      </body>
    </html>
  );
}
