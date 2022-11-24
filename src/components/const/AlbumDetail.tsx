import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AlbumContent from './AlbumContent';
import SectionHeader from './SectionHeader'

import { BiTime } from 'react-icons/bi'

interface IAlbum {
    state?: any,
    bgColor?: string
}

function AlbumDetail({ state, bgColor }: IAlbum) {

    const { name, releaseDate, type, label,
        copyrights, images, artists: { artists }, tracks: { items } } = state;

    let allTime = 0;
    let allTracks = Object.keys(items).length;

    items.forEach((value: any) => {
        allTime += value.duration_ms
    })

    return (
        <>
            <Container fluid>
                <SectionHeader img={images} name={name} releaseDate={releaseDate}
                    owner={type} bgColor={bgColor} artists={artists}
                    allTime={allTime} allTracks={allTracks} />
                <Container fluid className='mt-5 border-bottom border-secondary
                 pb-5 mb-5'>
                    <Row className='d-flex text-uppercase fw-bold fs-5
                                align-items-center border-bottom text-muted
                                border-secondary mx-1 pb-2 mb-4'>
                        <Col xs='auto'>#</Col>
                        <Col xs={5} className='w-50'>title</Col>
                        <Col className='d-flex justify-content-end'> <BiTime /> </Col>
                    </Row>

                    {items.map((item: any, idx: number) => {
                        return (
                            <AlbumContent key={idx} idx={idx} item={item} />
                        )
                    })
                    }
                </Container>

                <div className='d-flex flex-column text-muted mx-4 mb-4 fw-bolder'>
                    <span> {releaseDate} </span>
                    <span> Label: {label} </span>
                    <span> {copyrights} </span>
                </div>
                
            </Container>
        </>
    )

}

export default AlbumDetail