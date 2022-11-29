import React, { useState, useEffect, useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { useParams } from 'react-router-dom';

import TrackList from './TrackList';
import SectionHeader from './SectionHeader'
import { Context } from '../../context';
import { randomBgColor } from '../function/functionReus';
import { fetchFromAPI } from '../../utils/fetchFromAPI';
import Loader from '../Loader';

function AlbumDetail() {

    const { id } = useParams();
    const { token } = useContext(Context);

    const bgColor = randomBgColor();

    const [albumDetail, setAlbumDetail] = useState<any>({});

    const fetchalbumDetail = async () => {
        const { name, release_date, type, label,
            copyrights: [{ text }], images: [{ url }], artists,
            tracks: { items } } = await
                fetchFromAPI(`albums/${id}`, token)

        setAlbumDetail({
            name, release_date, type, label, text, url, artists, items
        })
    };

    useEffect(() => {
        if (token) {
            fetchalbumDetail();
        }
    }, [token, id])

    if (!albumDetail.name) return <Loader />

    const { name, release_date, type, label,
        text, url, artists, items } = albumDetail;

    let allTime = 0;
    let allTracks = Object.keys(items).length;

    items.forEach((value: any) => {
        allTime += value.duration_ms
    })

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white'
            }}>
                <SectionHeader img={url} name={name} releaseDate={release_date}
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
                            <TrackList key={idx} idx={idx} item={item} />
                        )
                    })
                    }
                </Container>

                <div className='d-flex flex-column text-muted mx-4 mb-4 fw-bolder'>
                    <span> {release_date} </span>
                    <span> Label: {label} </span>
                    <span> {text} </span>
                </div>

            </Container>
        </>
    )

}

export default AlbumDetail