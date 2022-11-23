import React from 'react'

import { Container } from 'react-bootstrap';
import SectionHeader from './SectionHeader';

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
            </Container>
        </>
    )
}

export default TrackDetail