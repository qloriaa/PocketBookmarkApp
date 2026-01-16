// Home Component for application

// React and Expo imports
import { StyleSheet, View } from "react-native"
import { Link } from "expo-router"

// Themed component to handle light/dark mode styling
import ThemedView from "../components/ThemedView"
import ThemedText from "../components/ThemedText"
import ThemedLogo from "../components/ThemedLogo"
import Spacer from "../components/Spacer"

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      {/*<ThemedLogo />*/}
      <Spacer height={20} />

      <ThemedText style={styles.title} title={true}>
        Hello from Home Component!
      </ThemedText>

      <Spacer />
      <ThemedText>This app holds your library</ThemedText>

      <Spacer height={10} />
      <View style={styles.card}>
        <ThemedText> Additional View Component named CARD </ThemedText>
      </View>

      <Link
        href="/login"
        style={{ marginTop: 20, fontSize: 18, color: "blue" }}
      >
        Go to Login Page
      </Link>

      <Link
        href="/profile"
        style={{ marginTop: 20, fontSize: 18, color: "blue" }}
      >
        Profile Page
      </Link>
    </ThemedView>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // horizontal alignment
    justifyContent: "center", // vertical alignment
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 5,
    boxShadow: "4px 4px rgba(0,0,0,0.1)",
  },
})
