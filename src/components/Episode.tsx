import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Container, Stack } from 'react-bootstrap'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
import { Howl } from 'howler'
import Swal from 'sweetalert2'

import { Context } from '../context'
import SectionHeader from './const/SectionHeader'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { randomBgColor } from './function/functionReus'
import './style/episodeText.css'

function Episode() {

    const { token } = useContext(Context)
    const { id } = useParams()

    const [episode, setEpisode] = useState<any>({})
    const [showMore, setShowMore] = useState(true)
    const [play, setPlay] = useState(false)

    const fetchEpisode = async () => {
        const { images: [{ url }], html_description, name, release_date,
            duration_ms, publisher, show, audio_preview_url }
            = await fetchFromAPI(`episodes/${id}`, token)
        setEpisode({
            url, html_description, name, release_date, duration_ms,
            publisher, show, audio_preview_url
        })
    }

    useEffect(() => {
        fetchEpisode();
    }, [id])

    const bgColor = randomBgColor();

    const sound = new Howl({
        src: [episode.audio_preview_url],
        html5: true,
        preload: true,
        volume: 1.0
    })

    const PlayPause = () => {
        if (episode.audio_preview_url === null) {
            Swal.fire({
                title: 'Sorry!',
                text: 'The song is missing',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else {
            if (sound.playing()) {
                setPlay(false)
                return sound.pause();
            } else {
                setPlay(true)
                return Howler.stop(), sound.play();
            }
        }
    }

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white', padding: 0
            }}>
                <SectionHeader img={episode?.url} name={episode?.name} bgColor={bgColor}
                    description={episode.show?.name} allTime={episode?.duration_ms} />

                <Stack gap={5} className='w-75 px-4 mt-4 d-flex align-items-start'>
                    <div className='d-flex flex-column'>
                        <span className='fs-5 fw-bold'> {episode.release_date} </span>
                        <Button className='p-0 me-5 lh-1'
                            style={{ fontSize: '66px', color: '#8E36BC' }}
                            onClick={() => PlayPause()} variant='link'>
                            {play ? <BsPauseCircleFill />
                                : <BsPlayCircleFill />}
                        </Button>
                    </div>
                    <span className='fs-4 fw-bold'>
                        Episode Description
                    </span>
                    <span className='fs-5'>
                        {showMore ?
                            <td dangerouslySetInnerHTML={{ __html: episode.html_description?.slice(0, 240) }} />
                            :
                            <td dangerouslySetInnerHTML={{ __html: episode?.html_description }} />
                        }
                    </span>
                </Stack>

                <Button variant='link' onClick={() => setShowMore(!showMore)}
                    className='text-decoration-none text-white fs-5 fw-bold m-0
                    px-4 mb-5'>
                    {showMore ? <span>... see more </span> :
                        <span className='text-decoration-underline'> show less </span>}
                </Button>

            </Container>
        </>
    )
}

export default Episode