import React, { useState, useEffect, useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { Context } from '../../context'
import { randomBrightBgColor } from '../function/functionReus'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import { Link } from 'react-router-dom'


function IntroCards() {

    const { token } = useContext(Context)

    const [genre, setGenre] = useState([])

    const fetchGenre = async () => {
        const { categories: { items } } = await fetchFromAPI('browse/categories?country=US&limit=50', token);
        setGenre(items)
    }

    useEffect(() => {
        if (token) {
            fetchGenre();
        }
    }, [token])



    return (
        <>
            <Row md='auto' className='mt-3'>
                {genre?.map((item: any, idx: number) => {
                    return (
                        <Col key={idx} className='mb-4'>
                            <Link to={`/genre/${item.id}`} className='text-decoration-none'>
                                <Card style={{
                                    width: '190px', height: '200px', position: 'relative',
                                    borderRadius: '10px',
                                    backgroundColor: `${randomBrightBgColor()}`
                                }}>
                                    <Card.Header className='text-white text-wrap fs-4 
                                fw-bolder border-0 align-items-start  bg-transparent'>
                                        {item.name}
                                    </Card.Header>
                                    <Card.Img variant='bottom' src={item.icons[0].url}
                                        style={{
                                            width: '100px', height: '100px', top: '52%',
                                            left: '38%',
                                            transform: 'translate(18%,-2%)',
                                            position: 'absolute'
                                        }} />
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
            {console.log(genre)}
        </>
    )
}

export default IntroCards