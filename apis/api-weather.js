import axios from "axios";

const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const hourly = ['temperature_2m', 'precipitation_probability', 'apparent_temperature'];

const timezone = 'America%2FSao_Paulo';

const days = '3'

const buildUrl = (location, values, timezone, forecastDays) => {
    return `${baseUrl}?latitude=${location.lat}&longitude=${location.long}` +
        `&hourly=${values.toString()}&timezone=${timezone}&forecast_days=${forecastDays}`
}

export const getForecast = (location) => {
    return axios.get(buildUrl(location, hourly, timezone, days));

}