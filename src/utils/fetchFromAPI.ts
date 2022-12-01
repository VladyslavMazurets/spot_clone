const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1';
const BASE_URL_LYRICS = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1';

export const fetchFromAPI = async (url: string, token: string | null) => {

    const { data } = await axios.get((`${BASE_URL}/${url}`), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return data;
}

export const fetchFromLyrics = async (url: string) => {
    const { data } = await axios.get((`${BASE_URL_LYRICS}/${url}&apikey=${process.env.REACT_APP_MUSIX_ID}`));

    return data;
}