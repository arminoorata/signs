import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signs.arminoorata.com"),
  title: {
    default: "SIGNS Toolkit",
    template: "%s — SIGNS Toolkit",
  },
  description:
    "Every reward decision sends a signal. Most leaders only think about the intent. SIGNS helps you see what employees are likely to hear. By Armi Noorata.",
  applicationName: "SIGNS Toolkit",
  authors: [{ name: "Armi Noorata", url: "https://arminoorata.com" }],
  creator: "Armi Noorata",
  keywords: [
    "SIGNS framework",
    "Total Rewards",
    "compensation signaling",
    "pay communication",
    "HR tools",
    "People Operations",
    "Armi Noorata",
  ],
  openGraph: {
    type: "website",
    url: "https://signs.arminoorata.com",
    siteName: "SIGNS Toolkit",
    title: "SIGNS Toolkit",
    description:
      "Every reward decision sends a signal. Most leaders only think about the intent. SIGNS helps you see what employees are likely to hear. By Armi Noorata.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGNS Toolkit",
    description:
      "Every reward decision sends a signal. SIGNS helps you see what employees are likely to hear.",
    creator: "@arminoorata",
  },
};

// Dark default; returning visitors keep their localStorage choice.
const bootstrap = `(function(){try{var s=localStorage.getItem('theme');var t=s||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${outfit.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
