import React, { useState, useContext, useEffect } from 'react'

import { Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import PlaylistsDetail from './const/PlaylistsDetail';
import { randomBgColor } from './function/functionReus';
import Loader from './Loader';

function Playlists() {

    const { id } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();

    const [playlistsDetail, setPlaylistsDetail] = useState<any>({
        name: '', description: '', followers: null,
        images: '', tracks: {}, owner: ''
    });

    const fetchPlaylistsDetail = async () => {
        const { name, description, followers: { total }, images: [{ url }],
            tracks: { items }, owner: { display_name } } = await fetchFromAPI(`playlists/${id}`, token);

        setPlaylistsDetail({
            name: name, description: description,
            followers: total, images: url,
            tracks: { items }, owner: display_name
        });
    }

    useEffect(() => {
        if (token) {
            fetchPlaylistsDetail();
        }
    }, [token, id])

    if (!playlistsDetail.name) return <Loader />

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <PlaylistsDetail state={playlistsDetail} bgColor={bgColor!} />
            </Stack>
            {console.log(playlistsDetail)}
            {console.log(token)}
        </>
    )
}

export default Playlists