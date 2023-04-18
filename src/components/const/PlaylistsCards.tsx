import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { Card, Col, Container, Row, Stack } from 'react-bootstrap';

import Loader from '../Loader';
import { Context } from '../../context';
import '../style/hover.css'

interface ICards {
    state: any,
    title: string,
    artistsName: boolean,
    image: boolean,
    slice?: number,
    sectionID?: string,
    linkURL?: string,
    navURL?: string,
    artist?: boolean,
    categoriesName?: string,
    section?: boolean
}

function PlaylistsCards({ state, title, artistsName, image, slice, sectionID,
    linkURL, artist, categoriesName, navURL, section }: ICards) {

    const { token } = useContext(Context);

    return (
        <>
        <div className='mb-4'>
            <Stack direction='horizontal'>
                <div className='text-white fs-2 fw-bold text-capitalize'>
                    {title}
                </div>
                <div className='ms-auto mt-2'>
                    {sectionID && token ?
                        <Link to={`/section/${sectionID}/${categoriesName}/${navURL}`} style={{
                            textDecoration: 'none',
                            textTransform: 'uppercase', color: '#c8c7c9',
                            fontSize: '1.05rem'
                        }}>
                            Show all
                        </Link>
                        : ''
                    }
                </div>
            </Stack>
            <Row className='px-1 mt-4' style={section ? {
                display: 'flax',
                flexWrap: 'wrap', overflow: 'hidden', height: '315px'
            } : {}}>
                {state.length !== 0 ?
                    state?.slice(0, slice).map((data: any, idx: number) => {
                        return (
                            <Col xs="auto" key={idx} className='mb-5'>
                                <Link to={`/${linkURL}/${data?.id}${data?.album ? `/artist/${data?.artists[0]?.id}/album/${data?.album.id}/${data?.artists[0]?.name}/${data?.name}` : ''}`}
                                    className="text-decoration-none">
                                    <Card className='hover_carts' style={{
                                        width: '185px', height: '100%', marginLeft: '0.5rem',
                                        background: '#2f0a45', boxShadow: `1px 1px 8px 1px black`
                                    }}>
                                        {image ?
                                            <Card.Img variant="top" src={data?.images[0]?.url} alt="Albums Img" style={{ padding: '0.5rem', height: '183px' }} />
                                            : <Card.Img variant="top" src={data?.album.images[0]?.url} alt="Albums Img" style={{ padding: '0.5rem', height: '183px' }} />
                                        }
                                        <Card.Body className='d-flex 
                                            flex-column justify-content-between 
                                            text-white' >
                                            <Card.Title>
                                                {(data?.name)?.length > 25 ?
                                                    `${data?.name.substring(0, 25)}...` :
                                                    data?.name}
                                            </Card.Title>
                                            <Card.Text>

                                                {artistsName ? data?.artists.map((item: any, idx: number) => {
                                                    return (
                                                        <Link key={idx} to={`/artist/${item?.id}`}
                                                            className="text-decoration-none text-muted me-1">
                                                            <span className='hover_artists_name'> {item?.name} </span>
                                                        </Link>
                                                    )
                                                })
                                                    :
                                                    <span className='text-muted'>
                                                        {data?.name.length > 25 ?
                                                            `${data?.name.substring(0, 25)}...` :
                                                            data?.name}
                                                    </span>
                                                }
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    }) : <Loader height='450px' />}
            </Row>
            </div>
            </>
    )
}

export default PlaylistsCards

