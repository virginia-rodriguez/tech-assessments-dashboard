import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSV Dashboard POC",
  description: "POC dashboard with mocked charts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
