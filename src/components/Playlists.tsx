import React, { useState, useContext, useEffect } from 'react'

import { Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import PlaylistsDetail from './const/PlaylistsDetail';
import Loader from './Loader';

function Playlists() {

    function randomBgColor () {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 200);
        var z = Math.floor(Math.random() * 155);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    
        setBgColor(bgColor);
    }

    const { id } = useParams();
    const { token } = useContext(Context);
    const [bgColor, setBgColor] = useState<string>();

    const [playlistsDetail, setPlaylistsDetail] = useState<any>({
        name: '', description: '', followers: { total: null }, 
        images: { url: '' }, tracks: { items: [] }, owner: {}
    });

    const fetchPlaylistsDetail = async () => {
        const { name, description, followers: { total }, images: [{ url }],
            tracks: { items }, owner: {display_name} } = await fetchFromAPI(`playlists/${id}`, token);
        
            setPlaylistsDetail({
            name: name, description: description,
            followers: { total: total }, images: { url: url }, 
            tracks: { items }, owner: {display_name}
        });
    }

    useEffect(() => {
        randomBgColor();
        if (token) {
            fetchPlaylistsDetail();
        }
    }, [token, id])

    if(!playlistsDetail.name) return <Loader />

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <PlaylistsDetail state={playlistsDetail} bgColor={bgColor!}/>
            </Stack>
            {console.log(playlistsDetail)}
            {console.log(token)}
        </>
    )
}

export default Playlists