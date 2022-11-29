import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { Card, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import Loader from '../Loader';
import { Context } from '../../context';
import '../style/trackhover.css'

interface ICards {
    state: any,
    title: string,
    artistsName: boolean,
    image: boolean,
    slice?: number,
    sectionID?: string,
    linkURL?: string,
    artist?: boolean
}

function PlaylistsCards({ state, title, artistsName, image, slice, sectionID,
    linkURL, artist }: ICards) {

    const { token } = useContext(Context);

    return (
        <>
            <Container fluid style={artist ? { padding: 0 } : { padding: "2.5rem 2rem 0 2rem" }}>
                <Stack direction='horizontal' gap={1}>
                    <div className='text-white fs-2 fw-bold'>
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
                <Row className='mx-3 mt-4'>
                    {(Object.values(state).length) !== 0 ?
                        state.slice(0, slice).map((data: any, idx: number) => {
                            return (
                                <Col xs="auto" key={idx} className='mb-4'>
                                    <Link to={`/${linkURL}/${data.id}`}
                                        className="text-decoration-none">
                                        <Card className='hover_carts' style={{
                                            width: '185px', height: '100%',
                                            background: '#2f0a45', boxShadow: `1px 1px 8px 1px black`
                                        }}>
                                            {image ?
                                                <Card.Img variant="top" src={data.images[0].url} alt="Albums Img" style={{ padding: '0.5rem' }} />
                                                : <Card.Img variant="top" src={data.album.images[0].url} alt="Albums Img" style={{ padding: '0.5rem' }} />
                                            }
                                            <Card.Body className='d-flex 
                                            flex-column justify-content-between 
                                            text-white' >
                                                <Card.Title>
                                                    {(data.name).length > 25 ?
                                                        `${data.name.substring(0, 25)}...` :
                                                        data.name}
                                                </Card.Title>
                                                <Card.Text>

                                                    {artistsName ? data.artists.map((item: any, idx: number) => {
                                                        return (
                                                            <Link key={idx} to={`/artist/${item.id}`}
                                                                className="text-decoration-none text-muted me-1">
                                                               <span className='hover_artists_name'> {item.name} </span>
                                                            </Link>
                                                        )
                                                    })
                                                        :
                                                        <span className='text-muted'>
                                                            {data.name}
                                                        </span>
                                                    }
                                                </Card.Text>
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

