// React and Expo imports
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

// Components and Hooks imports
import { useUser } from "../../hooks/UseUser";

//Themed Components
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedLogo from "../../components/ThemedLogo";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { Colors } from "../../constants/Colors";

const Register = () => {
  // Hooks to get/set current user information
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // State to handle and display registration errors
  const [error, setError] = useState(null);

  // Hook to access register function from useUser (UserContext)
  const { register } = useUser();

  const handleSubmit = async () => {
    // reset error every time user tries to submit
    setError(null);

    try {
      await register(name, email, password);
      // Login successful info for debugging
      console.log("New Account Created", { email, password });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback
      // Dismiss keyboard when tapping outside input fields
      onPress={Keyboard.dismiss}
    >
      <ThemedView style={styles.container}>
        <Spacer />

        <ThemedText style={styles.title} title={true}>
          New user Registration Page
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="text"
          onChangeText={setName}
          value={name}
        />

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
          secureTextEntry
        />

        <Spacer />
        {error && (
          <ThemedText // Display error message if registration fails
            style={styles.error}
          >
            {error}
          </ThemedText>
        )}

        <ThemedButton onPress={handleSubmit}>
          <ThemedText style={{ color: "#f2f2f2" }}>Create New User</ThemedText>
        </ThemedButton>

        <Link href="login">
          <ThemedText> Back to Login</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    marginBottom: 20,
    alignSelf: "center",
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
});
