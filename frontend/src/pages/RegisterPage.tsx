import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useState, type FormEvent } from "react";

/**
 * RegisterPage – centered card layout.
 * Background: very light gray (bg-muted/40).
 * Form fields: username, email, password, confirm password, terms checkbox.
 * Includes a Create Account button and a login link.
 */

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  // Initiate Google OAuth flow
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  // Initiate GitHub OAuth flow
  const handleGitHubLogin = () => {
    window.location.href = "/auth/github";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const username = ((data.get("username") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const password = (data.get("password") as string) ?? "";
    const confirm_password = (data.get("confirmPassword") as string) ?? "";

    if (!username || !email || !password || !confirm_password) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password complexity
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a symbol",
      );
      return;
    }

    const { success, error } = await register({
      username,
      email,
      password,
      confirm_password,
    });

    if (success) {
      toast.success("Account created successfully");
      navigate("/login");
    } else {
      toast.error(error ?? "Registration failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-md p-6">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  required
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="terms" className="mb-0">
                  I agree to the Terms and Conditions
                </Label>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
                Create Account
              </Button>
            </form>
            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="grow border-t border-muted" />
              <span className="px-2 text-sm text-muted-foreground">OR</span>
              <div className="grow border-t border-muted" />
            </div>

            {/* Social Login Buttons */}
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleGitHubLogin}
              >
                <FaGithub className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            <div className="mt-2 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Log in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
