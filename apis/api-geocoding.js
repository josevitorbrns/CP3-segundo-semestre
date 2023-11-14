import axios from "axios";

const baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

const defaultCount = 3;

const defaultLanguage = 'en';

const buildRequestParams = (searchText) => (
    {
        count: defaultCount,
        language: defaultLanguage,
        format: 'json',
        name: searchText,
    }
);

export const getSearchLocation = (searchText) => {
    return axios.get(baseUrl, {params: buildRequestParams(searchText)});
}