import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, getProfile, isLoading } =
    useAuthStore();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!user) {
      // Fetch profile if authenticated but user data missing
      getProfile();
    }
  }, [isAuthenticated, navigate, user, getProfile]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-sm">Loading profile…</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p>Name: {user?.username ?? "Unknown"}</p>
              <p>Email: {user?.email ?? "Unknown"}</p>
              <p>Status: {user?.status ?? "-"}</p>
              <p>Verified: {user?.is_verified ? "Yes" : "No"}</p>
              {user?.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full"
                />
              )}
            </div>
          )}
          <Button onClick={handleLogout}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  );
}
