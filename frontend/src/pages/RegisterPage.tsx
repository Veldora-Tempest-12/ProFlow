import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import React from "react";

/**
 * RegisterPage – centered card layout.
 * Background: very light gray (bg-muted/40).
 * Form fields: username, email, password, confirm password, terms checkbox.
 * Includes a Create Account button and a login link.
 */

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="flex flex-col min-h-screen bg-muted/40 bg-gradient-to-br from-primary/10 via-background to-background">
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
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
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
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
