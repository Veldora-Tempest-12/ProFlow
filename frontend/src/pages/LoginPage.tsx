import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

/**
 * LoginPage – split-screen layout.
 * Left side: dark themed branding with logo and testimonial.
 * Right side: white card containing login form.
 * On mobile the left side is hidden and the form is centered.
 */

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem(
      "username",
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const username = usernameInput?.value ?? "";
    const password = passwordInput?.value ?? "";
    const { success, error } = await login({ username, password });
    if (success) {
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error(error ?? "Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main split section */}
      <div className="flex flex-1">
        {/* Left branding panel – hidden on small screens */}
        <div className="hidden md:flex md:w-1/2 bg-gray-900 text-white flex-col items-center justify-center p-8 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23666666%22/></svg>')]">
          <div className="w-12 h-12 bg-primary rounded-full mb-8" />
          <blockquote className="text-2xl font-serif text-center max-w-md">
            “ProFlow transformed our workflow, making us more efficient than
            ever.”
          </blockquote>
        </div>
        {/* Right login panel */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-8">
          <Card className="w-full max-w-md p-6">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-1"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </a>
                  <Button type="submit" disabled={isLoading}>
                    Login
                  </Button>
                </div>
              </form>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Sign up
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
