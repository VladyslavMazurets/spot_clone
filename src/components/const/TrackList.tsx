import React, { useContext, useState, useEffect } from 'react'
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { MdExplicit } from 'react-icons/md'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { IoPlay, IoPause } from 'react-icons/io5'
import { Howl, Howler } from 'howler';
import Swal from 'sweetalert2'


import { millisToMinutesAndSeconds } from '../function/functionReus'
import '../style/hover.css'
import { Context } from '../../context'
import { deleteFromAPI, fetchFromAPI, putToAPI } from '../../utils/fetchFromAPI'

interface IContent {
    idx?: number,
    item?: any,
    track?: boolean,
    albumID?: string,
}

function TrackList({ idx, item, track, albumID }: IContent) {

    const { token } = useContext(Context)

    const [soundPlay, setSoundPlay] = useState<boolean>(false)
    const [userSavedTrack, setUserSavedTrack] = useState<any>([])
    const [reload, setReload] = useState(true)

    const fetchUserSavedTracks = async () => {
        fetchFromAPI(`me/tracks/contains?ids=${item.id}`, token)
            .then((data) => setUserSavedTrack(data))
    }

    const delAndSaveUserTrack = () => {
        if (userSavedTrack[0]) {
            Swal.fire({
                customClass: 'button__alert',
                position: 'bottom',
                title: 'Removed from your Liked Songs',
                showConfirmButton: false, backdrop: false,
                timer: 1800,
            })
            deleteFromAPI(`me/tracks?ids=${item?.id}`, token)
            setReload(!reload)
        } else {
            Swal.fire({
                customClass: 'button__alert',
                position: 'bottom',
                title: 'Added to your Liked Songs',
                showConfirmButton: false, backdrop: false,
                timer: 1800,
            })
            putToAPI(`me/tracks?ids=${item?.id}`, token, item)
            setReload(!reload)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUserSavedTracks();
        }, 1500)

        return () => clearTimeout(timer);
    }, [reload])

    const sound = new Howl({
        src: [item?.preview_url],
        html5: true,
        preload: true,
        volume: 0.5,
        onend: function () { setSoundPlay(false) }
    })

    const PlayPause = () => {
        if (item?.preview_url === null) {
            Swal.fire({
                title: 'Sorry!',
                text: 'The song is missing',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else if (sound.playing()) {
            setSoundPlay(false)
            return sound.pause();
        } else {
            setSoundPlay(true)
            return Howler.stop(), sound.play();
        }
    }

    return (
        <>
            <div id="main_container" className='hover_track'
                style={soundPlay ? { backgroundColor: '#521478' } : { backgroundColor: '' }}>
                <Row className='d-flex align-items-center mx-1 mb-2 p-1'>

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

                    <Col xs={5} className='d-flex w-50 align-items-center'>
                        <div className="d-flex flex-column mx-3">
                            {track ?
                                <Link className='text-decoration-none fs-5 fw-bolder text-white'
                                    to={`/track/${item!.id}/artist/${item.artists[0]!.id}/album/${item!.album ? `${item.album!.id}/${item.artists[0]!.name}/${item!.name}`
                                        : `${albumID}/${item.artists[0]!.name}/${item!.name}`}`}>
                                    <span className={`${soundPlay && 'text-success'} hover_track_name`}>
                                        {(item.name)?.length > 40
                                            ? `${item.name?.substring(0, 76)}...`
                                            : item?.name}
                                    </span>
                                </Link>
                                : <span className='fs-5'>{(item.name)?.length > 40
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
                        <Button variant='link' className='text-muted p-0 d-flex 
                        align-items-center me-5'
                            onClick={delAndSaveUserTrack} >
                            <BsHeartFill id="like" className='fs-6 me-3
                            hover_like'
                                style={userSavedTrack[0] ? { color: '#1ed760', display: 'block' } :
                                    !soundPlay ? { display: 'none' } : {}}
                            />
                        </Button>
                        {millisToMinutesAndSeconds(item.duration_ms)}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TrackList