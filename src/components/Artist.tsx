import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { MdPeople, MdVerified } from 'react-icons/md'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import TrackList from './const/TrackList';
import PlaylistsCards from './const/PlaylistsCards';
import './style/trackhover.css'

interface IArtDet {
    [genres: string]: any,
    image: string,
    name: string,
    followers: number | null
}

function Artist() {

    const { token } = useContext(Context);
    const { id } = useParams();
    const [artistDetail, setArtistDetail] = useState<IArtDet>({
        genres: {}, image: '', name: '', followers: 0
    });
    const [artistTopTrack, setArtistTopTrack] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState({});
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
        const { items } = await fetchFromAPI(`artists/${id}/albums?limit=6`, token);
        setArtistAlbums(items)
    }

    const fetchRelatedArtists = async () => {
        const { artists } = await fetchFromAPI(`artists/${id}/related-artists`, token)
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
                        justify-content-end bg-opacity-25 shadow-sm bg-black'>
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

                    {artistTopTrack?.map((item: any, idx: number) => {
                        return (
                            <TrackList idx={idx} item={item}/>
                        )
                    })
                    }

                    <Row className='mx-3 pt-4'>
                        <PlaylistsCards state={artistAlbums} title='Discography' artistsName={true} image={true} linkURL={'albums'} artist={true} />
                    </Row>

                    <Container fluid className='pt-4 mx-3'>
                        <Row className='fs-2 fw-bold'> Fans also like </Row>
                        <Row className='my-4 mx-3'>
                            {relatedArtists.slice(0, 6)?.map((item: any, idx: number) => {
                                return (
                                    <Col xs="auto" key={idx} className='mb-3'>
                                        <Link to={`/artist/${item.id}`}
                                            className="text-decoration-none text-white">
                                            <Card className='hover_carts' style={{
                                                width: '185px', height: '100%',
                                                background: '#2f0a45', boxShadow: `1px 1px 8px 1px black`
                                            }}>
                                                <Card.Img variant="top"
                                                    src={item.images[0].url}
                                                    alt="Artist Img"
                                                    className="rounded-circle p-2"
                                                    height="185px" />
                                                <Card.Body>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text className="text-capitalize">
                                                        {item.type}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                            })
                            }
                        </Row>
                    </Container>
                </Container>
            </Stack>
            {console.log()}
        </>
    )
}

export default Artist