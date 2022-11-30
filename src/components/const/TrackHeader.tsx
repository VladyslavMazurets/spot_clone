import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'

interface ITrackHeader {
    album?: string,
    date?: string
}

function TrackHeader({ album, date }: ITrackHeader) {
    return (
        <>
            <Row className='d-flex text-uppercase fw-bold fs-5 
            align-items-center border-bottom text-muted border-secondary mx-3 
            pb-2 mb-4'>
                <Col xs='auto'>#</Col>
                <Col xs={5} className='w-50'>title</Col>
                <Col >{album}</Col>
                <Col xs={2} className="mx-4">{date}</Col>
                <Col xs='auto'> <BiTime /> </Col>
            </Row>
        </>
    )
}

export default TrackHeader