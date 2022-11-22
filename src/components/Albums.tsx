import React, { useState, useContext, useEffect } from 'react'

import { Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import AlbumDetail from './const/AlbumDetail';
import Loader from './Loader';

function Albums() {

    function randomBgColor() {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 200);
        var z = Math.floor(Math.random() * 155);
        var bgColor = "rgb(" + x + "," + y + "," + z + ")";

        setBgColor(bgColor);
    }

    const { id } = useParams();
    const { token } = useContext(Context);
    const [bgColor, setBgColor] = useState<string>();

    const [albumDetail, setAlbumDetail] = useState<any>({
        name: '', releaseDate: '', type: '', label: '', copyrights: '',
        images: '', artists: {}, tracks: { }
    });

    const fetchalbumDetail = async () => {
        const { name, release_date, type, label,
            copyrights: [{ text }], images: [{ url }], artists,
            tracks: { items } } = await
                fetchFromAPI(`albums/${id}`, token)

        setAlbumDetail({
            name: name, releaseDate: release_date, type: type,
            label: label, copyrights: text, images: url, artists: { artists },
            tracks: {items}
        })
    };

    useEffect(() => {
        randomBgColor();
        if (token) {
            fetchalbumDetail();
        }
    }, [token, id])

    if (!albumDetail.name) return <Loader />

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <AlbumDetail state={albumDetail} bgColor={bgColor!} />
            </Stack>
        </>
    )
}

export default Albums