import React, { useContext, useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'

import { Context } from '../../context'
import { fetchFromAPI, fetchFromLyrics } from '../../utils/fetchFromAPI'
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

    const { id, artistID, albumID, artistName, trackName } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();
    const [showMorePopular, setShowMorePopular] = useState(false);
    const [showMoreAlbum, setShowMoreAlbum] = useState(false);

    const [trackDetail, setTrackDetail] = useState<any>({});
    const [artistTopTrack, setArtistTopTrack] = useState([]);
    const [albumTrack, setAlbumTrack] = useState<Album>({});
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistAvatar, setArtistAvatar] = useState({});
    const [lyrics, setLyrics] = useState({});

    const fetchTrackDetail = async () => {
        const { name, duration_ms, album: { release_date, images: [{ url }] },
            artists, album, preview_url } = await fetchFromAPI(`tracks/${id}`, token);

        setTrackDetail({ name, duration_ms, release_date, url, artists, album, preview_url })
    };

    const fetchArtist = async () => {
        const { images: [{ url }] } = await fetchFromAPI(`artists/${artistID}`, token);
        setArtistAvatar(url);
    }

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

    const fetchLyrics = async () => {
        const { message: { body: { lyrics: { lyrics_body } } } } = await fetchFromLyrics(`matcher.lyrics.get?q_track=${trackName}&q_artist=${artistName}`)
        setLyrics(lyrics_body)

    }

    const { name, duration_ms, release_date, url, artists, album }: ITrackDetail
        = trackDetail
    const { items, label, text } = albumTrack;

    useEffect(() => {
        let ignore = false;
        if (token && !ignore) {
            fetchTrackDetail();
            fetchArtistTopTrack();
            fetchAlbum();
            fetchArtistAlbums();
            fetchArtist();
            fetchLyrics();
        }
        return () => { ignore = true }
    }, [token, id, artistID, albumID, artistName, trackName])

    if (!trackDetail.name) return <Loader bgColor={`#1a0229`} />

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

                    <Container fluid>
                        <Row className='mx-1 d-flex align-items-start'>
                            <Col className='d-flex flex-column me-5'>
                                <span className='mt-3 mb-4 fs-4 fw-bold'>Lyrics</span>
                                <span className='fs-5 text-muted'>
                                    {(Object.keys(lyrics)?.length == 0) && lyrics !== '' ?
                                        <Loader height={'15vh'} /> : lyrics == "" ?
                                            <span className='fs-4'>Sorry, No Lyrics found!</span>
                                            : lyrics?.toString().split('\n').map((p: string, idx: number) => {
                                                return <p key={idx} className='my-2'>{p}</p>
                                            })
                                    }
                                </span>
                            </Col>
                            <Col xs='5'>
                                <Link to={`/artist/${artistID}`}
                                    className='d-flex align-items-center rounded 
                                    mt-5 p-2 text-decoration-none text-white 
                                    hover_artist_box '>
                                    <img src={`${artistAvatar}`} alt="Artist Avatar"
                                        className='rounded-circle me-4' width="120px"
                                        height="120px" />
                                    <span className='fw-bolder'>ARTIST
                                        <p className='fw-bold fs-5 hover_artists_name'>
                                            {trackDetail.artists[0].name}
                                        </p>
                                    </span>
                                </Link>
                            </Col>
                        </Row>
                    </Container>

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