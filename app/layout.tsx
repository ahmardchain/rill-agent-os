import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rill-agent-payments.ahmardchain.chatgpt.site"),
  title: "Rill — Machine Procurement for AI Agents",
  description: "Give an AI agent a job and a budget. Rill plans the smallest policy-safe machine-resource route and returns a deterministic receipt.",
  openGraph: {
    title: "Rill — Machine Procurement for AI Agents",
    description: "Policy-safe machine-resource procurement for autonomous agents on Binance Agent OS.",
    type: "website",
    images: [{ url: "/rill-og.png", width: 1200, height: 630, alt: "Rill procurement route and authorization receipt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rill — Machine Procurement for AI Agents",
    description: "Policy-safe machine-resource procurement for autonomous agents on Binance Agent OS.",
    images: ["/rill-og.png"],
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
