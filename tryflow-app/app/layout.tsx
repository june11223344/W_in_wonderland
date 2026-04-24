import type { Metadata } from "next";
import "./globals.css";
import { NavigationProgress } from "@/components/layout/NavigationProgress";

export const metadata: Metadata = {
  title: "Rabbit Hole — Where Ideas Fall Into Something Real",
  description:
    "Test your product before you build it. Measure real user reactions with a landing page before you launch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
