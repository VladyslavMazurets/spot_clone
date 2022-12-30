import React, { useState } from 'react'

import { Button, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
import { Howl } from 'howler'
import Swal from 'sweetalert2'

import { ConvertMsToTime } from '../function/functionReus'

interface IEpiCards {
    description: string,
    img: string,
    name: string,
    release?: string,
    time: number,
    id: string,
    songs: string
}
function EpisodeCards({ description, img, name, release, time, id,
    songs }: IEpiCards) {

    const [play, setPlay] = useState(false)

    const sound = new Howl({
        src: [songs],
        html5: true,
        preload: true,
        volume: 0.5
    })

    const PlayPause = () => {
        if (songs === null) {
            Swal.fire({
                title: 'Sorry!',
                text: 'The song is missing',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else if (sound.playing()) {
            return setPlay(false), sound.pause();
        } else {
            return setPlay(true), Howler.stop(), sound.play();
        }
    }

    return (
        <>
            <Link to={`/episode/${id}`}>
                <Stack gap={3} direction='horizontal' className='border-bottom border-secondary
             mt-4 pb-3 p-2 hover_carts'>
                    <img src={img} alt='Episode_Img' width='130px' height='130px'
                        className='m-3' />
                    <div>
                        <span className='fs-5 fw-bold text-white'>{name}</span>
                        <td className='text-muted fs-6 py-2'
                            dangerouslySetInnerHTML={{ __html: `${description.slice(0, 145)}...` }} />
                        <div className='d-flex align-items-center'>
                            <Link to='' className='p-0 m-0 lh-1 fs-1 
                            pe-3' type='button'
                                onClick={() => PlayPause()}
                                style={{
                                    color: 'white', alignItems: 'center',
                                    cursor: 'default'
                                }}>
                                {play ? <BsPauseCircleFill />
                                    : <BsPlayCircleFill />
                                }
                            </Link>
                            <span className='text-muted fs-6 fw-bolder'>
                                {release} · {ConvertMsToTime(time)}
                            </span>
                        </div>
                    </div>
                </Stack>
            </Link>
        </>
    )
}

export default EpisodeCards