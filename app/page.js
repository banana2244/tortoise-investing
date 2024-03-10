"use client";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    // Disable scrolling using CSS
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-offwhite text-offblack p-8">
      <Head>
        <title>Break the Investment Barrier</title>
        <meta
          name="description"
          content="Learn about Dollar Cost Averaging and its benefits."
        />
      </Head>
      <motion.h1
        className="text-6xl font-bold text-center mb-4 mt-[-70px]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Break the Investment Barrier
      </motion.h1>
      <div className="max-w-lg text-lg text-center mb-4">
        <motion.p
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Explore this beginner-friendly simulation to understand the benefits
          over a regular savings account
        </motion.p>
      </div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link href="/stock">
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#1976D2",
              transition: "background-color 0.3s",
            }}
          >
            Start Simulation
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
