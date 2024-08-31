import { Inter } from "next/font/google";
import "./globals.css";

// Import Components
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chatting App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toolbar />
          <div className="min-h-[80vh]">
            <div className="container mx-auto">{children}</div>
          </div>
        <Footer />
      </body>
    </html>
  );
};
