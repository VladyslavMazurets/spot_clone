import React from 'react'
import { Stack, Container, Col, Row } from 'react-bootstrap';

import { MdPeople } from 'react-icons/md';
import { BiTime } from "react-icons/bi";

interface IPlaylists {
    state?: any,
    bgColor?: string
}

function PlaylistsDetail({ state, bgColor }: IPlaylists) {

    const { description, followers: { total }, images: { url }, name,
        tracks: { items } } = state;

    return (
        <>
            <Container fluid>
                <div className="d-flex align-items-end" style={{
                    padding: '5rem 4rem', width: '100%',
                    backgroundColor: `${bgColor}`,
                    boxShadow: `1px 10px 10px 12px ${bgColor}`,
                }}>

                    <img src={url} alt="Playlists Img" width="232px" height="232px" style={{
                        boxShadow: '0 4px 60px rgb(0 0 0 / 80%)'
                    }} />

                    <div className='px-5 d-flex flex-column'>
                        <span style={{
                            fontWeight: 'bold', fontSize: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            {state.owner.display_name}
                        </span>
                        <span style={{
                            fontSize: '4rem', width: '100%', fontWeight: 'bold',
                            textTransform: 'uppercase', margin: '0.08em 0px 0.12em'
                        }}>
                            {name}
                        </span>
                        <span style={{
                            fontSize: '1.2rem', fontWeight: 400, color: '#b3b3b3'
                        }}>
                            {description}
                        </span>
                        <span style={{
                            fontSize: '1rem', fontWeight: 'bold',
                            marginTop: '0.4rem',
                        }}>
                            Spotify · Followers: {total.toLocaleString('en-US')} <MdPeople />
                        </span>
                    </div>
                </div>

                <Container fluid className='mt-5 border-bottom 
                                border-secondary pb-5 mb-5'>

                    <Row className='d-flex text-uppercase fw-bold fs-5
                                align-items-center border-bottom text-muted
                                border-secondary mx-1 pb-2 mb-4'>
                        <Col xs='auto'>#</Col>
                        <Col xs={5} className='w-50'>title</Col>
                        <Col >album</Col>
                        <Col xs={2} className="mx-4">date added</Col>
                        <Col xs='auto'> <BiTime /> </Col>
                    </Row>

                    {items.slice(0, 50).map((item: any, idx: number) => {
                        return (
                            <>
                                <Row key={idx} className='d-flex 
                                align-items-center mx-1 mb-3'>

                                    <Col xs='auto' className='text-muted fs-6 fw-bold'>
                                        {idx + 1}
                                    </Col>

                                    <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                                        <img src={item.track.album.images[0].url}
                                            alt='Track Img' width='60px'
                                            height='60px' className='my-2' />
                                        <div className="d-flex flex-column mx-3">
                                            <span className='fs-5'>{item.track.name}</span>
                                            <span className='text-muted'>
                                                {(item.track.artists).length == 1 ?
                                                    item.track.artists[0].name :
                                                    `${item.track.artists[0].name}, 
                                                    ${item.track.artists[1].name}`}
                                            </span>
                                        </div>
                                    </Col>

                                    <Col className='text-muted fs-6'>
                                        {item.track.album.name}
                                    </Col>

                                    <Col xs={2} className='text-muted fs-6'>
                                        {item.added_at.slice(0, 10)}
                                    </Col>

                                    <Col xs='auto' className='text-muted fs-6'>
                                        0:29
                                    </Col>
                                </Row>
                            </>
                        )
                    })}
                </Container>
            </Container>
        </>
    )
}

export default PlaylistsDetail