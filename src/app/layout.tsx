import Navigation from "@/components/Layout/Navigation";
import ThemeRegistry from "@/theme/ThemeRegistry";
import type { Metadata } from "next";
import "./global.css";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "ObelusStream",
  description: "Enjoy watching your favourite movies and tv shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <Navigation />
          {children}
          <Footer />
        </body>
      </ThemeRegistry>
    </html>
  );
}
