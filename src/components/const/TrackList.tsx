import React, { useState } from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { MdExplicit } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { IoPlay, IoPause } from 'react-icons/io5'
import { Howl, Howler } from 'howler';

import { millisToMinutesAndSeconds } from '../function/functionReus'
import '../style/hover.css'

interface IContent {
    idx?: number,
    item?: any,
    track?: boolean,
    albumID?: string
}


function TrackList({ idx, item, track, albumID }: IContent) {

    const [soundPlay, setSoundPlay] = useState(false)

    const sound = new Howl({
        src: [item?.preview_url],
        html5: true,
        preload: true,
        volume: 1.0
    })

    return (
        <>
            <div id="main_container" className='hover_track'>
                <Row className='d-flex align-items-center mx-1 mb-2 p-1'>

                    <Col xs='auto' className='text-muted fs-5 
                    fw-bold'>
                        <div id="number"> {idx! + 1} </div>
                        {soundPlay === false ?
                            <Button variant='link' id="player" className='d-none 
                        text-muted fs-5 p-0' onClick={() => {
                                    sound.play();
                                    setSoundPlay(!soundPlay)
                                }}>
                                <IoPlay />
                            </Button> :
                            < Button variant='link' id="player" className='d-none
                        text-muted fs-5 p-0' onClick={() => {
                                    sound.pause();
                                    setSoundPlay(!soundPlay)
                                }}>
                                <IoPause />
                            </Button>
                        }
                    </Col>

                    <Col xs={5} className='d-flex w-50 align-items-center'>
                        <div className="d-flex flex-column mx-3">
                            {track ? <Link className='text-decoration-none fs-5 text-white'
                                to={`/track/${item.id}/artist/${item.artists[0]?.id}/album/${item.album ? `${item.album?.id}/${item.artists[0]?.name}/${item.name}`
                                    : `${albumID}/${item.artists[0]?.name}/${item.name}`}`}>
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
                            <BsHeartFill id="like" className='fs-6 d-flex align-items-center 
                            hover_like d-none' />
                            <div>{millisToMinutesAndSeconds(item.duration_ms)}</div>
                        </Stack>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TrackList