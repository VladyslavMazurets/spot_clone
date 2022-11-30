import React, { useContext, useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import { randomBgColor } from '../function/functionReus'
import Loader from '../Loader'
import PlaylistsCards from './PlaylistsCards'
import SectionHeader from './SectionHeader'
import TrackHeader from './TrackHeader'
import TrackList from './TrackList'

interface ITrackDetail {
    [key: string]: any
    name: string,
    duration_ms: number,
    release_date: string,
    url: string,
    artists: any
}

type Album = {
    [key: string | number]: any
}

function TrackDetail() {

    const { id, artistID, albumID } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();
    const [showMorePopular, setShowMorePopular] = useState(false);
    const [showMoreAlbum, setShowMoreAlbum] = useState(false);

    const [trackDetail, setTrackDetail] = useState<any>({});
    const [artistTopTrack, setArtistTopTrack] = useState([]);
    const [albumTrack, setAlbumTrack] = useState<Album>({});
    const [artistAlbums, setArtistAlbums] = useState([]);

    const fetchTrackDetail = async () => {
        const { name, duration_ms, album: { release_date, images: [{ url }] },
            artists, album } = await fetchFromAPI(`tracks/${id}`, token);

        setTrackDetail({ name, duration_ms, release_date, url, artists, album })
    };

    const fetchArtistTopTrack = async () => {
        const { tracks } = await fetchFromAPI(`artists/${artistID}/top-tracks?market=UA`, token);
        setArtistTopTrack(tracks)
    }

    const fetchAlbum = async () => {

        const { label, copyrights: [{ text }], tracks: { items } } = await fetchFromAPI(`albums/${albumID}`, token);
        setAlbumTrack({ label, text, items })
    }

    const fetchArtistAlbums = async () => {
        const { items } = await fetchFromAPI(`artists/${artistID}/albums?limit=6`, token);
        setArtistAlbums(items)
    }

    const { name, duration_ms, release_date, url, artists, album }: ITrackDetail
        = trackDetail
    const { items, label, text } = albumTrack;

    useEffect(() => {
        if (token) {
            fetchTrackDetail();
            fetchArtistTopTrack();
            fetchAlbum();
            fetchArtistAlbums();
        }
    }, [token, id])

    if (!trackDetail.name) return <Loader />

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white', padding: 0
            }}>
                <SectionHeader img={url} name={name} releaseDate={release_date}
                    bgColor={bgColor} artists={artists} allTime={duration_ms} />

                <Container fluid className='mt-1 border-bottom border-secondary
                 p-4 mb-5'>

                    <TrackHeader />

                    <TrackList idx={0} item={trackDetail} track={false} />

                    <div className='mt-5 mx-4'>
                        LYRICK
                    </div>

                    <div className='mt-5'>
                        <span className='text-muted mx-3'>
                            Popular Tracks by
                            <p className='fs-4 text-white fw-bold mx-3'>
                                {artists[0]!.name}
                            </p>
                        </span>
                        {showMorePopular ? artistTopTrack?.map((item: any, idx: number) => {
                            return (
                                <TrackList key={idx} idx={idx} item={item} track={true} />
                            )
                        })
                            : artistTopTrack!.slice(0, 5).map((item: any, idx: number) => {
                                return (
                                    <TrackList key={idx} idx={idx} item={item} track={true} />
                                )
                            })
                        }
                        <Button variant="link" className='text-muted 
                        text-decoration-none text-uppercase fw-bold mx-3 hover_button'
                            onClick={e => setShowMorePopular(!showMorePopular)}>
                            {showMorePopular ? <p className='hover_button'>show less</p>
                                : <p className='hover_button'>see more</p>}
                        </Button>
                    </div>

                    <div className='mt-4 mx-3'>
                        <PlaylistsCards state={artistAlbums}
                            title={`Popular Releases by ${artists[0]!.name}`}
                            artistsName={true} image={true} linkURL={'albums'}
                            artist={true} />
                    </div>

                    <div className=' mt-5 mx-3'>
                        <div className='d-flex align-items-center mb-1 rounded-top'
                            style={{
                                backgroundColor: '#521478'
                            }}>
                            <img src={album!.images[0].url} width='90px' height='90px' />
                            <span className='mx-4'>
                                From the {album!.album_type}
                                <p className='fs-5 fw-bold'>{album!.name}</p>
                            </span>
                        </div>
                        {showMoreAlbum ? items?.map((item: {}, idx: number) => {
                            return (
                                <TrackList key={idx} idx={idx} item={item} track={true} />
                            )
                        })
                            : items!?.slice(0, 5).map((item: {}, idx: number) => {
                                return (
                                    <TrackList key={idx} idx={idx} item={item} track={true} />
                                )
                            })
                        }

                        <Button variant="link" className='text-muted 
                        text-decoration-none text-uppercase fw-bold'
                            onClick={e => setShowMoreAlbum(!showMoreAlbum)}>
                            {showMoreAlbum ? <p className='hover_button'>show less</p>
                                : <p className='hover_button'>see more</p>}
                        </Button>

                        <div className='d-flex flex-column text-muted mx-4 mb-4 
                        fw-bolder mt-3'>
                            <span> {release_date} </span>
                            <span> Label: {label} </span>
                            <span> {text} </span>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default TrackDetail