import LandingPage from "@/components/LandingPage";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate({ to: "/dashboard" });
    }
  }, []);
  return <LandingPage />;
}
