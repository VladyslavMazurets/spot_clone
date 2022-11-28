import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { millisToMinutesAndSeconds } from '../function/functionReus'
import '../style/trackhover.css'

interface IContent {
    idx?: number,
    item?: any
}

function PlaylistsContent({ idx, item }: IContent) {
    return (
        <>
            <Row className='d-flex align-items-center mx-1 mb-3 hover_track'>

                <Col xs='auto' className='text-muted fs-6 fw-bold'>
                    {idx! + 1}
                </Col>

                <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                    <img src={item.track.album.images[0].url}
                        alt='Track Img' width='60px'
                        height='60px' className='my-2' />
                    <div className="d-flex flex-column mx-3">
                        <Link className='text-decoration-none'
                            to={`/track/${item.track.id}`}>
                            <span className='fs-5 text-white hover_track_name'>
                                {item.track.name}
                            </span>
                        </Link>
                        <span className='text-muted'>
                            {item.track.artists.map((item: any, idx: number) => {
                                return (
                                    <Link key={idx} to={`/artist/${item.id}`}
                                        className='text-decoration-none text-muted me-2'>
                                        <span className='hover_artists_name'>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })}
                        </span>
                    </div>
                </Col>

                <Col className='text-muted fs-6 hover_track'>
                    <Link to={`/albums/${item.track.album.id}`}
                        className='text-decoration-none text-muted'>
                        <span className='hover_album'>
                            {item.track.album.name}
                        </span>
                    </Link>
                </Col>

                <Col xs={2} className='text-muted fs-6'>
                    {item.added_at.slice(0, 10)}
                </Col>

                <Col xs='auto' className='text-muted fs-6'>
                    {millisToMinutesAndSeconds(item.track.duration_ms)}
                </Col>
            </Row>
        </>
    )
}

export default PlaylistsContent