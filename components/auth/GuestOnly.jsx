// React and Expo imports
import { useEffect } from "react";
import { useRouter } from "expo-router";

// Component and Hook imports
import { useUser } from "../../hooks/UseUser";

// Themed imports
import ThemedLoader from "../ThemedLoader";

// ** GuestOnly component to restrict access for authentication users to login/register pages
const GuestOnly = ({ children }) => {
  // Get user and auth status, and router
  const { user, authChecked } = useUser();
  const router = useRouter();

  // Run effect on auth change
  useEffect(() => {
    // If auth is checked and user is logged In, redirect to Profile
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  // Auth has not been checked or user is logged In, do not render children (protected content)
  if (!authChecked || user) {
    return <ThemedLoader />;
  }
  // User has not been authenticated, render children
  return children;
};

export default GuestOnly
