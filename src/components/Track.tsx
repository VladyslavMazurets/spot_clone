import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';

import { Stack } from 'react-bootstrap'
import TrackDetail from './const/TrackDetail'
import { randomBgColor } from './function/functionReus';
import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Loader from './Loader';

function Track() {

    const { id } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();

    const [trackDetail, setTrackDetail] = useState<any>({
        name: '', duration: '', releaseDate: '', image: '', artists: {}
    });

    const fetchtrackDetail = async () => {
        const { name, duration_ms, album: { release_date, images: [{ url }] },
            artists }
            = await fetchFromAPI(`tracks/${id}`, token);

        setTrackDetail({
            name: name, duration: duration_ms,
            releaseDate: release_date, image: url, artists: { artists }
        })
    };

    useEffect(() => {
        if (token) {
            fetchtrackDetail();
        }
    }, [token, id])

    if (!trackDetail.name) return <Loader />

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <TrackDetail state={trackDetail} bgColor={bgColor!} />
            </Stack>
            {console.log(trackDetail)}
        </>
    )
}

export default Track