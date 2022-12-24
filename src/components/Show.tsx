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
    }, [token, id])

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh'
            }}>
                <SectionHeader img={shows.url} name={shows.name} owner={shows.type}
                    bgColor={bgColor} />
                <Row className='text-white pt-5'>
                    <Col className='px-4 mb-5'>
                        <span className='fs-4 fw-bold'>
                            All Episodes
                        </span>
                        {episodes?.map((item: any, idx: number) => {
                            return (
                                <EpisodeCards description={item.description}
                                    img={item.images[0].url} name={item.name}
                                    release={item.release_date} 
                                    time={item.duration_ms} id={item.id}/>
                            )
                        })}
                    </Col>
                    <Col xs={5} className=' px-5'>
                        <span className='fs-4 fw-bold'>
                            About
                        </span>
                        <span className='fs-5'>
                            {showMore ?
                                <td dangerouslySetInnerHTML={{ __html: shows.html_description?.slice(0, 200) }} />
                                :
                                <td dangerouslySetInnerHTML={{ __html: shows?.html_description }} />
                            }
                        </span>
                        <Button variant='link' onClick={() => setShowMore(!showMore)}
                            className='text-decoration-none text-white fs-5 fw-bold m-0 mb-5'>
                            {showMore ? <span>... see more </span> :
                                <span> show less </span>}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Show