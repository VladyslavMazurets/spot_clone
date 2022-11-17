import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

import { MdPeople } from 'react-icons/md';

interface IPlaylists {
    state: any,
    bgColor?: string
}

function PlaylistsDetail({ state, bgColor }: IPlaylists) {

    const { description, followers: { total }, images: { url }, name,
        tracks: { items } } = state;

    return (
        <>
            <Container fluid style={{
                backgroundColor: `${bgColor}`,
                boxShadow: `-1px 10px 10px ${bgColor}`
            }}>
                <div className="d-flex align-items-end" style={{
                    padding: '5rem 4rem', width: 'max-content'
                }}>

                    <img src={url} alt="Playlists Img" width="232px" height="232px" style={{
                        boxShadow: '0 4px 60px rgb(0 0 0 / 80%)'
                    }} />

                    <div className='px-5 d-flex flex-column'>
                        <span style={{
                            fontWeight: 'bold', fontSize: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            Playlists
                        </span>
                        <span style={{
                            fontSize: '4rem', width: '100%', fontWeight: 'bold',
                            textTransform: 'uppercase', margin: '0.08em 0px 0.12em'
                        }}>
                            {name}
                        </span>
                        <span style={{
                            fontSize: '1.2rem', fontWeight: 400, color: '#b3b3b3'
                        }}>
                            {description}
                        </span>
                        <span style={{
                            fontSize: '1rem', fontWeight: 'bold',
                            marginTop: '0.4rem',
                        }}>
                            Spotify · Followers: {total.toLocaleString('en-US')} <MdPeople />
                        </span>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default PlaylistsDetail