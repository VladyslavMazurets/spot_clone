import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { Context } from '../../context';
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import { randomBgColor } from '../function/functionReus';
import Loader from '../Loader';
import PlaylistsContent from './PlaylistsContent';
import SectionHeader from './SectionHeader';
import TrackHeader from './TrackHeader';

function PlaylistsDetail() {

    const { id } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();

    const [playlistsDetail, setPlaylistsDetail] = useState<any>({});

    const fetchPlaylistsDetail = async () => {
        const { name, description, followers: { total }, images: [{ url }],
            tracks: { items }, owner: { display_name } } = await fetchFromAPI(`playlists/${id}`, token);

        setPlaylistsDetail({ name, description, total, url, items, display_name });
    }

    useEffect(() => {
        if (token) {
            fetchPlaylistsDetail();
        }
    }, [token, id])

    if (!playlistsDetail.name) return <Loader bgColor={`#1a0229`}/>
    
    const { name, description, total, url, items, display_name }
    = playlistsDetail;
    
    let allTime = 0;
    let allTracks = Object.keys(items).length;
    
    items.slice(0, 100).forEach((value: any) => {
        allTime += value.track.duration_ms;
    })
    

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white', padding: 0
            }}>

                <SectionHeader img={url} description={description}
                    followers={total} name={name} owner={display_name}
                    bgColor={bgColor} allTime={allTime} allTracks={allTracks} />

                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-5'>

                    <TrackHeader album={'album'} date={'date added'}/>

                    {items.slice(0, 100).map((item: any, idx: number) => {
                        return (
                            <>
                                <PlaylistsContent key={idx} idx={idx} item={item} />
                            </>
                        )
                    })}
                </Container>
            </Container>
            {console.log()}
        </>
    )
}

export default PlaylistsDetail