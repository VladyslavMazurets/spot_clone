const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1';

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