"use client";

import { Switch, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { FaCloudMoon } from "react-icons/fa";
import { CiCloudMoon } from "react-icons/ci";
export default function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Set up initial theme when component mounts
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");

    if (typeof document !== "undefined") {
      const body = document.querySelector("body");
      if (savedTheme === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(newTheme === "dark");

    if (typeof document !== "undefined") {
      const body = document.querySelector("body");
      if (newTheme === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    }
  };

  return (
    <FaCloudMoon className="text-3xl cursor-pointer" onClick={toggleTheme} />
  );
}
