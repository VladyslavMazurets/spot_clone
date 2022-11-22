import React from 'react'

import { MdPeople } from 'react-icons/md';

interface IHeader {
    img: string,
    description?: string,
    followers?: number,
    name?: string,
    owner?: string,
    bgColor?: string,
    releaseDate?: string,
    artists?: any
}

function SectionHeader({ img, description, followers, name,
    owner, releaseDate, artists, bgColor }: IHeader) {

    return (
        <>
            <div>
                <div className="d-flex align-items-end" style={{
                    padding: '5rem 4rem', width: '100%',
                    backgroundColor: `${bgColor}`,
                    boxShadow: `1px 10px 10px 12px ${bgColor}`,
                }}>

                    <img src={img} alt="Playlists Img" width="232px" height="232px" style={{
                        boxShadow: '0 4px 60px rgb(0 0 0 / 80%)'
                    }} />

                    <div className='px-5 d-flex flex-column'>
                        <span style={{
                            fontWeight: 'bold', fontSize: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            {owner}
                        </span>

                        <span style={{
                            fontSize: '4rem', width: '100%', fontWeight: 'bold',
                            textTransform: 'uppercase', margin: '0.08em 0px 0.12em'
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
                                Spotify · Followers: {followers!.toLocaleString('en-US')} <MdPeople /> · 100 songs
                            </span>
                            :
                            <span style={{
                                fontSize: '1rem', fontWeight: 'bold',
                                marginTop: '0.4rem',
                            }}>
                                {Object.values(artists).length == 1 ?
                                    `${artists[0].name}`
                                    : `Spotify · ${artists[0].name} · ${artists[1].name} · ${releaseDate?.slice(0,4)} `
                                }
                            </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionHeader