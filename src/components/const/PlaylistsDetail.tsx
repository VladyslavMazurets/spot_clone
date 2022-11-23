import React from 'react'
import { Stack, Container, Col, Row } from 'react-bootstrap';

import { BiTime } from "react-icons/bi";
import PlaylistsContent from './PlaylistsContent';
import SectionHeader from './SectionHeader';

interface IPlaylists {
    state?: any,
    bgColor?: string
}

function PlaylistsDetail({ state, bgColor }: IPlaylists) {

    const { name, description, followers, images, tracks: { items }, owner }
        = state;

    let allTime = 0;
    let allTracks = Object.keys(items).length;

    items.slice(0, 100).forEach((value: any) => {
        allTime += value.track.duration_ms;
    })

    return (
        <>
            <Container fluid>

                <SectionHeader img={images} description={description}
                    followers={followers} name={name} owner={owner}
                    bgColor={bgColor} allTime={allTime} allTracks={allTracks} />

                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-5'>

                    <Row className='d-flex text-uppercase fw-bold fs-5
                                align-items-center border-bottom text-muted
                                border-secondary mx-1 pb-2 mb-4'>
                        <Col xs='auto'>#</Col>
                        <Col xs={5} className='w-50'>title</Col>
                        <Col >album</Col>
                        <Col xs={2} className="mx-4">date added</Col>
                        <Col xs='auto'> <BiTime /> </Col>
                    </Row>

                    {items.slice(0, 100).map((item: any, idx: number) => {
                        return (
                            <>
                                <PlaylistsContent key={idx} idx={idx} item={item} />
                            </>
                        )
                    })}
                </Container>
            </Container>
        </>
    )
}

export default PlaylistsDetail