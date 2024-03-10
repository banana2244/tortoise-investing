import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-offwhite text-offblack py-4">
          <div className="flex justify-between">
            <div className="flex ml-4 pw-10">
              <Link href="/" className="flex justify-center items-center">
                <span
                  role="img"
                  aria-label="turtle"
                  className="text-4xl flex items-center space-x-4"
                >
                  🐢
                </span>
                <h1 className="text-2xl font-bold cursor-pointer ml-2">
                  tortoise investing
                </h1>
              </Link>
            </div>
            <nav className="flex mr-4">
              <Link href="/" className="text-offblack hover:underline mr-4">
                Home
              </Link>
              <Link
                href="/stock"
                className="text-offblack hover:underline mr-4"
              >
                Try me
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
