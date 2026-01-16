// React and Expo imports
import { StyleSheet } from "react-native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

// Components and Hooks imports
import GuestOnly from "../../components/auth/GuestOnly"

export default function AuthLayout() {

  return (
    <GuestOnly>
      <StatusBar value="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}></Stack>
    </GuestOnly>
  )
}

const styles = StyleSheet.create({})
