// React and Expo imports
import { StyleSheet, useColorScheme, Appearance} from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// Contexts and Hooks imports
import { UserProvider, } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";

// Themed imports
import { Colors } from "../constants/Colors";

const RootLayout = () => {
  // Hook to get device color scheme (light/dark), and select appropriate theme, default to light
  //const colorScheme = useColorScheme();
  const colorScheme = Appearance.getColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  console.log("Current Color Scheme: ", colorScheme);



  return (
    // Wrap the app with UserProvider and BooksProvider for global state management
    <UserProvider >
      
      <BooksProvider>
        <StatusBar value="auto" />
        <Stack

          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        > 
         
          {/* Renders the header for navigation between pages. 
                    Keeps navigation history as a stack. */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
