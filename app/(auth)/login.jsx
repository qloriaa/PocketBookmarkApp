// React and Expo imports
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useState } from "react"
import { Link } from "expo-router"

// Components and Hooks imports
import { useUser } from "../../hooks/UseUser"

//Themed Components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedLogo from "../../components/ThemedLogo"
import Spacer from "../../components/Spacer"
import ThemedButton from "../../components/ThemedButton"
import ThemedTextInput from "../../components/ThemedTextInput"
import { Colors } from "../../constants/Colors"

const Login = () => {
  // Hooks to get/set current user information
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // State to handle and display login errors
  const [error, setError] = useState(null)

  // Hook to access login function from useUser (UserContext)
  const { login } = useUser()

  const handleSubmit = async () => {
    // reset error every time user tries to submit
    setError(null);

    try {
      await login(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <TouchableWithoutFeedback
      // Dismiss keyboard when tapping outside input fields
      onPress={Keyboard.dismiss}
    >
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText style={styles.title} title={true}>
          Login Page
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          /*secureTextEntry*/
        />

        <Spacer />
        {error && <Text style={styles.error}> {error} </Text>} 
        
        <ThemedButton onPress={handleSubmit}>
          <ThemedText style={{ color: "#f2f2f2" }}>Login </ThemedText>
        </ThemedButton>

        <Link href="register">
          <ThemedText> New User </ThemedText>
        </Link>

        <Link href="/">
          <ThemedText> Home </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    marginBottom: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    textAlign: "center",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
})
