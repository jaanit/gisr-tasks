"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@mantine/core";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Change the background color when theme changes
    if (theme === "light") {
      document.body.style.backgroundColor = "#ffffff";
    } else {
      document.body.style.backgroundColor = "black"; 
    }
  }, [theme]);

  if (!mounted) {
    return <Button  disabled={true}></Button>;
  }

  const dark = theme === "dark";

  return (
    <Button
      className="hover:cursor-pointer"
      variant={dark ? "default" : "secondary"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? (
        <Sun className="hover:cursor-pointer " />
      ) : (
        <Moon className="hover:cursor-pointer " />
      )}
    </Button>
  );
};

export default ToggleMode;