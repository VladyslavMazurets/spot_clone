import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Stack } from 'react-bootstrap'
import { MdPeople, MdVerified } from 'react-icons/md'

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';

interface IArtDet {
    [genres: string]: any,
    image: string,
    name: string,
    followers: number | null
}

function Artist() {

    const { token } = useContext(Context);
    const { id } = useParams();
    const [artistDetail, setArtistDetail] = useState<IArtDet>({
        genres: {}, image: '', name: '', followers: 0
    });


    const fetchArtist = async () => {
        const { followers: { total }, genres, images: [{ url }], name
        } = await fetchFromAPI(`artists/${id}`, token);

        setArtistDetail({
            genres: { genres }, image: url, name: name, followers: total
        });
    }

    useEffect(() => {
        if (token) {
            fetchArtist();
        }
    }, [token, id])

    const { name, image, followers, genres: { genres } } = artistDetail;

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <div style={{
                    backgroundImage: `url(${image})`,
                    height: '40vh', backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', display: 'flex',
                    alignItems: 'end', padding: '2rem'
                }}>
                    <div className='d-flex flex-column'>
                        <span className="fs-5 fw-bolder d-flex align-items-center">
                            <MdVerified style={{ color: '#0c67d3' }}
                                className="fs-4 me-1" />
                            Verified Artist
                        </span>
                        <span style={{
                            fontSize: '6rem', fontWeight: 'bold',
                            lineHeight: '5rem', margin: '0.08em 0 0.35em'
                        }}>
                            {name}
                        </span>
                        <span style={{
                            fontSize: '1.2rem', textTransform: 'capitalize',
                            fontWeight: 'bolder'
                        }}>
                            Total followers: {followers!.toLocaleString('en-US')}
                            {""} <MdPeople /> {""} ·
                            Genres: {genres?.map((item?: string, idx?: number) => {
                                return (
                                    <span key={idx} className="me-2">{item} |</span>
                                )
                            })}
                        </span>
                    </div>
                </div>
            </Stack>
        </>
    )
}

export default Artist