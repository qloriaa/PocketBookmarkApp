import { Image, useColorScheme } from "react-native";

// images
import LightLogo from "../assets/images/bookstack.jpg";
import DarkLogo from "../assets/images/books.png";

const ThemedLogo = ({ ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return <Image source={logoSource} {...props} />;
};

export default ThemedLogo;
