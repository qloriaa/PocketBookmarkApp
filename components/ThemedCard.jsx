import { StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedCard = ({ Style, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: theme.cardBackground,
        },
        styles.card,
        Style,
      ]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 15,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
    backgroundColor: Colors.secondary,
  },
});
