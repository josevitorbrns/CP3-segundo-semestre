import { Modal, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { getSearchLocation } from "../../../apis/api-geocoding";
import CityButton from "./CityButton";
import { styles } from "./styles";

const ChangeModal = ({visible, onCloseRequest, onLocationSelected}) => {
    const [searchText, setSearchText] = useState('');
    const [citiesData, setCitiesData] = useState([]);

    const onSelectCity = (index) => {
        const selectedCity = citiesData[index];
        onLocationSelected(selectedCity);
        onCloseRequest();
    }

    const onChangeText = (text) => {
        setSearchText(text);
        if (text.length > 3) {
            getSearchLocation(text).then((res) => {
                const results = res.data.results
                if (results) {
                    setCitiesData(results)
                }
            })
        } else {
            setCitiesData([]);
        }
    }

    return (
        <Modal
            visible={visible}
            onCloseRequest={onCloseRequest}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>
                        Search City
                    </Text>
                    <TextInput
                        value={searchText}
                        onChangeText={onChangeText}
                    />
                    {
                        citiesData.map((city, index) => {
                            return (
                                <CityButton
                                    city={city.name}
                                    state={city.admin1}
                                    country={city.country}
                                    onPress={() => onSelectCity(index)}
                                />
                            )
                        })
                    }
                </View>
            </View>
        </Modal>
    )
}

export default ChangeModal;