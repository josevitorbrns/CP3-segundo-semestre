export const buildCityText = (location) => {
    const stateText = location.admin1 ? `, ${location.admin1}` : '';
    return `${location.name}${stateText} - ${location.country}`
}

export const getTemperatureDomain = (temperatures) => {
    let maxTemp = temperatures[0];
    let minTemp = temperatures[0];

    temperatures.forEach(temp => {
        maxTemp = Math.max(maxTemp, temp);
        minTemp = Math.min(minTemp, temp);
    });

    return {
        min: Math.floor(minTemp / 10) * 10,
        max: Math.ceil(maxTemp / 10) * 10
    }
}