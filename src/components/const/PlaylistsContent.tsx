import React from 'react'
import { Col, Row } from 'react-bootstrap'

interface IContent {
    idx?: number,
    item?: any
}

function PlaylistsContent({ idx, item }: IContent) {
    return (
        <>
            <Row className='d-flex 
                                align-items-center mx-1 mb-3'>

                <Col xs='auto' className='text-muted fs-6 fw-bold'>
                    {idx! + 1}
                </Col>

                <Col xs={5} className='d-flex w-50 
                                    align-items-center'>
                    <img src={item.track.album.images[0].url}
                        alt='Track Img' width='60px'
                        height='60px' className='my-2' />
                    <div className="d-flex flex-column mx-3">
                        <span className='fs-5'>{item.track.name}</span>
                        <span className='text-muted'>
                            {(item.track.artists).length == 1 ?
                                item.track.artists[0].name :
                                `${item.track.artists[0].name}, 
                                                    ${item.track.artists[1].name}`}
                        </span>
                    </div>
                </Col>

                <Col className='text-muted fs-6'>
                    {item.track.album.name}
                </Col>

                <Col xs={2} className='text-muted fs-6'>
                    {item.added_at.slice(0, 10)}
                </Col>

                <Col xs='auto' className='text-muted fs-6'>
                    0:29
                </Col>
            </Row>
        </>
    )
}

export default PlaylistsContent