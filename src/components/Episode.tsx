import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Container, Stack } from 'react-bootstrap'
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


    const fetchEpisode = async () => {
        const { images: [{ url }], html_description, name, release_date,
            duration_ms, publisher, show } = await fetchFromAPI(`episodes/${id}`, token)
        setEpisode({
            url, html_description, name, release_date, duration_ms,
            publisher, show
        })
    }

    useEffect(() => {
        fetchEpisode();
    }, [token])

    const bgColor = randomBgColor();

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white',
            }}>
                <SectionHeader img={episode?.url} name={episode?.name} bgColor={bgColor}
                    description={episode.show?.name} allTime={episode?.duration_ms} />
                <Stack gap={3} className='w-75 px-3 mt-5'>
                    <span className='fs-4 fw-bold'>
                        Episode Description
                    </span>
                    <span className='fs-5'>
                        {showMore ?
                            <td dangerouslySetInnerHTML={{ __html: episode.html_description?.slice(0, 320) }} />
                            :
                            <td dangerouslySetInnerHTML={{ __html: episode?.html_description }} />
                        }
                    </span>
                </Stack>
                <Button variant='link' onClick={() => setShowMore(!showMore)}
                    className='text-decoration-none text-white fs-5 fw-bold m-0
                    px-3 mb-5'>
                    {showMore ? <span>... see more </span> :
                        <span> show less </span>}
                </Button>
            </Container>
            {console.log(episode.name?.length)}
        </>
    )
}

export default Episode