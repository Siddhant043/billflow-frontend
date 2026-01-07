import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chromium, Eye, EyeOff, Zap } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ThemeToggle from "@/components/ThemeToggle";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

function RouteComponent() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleModeSwitch = (newMode: "login" | "register") => {
    setMode(newMode);
    if (newMode === "login") {
      loginForm.reset();
    } else {
      registerForm.reset();
    }
  };

  const handleLoginSubmit = loginForm.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      console.log("Login data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleRegisterSubmit = registerForm.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual authentication logic
      console.log("Register data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleSubmit =
    mode === "login" ? handleLoginSubmit : handleRegisterSubmit;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight">BillFlow</span>
          </Link>
          <h2 className="text-3xl font-extrabold ">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {mode === "login"
              ? "Enter your credentials to access your dashboard"
              : "Join 5,000+ freelancers managing their business effortlessly"}
          </p>
        </div>

        <Button variant="outline" className="w-full">
          <Chromium size={20} />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="bg-background px-4 text-slate-400">
              or use email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "register" && (
            <Controller
              control={registerForm.control}
              name="fullName"
              render={({ field }) => (
                <Field>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="w-full"
                    {...field}
                  />
                  <FieldError
                    errors={
                      registerForm.formState.errors.fullName
                        ? [registerForm.formState.errors.fullName]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          )}
          <Controller
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <Field>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full"
                  {...field}
                />
                <FieldError
                  errors={
                    registerForm.formState.errors.email
                      ? [registerForm.formState.errors.email]
                      : undefined
                  }
                />
              </Field>
            )}
          />

          <Controller
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <Field>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <Button variant="link" asChild>
                      <Link to="/auth">Forgot password?</Link>
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full"
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-full "
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="black" />
                    ) : (
                      <Eye size={20} color="black" />
                    )}
                  </Button>
                </div>
                <FieldError
                  errors={
                    registerForm.formState.errors.password
                      ? [registerForm.formState.errors.password]
                      : undefined
                  }
                />
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading
              ? "Loading..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => handleModeSwitch("register")}
              >
                Create one for free
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" onClick={() => handleModeSwitch("login")}>
                Log in
              </Button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
