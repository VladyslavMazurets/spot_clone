import React, { useContext, useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { useParams } from 'react-router-dom'

import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import { randomBgColor } from '../function/functionReus'
import Loader from '../Loader'
import SectionHeader from './SectionHeader'
import TrackContent from './TrackContent'

function TrackDetail() {

    const { id } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();

    const [trackDetail, setTrackDetail] = useState<any>({});

    const fetchTrackDetail = async () => {
        const { name, duration_ms, album: { release_date, images: [{ url }] },
            artists }
            = await fetchFromAPI(`tracks/${id}`, token);

        setTrackDetail({
            name, duration_ms,
            release_date, url, artists
        })
    };

    const { name, duration_ms, release_date, url, artists } = trackDetail

    useEffect(() => {
        if (token) {
            fetchTrackDetail();
        }
    }, [token, id])

    if (!trackDetail.name) return <Loader />

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white'
            }}>
                <SectionHeader img={url} name={name} releaseDate={release_date}
                    bgColor={bgColor} artists={artists} allTime={duration_ms} />

                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-5'>
                    <Row className='d-flex text-uppercase fw-bold fs-5
                                align-items-center border-bottom text-muted
                                border-secondary mx-1 pb-2 mb-4'>
                        <Col xs='auto'>#</Col>
                        <Col xs={5} className='w-50'>title</Col>
                        <Col className='d-flex justify-content-end'> <BiTime /> </Col>
                    </Row>
                    <TrackContent name={name} artists={artists} duration={duration_ms} />
                </Container>
            </Container>
        </>
    )
}

export default TrackDetail