const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1';
const BASE_URL_LYRICS = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1';

export const fetchFromAPI = async (url: string, token: string | null) => {

    const { data } = await axios.get((`${BASE_URL}/${url}`), {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return data;
}

export const putToAPI = async (url: string, token: string | null, trackInfo: any) => {

    const { data } = await axios.put((`${BASE_URL}/${url}`), {
        method: "PUT",
        data: {trackInfo},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    return data;
}

export const deleteFromAPI = async (url: string, token: string | null) => {

    const { data } = await axios.delete((`${BASE_URL}/${url}`), {
        method: "DELETE",
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