import { View, ActivityIndicator } from "react-native"
import { styles } from "./styles"

const LoadingComponent = ({height, width}) => {
    return (<View style={{...styles.container, height, width}}>
        <ActivityIndicator size="large" />
    </View>)
}

export default LoadingComponent