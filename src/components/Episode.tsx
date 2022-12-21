import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import { Context } from '../context'
import SectionHeader from './const/SectionHeader'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { randomBgColor } from './function/functionReus'

function Episode() {

    const { token } = useContext(Context)
    const { id } = useParams()

    const [episode, setEpisode] = useState<any>({})


    const fetchEpisode = async () => {
        const { images: [{ url }], description, name, release_date, duration_ms, publisher } = await fetchFromAPI(`episodes/${id}`, token)
        setEpisode({ url, description, name, release_date, duration_ms, publisher })
    }

    useEffect(() => {
        fetchEpisode();
    }, [token])

    const bgColor = randomBgColor();

    return (
        <>
            <Container fluid style={{
                backgroundColor: '#1a0229', minHeight: '100vh',
                color: 'white'
            }}>
                <SectionHeader img={episode?.url} name={episode?.name} bgColor={bgColor}
                  description={episode?.publisher}  allTime={episode?.duration_ms} />
            </Container>
            {console.log(episode?.publisher)}
        </>
    )
}

export default Episode