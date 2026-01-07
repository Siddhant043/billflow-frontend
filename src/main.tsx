import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// App wrapper to initialize theme
function App() {
  useEffect(() => {
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      // If no saved theme, default to light
      if (!savedTheme) {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <App />
    </>
  );
}
