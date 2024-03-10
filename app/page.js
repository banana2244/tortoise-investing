"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const headingScale = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const paragraphOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-offwhite text-offblack">
      <motion.h1
        className="text-8xl font-bold text-center"
        style={{
          scale: headingScale,
        }}
      >
        What is Dollar Cost Averaging?
      </motion.h1>
      <motion.p
        className="absolute inset-0 flex items-center justify-center text-lg text-center"
        style={{
          opacity: paragraphOpacity,
        }}
      >
        Dollar Cost Averaging is an investment strategy where you regularly
        invest a fixed amount of money regardless of the asset's price. This
        approach helps mitigate the impact of market volatility and potentially
        lowers the average cost per share over time.
      </motion.p>
    </div>
  );
}
