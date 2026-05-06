import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initiate Google OAuth flow
  const handleGoogleLogin = () => {
    // Redirect to backend Google auth endpoint
    window.location.href = "/auth/google";
  };

  // Initiate GitHub OAuth flow
  const handleGitHubLogin = () => {
    // Redirect to backend GitHub auth endpoint
    window.location.href = "/auth/github";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem(
      "username",
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password",
    ) as HTMLInputElement;
    const username = usernameInput?.value?.trim() ?? "";
    const password = passwordInput?.value ?? "";

    if (!username || !password) {
      toast.error("Both fields are required");
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

    const { success, error } = await login({ username, password });
    if (success) {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } else {
      toast.error(error ?? "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username or email"
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </a>
              <Button type="submit" disabled={isLoading} className="sm:w-auto">
                {isLoading && <Loader2Icon className="mr-2 animate-spin" />}
                Login
              </Button>
            </div>
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
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
