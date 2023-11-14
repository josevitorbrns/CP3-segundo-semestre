import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const CityButton = ({city, state, country, onPress}) => {
    const stateText = state ? `, ${state}` : '';
    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.text}>
                    {`${city}${stateText} - ${country}`}
                </Text>
            </Pressable>
        </View>
    )
}

export default CityButton;