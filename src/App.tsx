import { RouterProvider } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";

function App() {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <ToastContainer
        theme={theme === "system" ? systemTheme : theme}
        position="bottom-right"
      />
    </ThemeProvider>
  );
}

export default App;
