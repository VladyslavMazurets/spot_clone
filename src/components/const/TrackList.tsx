import React from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import { MdExplicit } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { millisToMinutesAndSeconds } from '../function/functionReus'
import '../style/hover.css'

interface IContent {
    idx?: number,
    item?: any,
    track?: boolean,
    albumID?: string
}

function TrackList({ idx, item, track, albumID }: IContent) {

    return (
        <>
            <div className='hover_track'>
                <Row className='d-flex align-items-center mx-1 mb-2 p-1'>

                    <Col xs='auto' className='text-muted fs-6 fw-bold'>
                        <div> {idx! + 1} </div>
                    </Col>

                    <Col xs={5} className='d-flex w-50 align-items-center'>
                        <div className="d-flex flex-column mx-3">
                            {track ? <Link className='text-decoration-none fs-5 text-white'
                                to={`/track/${item.id}/${item.artists[0]?.id}/${item.album ? `${item.album?.id}` : `${albumID}`}`}>
                                <span className='hover_track_name'>
                                    {(item.name).length > 40
                                        ? `${item.name.substring(0, 76)}...`
                                        : item.name}
                                </span>
                            </Link>
                                : <span className='fs-5'>{(item.name).length > 40
                                    ? `${item.name.substring(0, 76)}...`
                                    : item.name}</span>
                            }
                            <span className='text-muted align-items-center'>
                                <MdExplicit className='fs-5 me-1' />
                                {item.artists.map((item: any, idx: number) => {
                                    return (
                                        <Link key={idx} to={`/artist/${item.id}`}
                                            className='text-decoration-none 
                                        text-muted me-1'>
                                            <span className="hover_artists_name">
                                                {item.name}
                                            </span> |
                                        </Link>
                                    )
                                })}
                            </span>
                        </div>
                    </Col>

                    <Col className='text-muted fs-6 d-flex justify-content-end'>
                        <Stack direction="horizontal" gap={4}>
                            <BsHeartFill className='fs-6 d-flex align-items-center hover_like' />
                            <div>{millisToMinutesAndSeconds(item.duration_ms)}</div>
                        </Stack>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TrackList