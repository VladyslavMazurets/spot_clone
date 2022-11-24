import React from 'react'

import { MdPeople } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ConvertMsToTime } from '../function/functionReus';

interface IHeader {
    img: string,
    description?: string,
    followers?: number,
    name?: string,
    owner?: string,
    bgColor?: string,
    releaseDate?: string,
    artists?: any,
    allTime: number,
    allTracks?: number
}

function SectionHeader({ img, description, followers, name,
    owner, releaseDate, artists, allTime, allTracks, bgColor }: IHeader) {

    return (
        <>
            <div>
                <div className="d-flex align-items-end" style={{
                    padding: '5rem 4rem 1.5rem 4rem', width: '100%',
                    backgroundColor: `${bgColor}`,
                    boxShadow: `1px 10px 10px 12px ${bgColor}`,
                }}>

                    <img src={img} alt="Playlists Img" width="232px" height="232px" style={{
                        boxShadow: '0 4px 60px rgb(0 0 0 / 80%)'
                    }} />


                    <div className='ps-5 d-flex flex-column'>

                        {owner ?
                            <span style={{
                                fontWeight: 'bold', fontSize: '1rem',
                                textTransform: 'uppercase'
                            }}>
                                {owner}
                            </span>
                            :
                            <span style={{
                                fontWeight: 'bold', fontSize: '1rem',
                                textTransform: 'uppercase'
                            }}>
                                song
                            </span>
                        }

                        <span style={{
                            fontSize: name!.length < 28 ? '6rem' : '4rem', width: '100%', fontWeight: 'bold',
                            textTransform: 'capitalize', margin: '0.08em 0px 0.12em'
                        }}>
                            {name}
                        </span>

                        {description &&
                            <span style={{
                                fontSize: '1.2rem', fontWeight: 400, color: '#b3b3b3'
                            }}>
                                {description}
                            </span>
                        }

                        {followers ?

                            <span style={{
                                fontSize: '1rem', fontWeight: 'bold',
                                marginTop: '0.4rem',
                            }}>
                                Spotify · Followers: {followers!.toLocaleString('en-US')} <MdPeople /> · {allTracks} songs · {ConvertMsToTime(allTime)}
                            </span>

                            : allTracks ?

                                <span style={{
                                    fontSize: '1rem', fontWeight: 'bold',
                                    marginTop: '0.4rem'
                                }}>
                                    Spotify
                                    {artists.map((item: any, idx: number) => {
                                        return (
                                            <Link key={idx} className='mx-1 
                                        text-decoration-none text-white'
                                                to={`/artist/${item.id}`}>
                                                · {item.name}
                                            </Link>
                                        )
                                    })} · {releaseDate?.slice(0, 4)} · {allTracks} songs · {ConvertMsToTime(allTime)}
                                </span>
                                :
                                <span style={{
                                    fontSize: '1rem', fontWeight: 'bold',
                                    marginTop: '0.4rem'
                                }}>
                                    {artists.map((item: any, idx: number) => {
                                        return (
                                            <Link key={idx} className='mx-1 
                                        text-decoration-none text-white'
                                                to={`/artist/${item.id}`}>
                                                {item.name} ·
                                            </Link>
                                        )
                                    })} {releaseDate?.slice(0, 4)} · {ConvertMsToTime(allTime)}
                                </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionHeader
