import React from 'react'

import { Card, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import Loader from '../Loader';

interface ICards {
    state: any,
    title: string,
    artistsName: boolean,
    image: boolean,
}

function Cards({ state, title, artistsName, image }: ICards) {
    return (
        <>
            <Container style={{ margin: 0, padding: '2.7rem 3.3rem 1rem', maxWidth: '100%' }}>
                <Col style={{ color: 'white', fontSize: '2rem' }}>
                    {title}
                </Col>
                <Row style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1.5rem' }}>

                    {(Object.values(state).length) !== 0 ?
                        state.map((data: any, idx: any) => {
                            return (
                                <Col key={idx}>
                                    <Card style={{
                                        width: '185px', height: '100%',
                                        background: '#2f0a45'
                                    }}>
                                        {image ?
                                            <Card.Img variant="top" src={data.images[0].url} alt="Albums Img" style={{ padding: '0.6rem' }} />
                                            : <Card.Img variant="top" src={data.album.images[0].url} alt="Albums Img" style={{ padding: '0.6rem' }} />
                                        }
                                        <Card.Body style={{
                                            display: 'flex',
                                            flexDirection: 'column', justifyContent: 'space-between',
                                            color: 'white'
                                        }}>
                                            <Card.Title>
                                                {(data.name).length > 25 ?
                                                    `${data.name.substring(0, 25)}...` :
                                                    data.name}
                                            </Card.Title>
                                            <Card.Text>{artistsName ? data.artists[0].name : data.name}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }) : <Loader />}
                </Row>
            </Container>
        </>
    )
}

export default Cards