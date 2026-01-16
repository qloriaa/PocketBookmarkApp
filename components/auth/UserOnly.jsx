// React and Expo imports
import { useEffect } from "react"
import { useRouter } from "expo-router"

// Component and Hook imports
import { useUser } from "../../hooks/UseUser"

// Themed imports
import ThemedLoader from "../ThemedLoader"

// ** UserOnly component to restrict access for UNauthenticated users
const UserOnly = ({ children }) => {
  // Get user and auth status, and router
  const { user, authChecked } = useUser()
  const router = useRouter()

  // Run effect on auth change
  useEffect(() => {
    // If auth is checked and no user, redirect to login
    if (authChecked && user === null) {
      router.replace("/login")
    }
  }, [user, authChecked])

  // Auth has not been checked or no user, do not render children (protected content)
  if (!authChecked || !user) {
    return <ThemedLoader />
  }
  // User is authenticated, render children
  return children
}

export default UserOnly
