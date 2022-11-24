import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { millisToMinutesAndSeconds } from '../function/functionReus'

interface ITrack {
    name: string,
    artists: any,
    duration: number
}

function TrackContent({ name, artists, duration }: ITrack) {
    return (
        <>
            <Row className='d-flex align-items-center mx-1 mb-3'>
                <Col xs='auto' className='text-muted fs-6 fw-bold'>
                    1
                </Col>
                <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                    <div className="d-flex flex-column mx-3">
                        <span className='fs-5 text-white'>{name}</span>
                        <span className='text-muted align-items-center'>
                            {artists.map((item: any, idx: number) => {
                                return (
                                    <Link key={idx} to={`/artist/${item.id}`}
                                        className='text-decoration-none text-muted me-2'>
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </span>
                    </div>
                </Col>

                <Col className='text-muted fs-6 d-flex justify-content-end'>
                    {millisToMinutesAndSeconds(duration)}
                </Col>
            </Row>
        </>
    )
}

export default TrackContent