import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font imports for performance optimization
import "@fontsource/inter/variable.css";
import "@fontsource/jetbrains-mono/variable.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Kesaru - Full-Stack Developer & DevOps Engineer",
    template: "%s | Kesaru",
  },
  description: "Full-Stack Developer & DevOps Engineer building modern web applications and automated infrastructure solutions. Expertise in Next.js, React, Node.js, and cloud technologies.",
  keywords: [
    "Full-Stack Developer",
    "DevOps Engineer",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "Cloud Infrastructure",
    "CI/CD",
    "Web Development",
    "Automation"
  ],
  authors: [{ name: "Kesaru" }],
  creator: "Kesaru",
  publisher: "Kesaru",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kesaru.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kesaru.me",
    title: "Kesaru - Full-Stack Developer & DevOps Engineer",
    description: "Full-Stack Developer & DevOps Engineer building modern web applications and automated infrastructure solutions.",
    siteName: "Kesaru Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kesaru - Full-Stack Developer & DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kesaru - Full-Stack Developer & DevOps Engineer",
    description: "Full-Stack Developer & DevOps Engineer building modern web applications and automated infrastructure solutions.",
    images: ["/og-image.jpg"],
    creator: "@kesaru",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
