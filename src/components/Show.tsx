import React, { useState, useEffect, useContext } from 'react'

import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { Context } from '../context'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import EpisodeCards from './const/EpisodeCards'
import SectionHeader from './const/SectionHeader'
import { randomBgColor } from './function/functionReus'
import './style/episodeText.css'

function Show() {

    const { token } = useContext(Context)
    const { id } = useParams()

    const [shows, setShows] = useState<any>({})
    const [episodes, setEpisodes] = useState([])
    const [showMore, setShowMore] = useState(true)
    const bgColor = randomBgColor()

    const fetchShows = async () => {
        const { images: [{ url },], name, publisher, type, html_description }
            = await fetchFromAPI(`shows/${id}`, token)
        setShows({ url, name, publisher, type, html_description })
    }

    const fetchShowsEpisodes = async () => {
        const { items } = await fetchFromAPI(`shows/${id}/episodes`, token)
        setEpisodes(items)
    }

    useEffect(() => {
        if (token) {
            fetchShows();
            fetchShowsEpisodes();
        }
    }, [token])

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh', padding: 0
            }}>
                <SectionHeader img={shows.url} name={shows.name} owner={shows.type}
                    bgColor={bgColor} allTime={shows.duration_ms} />
                <Container fluid>
                    <Row className='text-white pt-5 px-4'>
                        <Col className='mb-5'>
                            <span className='fs-4 fw-bold'>
                                All Episodes
                            </span>
                            {episodes?.map((item: any, idx: number) => {
                                return (
                                    <EpisodeCards key={idx} description={item.description}
                                        img={item.images[0].url} name={item.name}
                                        release={item.release_date}
                                        time={item.duration_ms} id={item.id} songs={item.audio_preview_url} />
                                )
                            })}
                        </Col>
                        <Col xs={5} className='ps-4'>
                            <span className='fs-4 fw-bold'>
                                About
                            </span>
                            <div className='fs-5 mt-4'>
                                {showMore ?
                                    <span dangerouslySetInnerHTML={{ __html: shows.html_description?.slice(0, 200) }} />
                                    :
                                    <span dangerouslySetInnerHTML={{ __html: shows?.html_description }} />
                                }
                            </div>
                            <Button variant='link' onClick={() => setShowMore(!showMore)}
                                className='text-decoration-none text-white fs-5 fw-bold
                             p-0 mt-2 mb-5'>
                                {showMore ? <span> ... see more </span> :
                                    <span> show less </span>}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default Show