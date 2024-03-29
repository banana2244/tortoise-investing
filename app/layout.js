import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import DarkMode from "./darkmode";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "🐢 Tortoise Investing",
  description: "Intro to dollar cost investing (not financial advice)",
};

const turtleMotionVariants = {
  initial: { y: 0 },
  up: { y: -10, transition: { yoyo: Infinity, duration: 2 } },
  down: { y: 10, transition: { yoyo: Infinity, duration: 2 } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " bg-[#f6f0e8] dark:bg-[#1E1E1E] dark:text-[#FFFFFF] "
        }
      >
        <header className="text-offblack pt-4 pb-2 dark:bg-stone-800">
          <div className="flex justify-between items-center  pb-2">
            <div className="flex ml-4 pl-10 ">
              <Link href="/" className="flex justify-center items-center">
                <span
                  role="img"
                  aria-label="turtle"
                  className="turt text-4xl flex items-center space-x-4 turtle-animation"
                >
                  🐢
                </span>
                <h1 className="text-2xl font-bold cursor-pointer ml-2">
                  Tortoise Investing
                </h1>
              </Link>
            </div>
            <div className="flex mr-4 pr-20 gap-8 justify-center items-center">
              <DarkMode />
              <Link
                href="/stock"
                className="text-2xl flex items-center text-offblack hover:underline mr-4 font-sans"
              >
                Simulate
              </Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
