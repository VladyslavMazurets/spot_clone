import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface IArtist {
    relatedArtists: any,
    slice?: number
}

function ArtistCards({ relatedArtists, slice }: IArtist) {
    return (
        <>
            <Row className='my-4 px-3'>
                {relatedArtists.slice(0, slice)?.map((item: any, idx: number) => {
                    return (
                        <Col xs="auto" key={idx} className='mb-3'>
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