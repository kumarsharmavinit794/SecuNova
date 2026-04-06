import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5 text-foreground" />}
    </motion.button>
  );
};

export default ThemeToggle;
