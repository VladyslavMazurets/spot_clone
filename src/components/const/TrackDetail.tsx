import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { millisToMinutesAndSeconds } from '../function/functionReus'

import SectionHeader from './SectionHeader'
import TrackContent from './TrackContent'

interface ITrack {
    state?: any,
    bgColor?: string
}

function TrackDetail({ state, bgColor }: ITrack) {

    const { name, releaseDate, image, duration, artists: { artists } } = state;

    return (
        <>
            <Container fluid>
                <SectionHeader img={image} name={name} releaseDate={releaseDate}
                    bgColor={bgColor} artists={artists} allTime={duration} />
                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-5'>
                    <Row className='d-flex text-uppercase fw-bold fs-5
                                align-items-center border-bottom text-muted
                                border-secondary mx-1 pb-2 mb-4'>
                        <Col xs='auto'>#</Col>
                        <Col xs={5} className='w-50'>title</Col>
                        <Col className='d-flex justify-content-end'> <BiTime /> </Col>
                    </Row>
                    <TrackContent name={name} artists={artists} duration={duration} />
                </Container>
            </Container>
        </>
    )
}

export default TrackDetail