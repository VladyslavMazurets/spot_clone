import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { MdPeople, MdVerified } from 'react-icons/md'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import TrackList from './const/TrackList';
import PlaylistsCards from './const/PlaylistsCards';
import './style/hover.css'
import Loader from './Loader';
import ArtistCards from './const/ArtistCards';

interface IArtDet {
    [genres: string]: any,
    image: string,
    name: string,
    followers: number | null
}

function Artist() {

    const { token } = useContext(Context);
    const { id } = useParams();

    const [showAll, setShowAll] = useState(false);
    const [artistDetail, setArtistDetail] = useState<IArtDet>({
        genres: {}, image: '', name: '', followers: 0
    });
    const [artistTopTrack, setArtistTopTrack] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    const fetchArtist = async () => {
        const { followers: { total }, genres, images: [{ url }], name
        } = await fetchFromAPI(`artists/${id}`, token);

        setArtistDetail({
            genres: { genres }, image: url, name: name, followers: total
        });
    }

    const fetchArtistTopTrack = async () => {
        const { tracks } = await fetchFromAPI(`artists/${id}/top-tracks?market=UA`, token);
        setArtistTopTrack(tracks)
    }

    const fetchArtistAlbums = async () => {
        const { items } = await fetchFromAPI(`artists/${id}/albums?limit=10`, token);
        setArtistAlbums(items)
    }

    const fetchRelatedArtists = async () => {
        const { artists } = await fetchFromAPI(`artists/${id}/related-artists?limit=10`, token)
        setRelatedArtists(artists)
    }

    useEffect(() => {
        if (token) {
            fetchArtist();
            fetchArtistTopTrack();
            fetchArtistAlbums();
            fetchRelatedArtists();
        }
    }, [token, id])

    const { name, image, followers, genres: { genres } } = artistDetail;

    if (!artistTopTrack) return <Loader bgColor={`#1a0229`} />

    return (
        <>
            <Stack style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white'
            }}>
                <div style={{
                    backgroundImage: `url(${image})`,
                    height: '40vh', backgroundPosition: '25% 15%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', display: 'flex',
                    alignItems: 'end', boxShadow: `1px 3px 15px 12px #4d355c`
                }}>
                    <div className='d-flex flex-column w-100 h-100 p-5 
                        justify-content-end bg-opacity-50 shadow-sm bg-black'>
                        <span className="fs-5 fw-bolder d-flex align-items-center">
                            <MdVerified style={{ color: '#0c67d3' }}
                                className="fs-4 me-1" />
                            Verified Artist
                        </span>
                        <span style={{
                            fontSize: '6rem', fontWeight: 'bold',
                            lineHeight: '5rem', margin: '0.08em 0 0.35em'
                        }}>
                            {name}
                        </span>
                        <span style={{
                            fontSize: '1.2rem', textTransform: 'capitalize',
                            fontWeight: 'bolder'
                        }}>
                            Total followers: {followers!.toLocaleString('en-US')}
                            {""} <MdPeople /> {""} ·
                            Genres: {genres?.map((item?: string, idx?: number) => {
                                return (
                                    <span key={idx} className="me-2">{item} |</span>
                                )
                            })}
                        </span>
                    </div>
                </div>

                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-2'>
                    <Row className='mx-3 mb-4 fs-2 fw-bold'> Popular </Row>

                    {showAll ? artistTopTrack?.map((item: any, idx: number) => {
                        return (
                            <TrackList key={idx} idx={idx} item={item} track={true} />
                        )
                    }) :
                        artistTopTrack?.slice(0, 5).map((item: any, idx: number) => {
                            return (
                                <TrackList key={idx} idx={idx} item={item} track={true} />
                            )
                        })
                    }

                    <Button variant="link" className='text-muted 
                        text-decoration-none text-uppercase fw-bold mx-3 hover_button'
                        onClick={e => setShowAll(!showAll)}>
                        {showAll ? <p className='hover_button'>show less</p>
                            : <p className='hover_button'>see more</p>}
                    </Button>

                    <Row className='px-4 pt-4'>
                        <PlaylistsCards state={artistAlbums} title='Discography' artistsName={true} image={true} linkURL={'albums'} artist={true} section={true}/>
                    </Row>

                    <Container fluid className='pt-4 px-4'>
                        <Row className='fs-2 fw-bold'> Fans also like </Row>
                        <ArtistCards relatedArtists={relatedArtists} section={true}/>
                    </Container>
                </Container>
            </Stack>
        </>
    )
}

export default Artist