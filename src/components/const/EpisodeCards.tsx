import React, { useState } from 'react'

import { Button, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ConvertMsToTime } from '../function/functionReus'

import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'

interface IEpiCards {
    description: string,
    img: string,
    name: string,
    release?: string,
    time: number,
    id: string
}

function EpisodeCards({ description, img, name, release, time, id }: IEpiCards) {

    const [play, setPlay] = useState(true)

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
                        <span className='text-muted fs-6 fw-bolder d-flex align-items-center'>
                            <Button variant='link' className='p-0 m-0 lh-1 fs-1 
                            me-3 pe-none'
                                onClick={() => setPlay(!play)}
                                style={{ color: 'white', alignItems: 'center' }}>
                                {play ? <BsPlayCircleFill />
                                    : <BsPauseCircleFill />}
                            </Button>
                            {release} · {ConvertMsToTime(time)}
                        </span>
                    </div>
                </Stack>
            </Link>
        </>
    )
}

export default EpisodeCards