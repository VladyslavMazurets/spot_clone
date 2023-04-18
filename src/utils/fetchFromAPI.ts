const axios = require('axios').default;
const Swal = require("sweetalert2");

const BASE_URL = 'https://api.spotify.com/v1';
const BASE_URL_LYRICS = 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1';

export const fetchFromAPI = async (url: string, token: string | null) => {

    const {data}  = await axios({
        method: "get",
        url: `${BASE_URL}/${url}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).catch(function (error: any) {
        if (error.response.status === 401) {
            Swal.fire({
                title: 'Bad or expired token!',
                text: 'Please authenticate the user again.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
        console.log('Error:', error.message)
    });
    return data;
}

export const putToAPI = async (url: string, token: string | null, trackInfo: any) => {
    await axios({
        method: 'put',
        url: `${BASE_URL}/${url}`,
        data: { trackInfo },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteFromAPI = async (url: string, token: string | null) => {

    const { data } = await axios({
        method: "delete",
        url: `${BASE_URL}/${url}`,
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