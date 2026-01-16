// React and Expo imports
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Components and Hooks imports
import UserOnly from "../../components/auth/UserOnly";

// Themed imports
import { Colors } from "../../constants/Colors";

const DashboardLayout = () => {
  // Hook to get device color scheme (light/dark), and select appropriate theme, default to light
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserOnly>
      {/* Protects all dashboard routes from unauthorized access */}
      {/* Tab navigator for dashboard sections */}
      <Tabs
        screenOptions={{
          headerShown: false,
          position: "fixed",
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },

          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books"
          options={{
            title: "Books",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "create" : "create-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />

        {/* Omit this path from dashboard = wont display an icon on nav dashboard */}
        <Tabs.Screen name="books/[id]" options={{ href: null }} />
        <Tabs.Screen name="edit/[id]" options={{ href: null }} />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;
