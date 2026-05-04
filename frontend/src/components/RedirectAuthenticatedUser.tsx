import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

const RedirectAuthenticatedUser = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default RedirectAuthenticatedUser;
