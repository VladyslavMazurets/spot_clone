import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Howl, Howler } from 'howler'
import Swal from 'sweetalert2'


import { millisToMinutesAndSeconds } from '../function/functionReus'
import '../style/hover.css'
import { IoPause, IoPlay } from 'react-icons/io5'
import { BsHeartFill } from 'react-icons/bs'
import { Context } from '../../context'
import { deleteFromAPI, fetchFromAPI, putToAPI } from '../../utils/fetchFromAPI'

interface IContent {
    idx?: number,
    item?: any
}

function PlaylistsContent({ idx, item }: IContent) {

    const { token } = useContext(Context)

    const [soundPlay, setSoundPlay] = useState<boolean>(false)
    const [userSavedTrack, setUserSavedTrack] = useState([])

    const fetchUserSavedTracks = async () => {
        fetchFromAPI(`me/tracks/contains?ids=${item.track.id}`, token)
            .then((data) => setUserSavedTrack(data))
    }

    const delAndSaveUserTrack = () => {
        if (userSavedTrack[0]) {
            deleteFromAPI(`me/tracks?ids=${item.track?.id}`, token)
        } else {
            putToAPI(`me/tracks?ids=${item.track?.id}`, token, {item})
        }
    }

    useEffect(() => {
        fetchUserSavedTracks();
    }, [token, userSavedTrack])

    const sound = new Howl({
        src: item.track ? [item?.track.preview_url] : [item.preview_url],
        html5: true,
        preload: true,
        volume: 1.0
    })

    const PlayPause = () => {
        if (item.preview_url === null || item.track?.preview_url === null) {
            Swal.fire({
                title: 'Sorry!',
                text: 'The song is missing',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else {
            if (sound.playing()) {
                setSoundPlay(false)
                return sound.pause();
            } else {
                setSoundPlay(true)
                return Howler.stop(), sound.play();
            }
        }
    }

    return (
        <>
            <div id="main_container" className='hover_track'
                style={soundPlay ? { backgroundColor: '#521478' } : { backgroundColor: '' }}>
                <Row className='d-flex align-items-center mx-3 mb-3 hover_track'>

                    <Col xs='auto' className='text-muted fs-5 
                    fw-bold'>
                        <div id="number"> {!soundPlay && idx! + 1} </div>
                        <Button variant='link' id="player" className={`
                        ${!soundPlay && `d-none`} text-muted fs-5 mb-2 p-0`}
                            onClick={PlayPause}>
                            {soundPlay === false ? <IoPlay className='hover_buttonPlayer' />
                                : <IoPause className='hover_buttonPlayer' />}
                        </Button>
                    </Col>

                    <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                        <img src={item?.track ? item.track.album.images[0]?.url : item.album.images[0]?.url}
                            alt='Track Img' width='60px'
                            height='60px' className='my-2' />
                        <div className="d-flex flex-column mx-3">
                            <Link className='text-decoration-none fs-5 fw-bolder text-white'
                                to={item.track ? `/track/${item.track.id}/artist/${item.track.artists[0]?.id}/album/${item.track.album?.id}/${item.track.artists[0]?.name}/${item.track.name}`
                                    : `/track/${item.id}/artist/${item.artists[0]?.id}/album/${item.album?.id}/${item.artists[0]?.name}/${item.name}`}>
                                <span className={`${soundPlay && 'text-success'} hover_track_name`}>
                                    {item.track ? item.track.name : item.name}
                                </span>
                            </Link>
                            <span className='text-muted'>
                                {item.track ? item.track.artists.map((item: any, idx: number) => {
                                    return (
                                        <Link key={idx} to={`/artist/${item.id}`}
                                            className='text-decoration-none text-muted me-2'>
                                            <span className='hover_artists_name'>
                                                {item.name}
                                            </span>
                                        </Link>
                                    )
                                }) : item.artists.map((item: any, idx: number) => {
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
                        <Link to={`/albums/${item.track ? item.track.album.id : item.album.id}`}
                            className='text-decoration-none text-muted'>
                            <span className='hover_album'>
                                {item.track ? item.track.album.name : item.album.name}
                            </span>
                        </Link>
                    </Col>

                    <Col xs={2} className='text-muted fs-6'>
                        {item.added_at ? item.added_at.slice(0, 10) : item.album.release_date}
                    </Col>

                    <Col xs='auto' className='text-muted'>
                        <Button variant='link' className='text-muted p-0'
                            onClick={delAndSaveUserTrack} >
                            <BsHeartFill id="like" className='fs-6 me-3
                            hover_like'
                                style={userSavedTrack[0] ? { color: '#1ed760', display: 'block' } :
                                    !soundPlay ? { display: 'none' } : {}}
                            />
                        </Button>
                    </Col>

                    <Col xs='auto' className='text-muted fs-6 d-flex flex-row align-items-center'>
                        {item.track ? millisToMinutesAndSeconds(item.track.duration_ms)
                            : millisToMinutesAndSeconds(item.duration_ms)}
                    </Col>
                </Row>
            </div>
            {console.log()}
        </>
    )
}

export default PlaylistsContent