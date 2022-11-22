import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { Card, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import Loader from '../Loader';
import { Context } from '../../context';

interface ICards {
    state: any,
    title: string,
    artistsName: boolean,
    image: boolean,
    slice?: number,
    sectionID?: string,
    linkURL?: string
}

function PlaylistsCards({ state, title, artistsName, image, slice, sectionID, linkURL }: ICards) {

    const { token } = useContext(Context);

    return (
        <>
            <Container fluid className='pt-4 px-5'>
                <Stack direction='horizontal' gap={1}>
                    <div style={{ color: 'white', fontSize: '2rem' }}>
                        {title}
                    </div>
                    <div className='ms-auto mt-2'>
                        {sectionID && token ?
                            <Link to={`/section/${sectionID}`} style={{
                                textDecoration: 'none',
                                textTransform: 'uppercase', color: '#c8c7c9',
                                fontSize: '1.05rem'
                            }}>
                                See all
                            </Link>
                            : ''
                        }
                    </div>
                </Stack>
                <Row className='mx-3 mt-4' >
                    {(Object.values(state).length) !== 0 ?
                        state.slice(0, slice).map((data: any, idx: number) => {
                            return (
                                <Col xs='auto' key={idx} className='mb-3'>
                                    <Link to={`/${linkURL}/${data.id}`} style={{ textDecoration: 'none' }}>
                                        <Card style={{
                                            width: '185px', height: '100%',
                                            background: '#2f0a45'
                                        }}>
                                            {image ?
                                                <Card.Img variant="top" src={data.images[0].url} alt="Albums Img" style={{ padding: '0.5rem' }} />
                                                : <Card.Img variant="top" src={data.album.images[0].url} alt="Albums Img" style={{ padding: '0.5rem' }} />
                                            }
                                            <Card.Body style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                color: 'white'
                                            }}>
                                                <Card.Title>
                                                    {(data.name).length > 25 ?
                                                        `${data.name.substring(0, 25)}...` :
                                                        data.name}
                                                </Card.Title>
                                                <Card.Text>{artistsName ? data.artists[0].name : data.name}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        }) : <Loader />}
                </Row>
            </Container>
        </>
    )
}

export default PlaylistsCards