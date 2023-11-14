import { View, Text, Button } from 'react-native';
import WeatherChart from '../../components/WeatherChart';
import { useEffect, useState } from 'react';
import { getForecast } from '../../apis/api-weather';
import { DEFAULT_LOCATION, DEFAULT_CITY_NAME } from '../../constants';
import LocationModal from './ChangeModal';
import { buildCityText, getTemperatureDomain } from '../../utils'; // Alterado aqui
import { styles } from './styles';

const WeatherPage = () => {
  const [forecastData, setForecastData] = useState(null);
  const [cityName, setCityName] = useState(DEFAULT_CITY_NAME);
  const [locationCoords, setLocationCoords] = useState(DEFAULT_LOCATION);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [displayActualTemperature, setDisplayActualTemperature] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getForecast(locationCoords)
      .then((res) => {
        console.log('Forecast data:', res.data);  // Log the data
        if (res && res.data) {
          setForecastData(res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
      });
  }, [locationCoords]);

  useEffect(() => {
    console.log('Weather data:', forecastData);  // Log the data
    if (forecastData && forecastData.hourly) {
      const timeData = forecastData.hourly.time;
      const temperatureData = forecastData.hourly.temperature_2m;
      const feelsLikeData = forecastData.hourly.apparent_temperature;

      if (displayActualTemperature) {
        setChartData({
          yDomain: getTemperatureDomain(temperatureData), // Alterado aqui
          values: temperatureData,
          title: 'Temperatura'
        });
      } else {
        setChartData({
          yDomain: getTemperatureDomain(feelsLikeData), // Alterado aqui
          values: feelsLikeData,
          title: 'Sensação Térmica'
        });
      }
    }
  }, [forecastData, displayActualTemperature]);

  const handleLocationSelection = (location) => {
    setLocationCoords({ lat: location.latitude, long: location.longitude });
    setCityName(buildCityText(location)); // Alterado aqui
  }

  const switchTemperatureDisplay = () => {
    setDisplayActualTemperature(prevState => !prevState);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {cityName}
      </Text>
      <Button
        title={displayActualTemperature ? 'Alterar para Sensação Térmica' : 'Alterar para Temperatura'}
        onPress={switchTemperatureDisplay}
      />
      {chartData && forecastData && forecastData.hourly && forecastData.hourly.time && forecastData.hourly.precipitation_probability && (
        <>
          <WeatherChart
            yDomain={chartData.yDomain}
            hours={forecastData.hourly.time}
            values={chartData.values}
            color={{
              to: '#36d',
              from: '#d61',
              line: '#555'
            }}
            title={chartData.title}
          />
          <WeatherChart
            yDomain={{ min: 0, max: 100 }}
            hours={forecastData.hourly.time}
            values={forecastData.hourly.precipitation_probability}
            color={{
              to: '#ddf',
              from: '#14a',
              line: '#555'
            }}
            title={'Chance de preciptação (%)'}
          />
        </>
      )}
      <LocationModal
        visible={modalVisibility}
        onCloseRequest={() => setModalVisibility(false)}
        onLocationSelected={handleLocationSelection}
      />
    </View>
  );
}

export default WeatherPage;
