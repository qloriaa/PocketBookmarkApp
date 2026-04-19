import { TextInput, useColorScheme, Appearance  } from 'react-native'
import { Colors } from '../constants/Colors';

const ThemedTextInput = ({ style, ...props}) => {

    //const colorScheme = useColorScheme();
    const colorScheme = Appearance.getColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <TextInput 
    style={[
        {
        backgroundColor: theme.uiBackground,
        color: theme.text,
        padding: 20,
        borderRadius: 5,
    }, style
    ]}
    {...props} />

  )
}

export default ThemedTextInput;