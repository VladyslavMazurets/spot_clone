import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface IArtist {
    relatedArtists: any,
    slice?: number,
    section?: boolean
}

function ArtistCards({ relatedArtists, slice, section }: IArtist) {
    return (
        <>
            <Row className='py-4' style={section ? {
                display: 'flax',
                flexWrap: 'wrap', overflow: 'hidden', height: '340px'
            } : {}}>
                {relatedArtists.slice(0, slice)?.map((item: any, idx: number) => {
                    return (
                        <Col xs="auto" key={idx} className='mb-5 me-2'>
                            <Link to={`/artist/${item.id}`}
                                className="text-decoration-none text-white">
                                <Card className='hover_carts' style={{
                                    width: '185px', height: '100%',
                                    background: '#2f0a45', boxShadow: `1px 1px 8px 1px black`
                                }}>
                                    <Card.Img variant="top"
                                        src={item.images[0]?.url}
                                        alt="Artist Img"
                                        className="rounded-circle p-2"
                                        height="185px" />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text className="text-capitalize">
                                            {item.type}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    )
                })
                }
            </Row>
        </>
    )
}

export default ArtistCards