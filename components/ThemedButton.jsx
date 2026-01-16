import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

function ThemedButton({ style, ...props }) {
  return (
    // Button with themed styles and press effect
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.btnPressed, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
    width: "auto",
  },
  btnPressed: {
    opacity: 0.75,
  },
});

export default ThemedButton;
