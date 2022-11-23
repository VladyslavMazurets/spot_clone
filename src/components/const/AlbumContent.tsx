import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { MdExplicit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { millisToMinutesAndSeconds } from '../function/functionReus'

interface IContent {
    idx?: number,
    item?: any
}
function AlbumContent({ idx, item }: IContent) {
    return (
        <>
            <Row className='d-flex align-items-center mx-1 mb-3'>

                <Col xs='auto' className='text-muted fs-6 fw-bold'>
                    {idx! + 1}
                </Col>

                <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                    <div className="d-flex flex-column mx-3">
                        <Link className='text-decoration-none'
                            to={`/track/${item.id}`}>
                            <span className='fs-5 text-white'>{item.name}</span>
                        </Link>
                        <span className='text-muted align-items-center'>
                            <MdExplicit style={{ marginRight: '.2rem', fontSize: '1.4rem' }} />
                            {(item.artists).length == 1 ?
                                item.artists[0].name :
                                `${item.artists[0].name}, 
                            ${item.artists[1].name}`}
                        </span>
                    </div>
                </Col>

                <Col className='text-muted fs-6 d-flex justify-content-end'>
                    {millisToMinutesAndSeconds(item.duration_ms)}
                </Col>
            </Row>
        </>
    )
}

export default AlbumContent