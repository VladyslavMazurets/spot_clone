import React, { useState, useEffect, useContext } from 'react'

import { Stack } from 'react-bootstrap'
import { Context } from '../context'
import { fetchFromAPI } from '../utils/fetchFromAPI'

function LikedSongs() {

  const { token } = useContext(Context)
  const [userTopTracks, setUserTopTracks] = useState<any>([])

  const fetchUserTopTracks = async () => {
    const { display_name } = await fetchFromAPI('me', token)
    setUserTopTracks({ display_name })
  }

  useEffect(() => {
    if (token) {
      fetchUserTopTracks();
    }
  }, [])

  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
        <div className='d-flex flex-row text-white align-items-end fw-bold'
          style={{ padding: '5rem 2rem 1.5rem', background: 'linear-gradient(purple, #3a49f0)' }}>
          <img width='260px' height='260px' className='me-4 shadow-lg'
            src={'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'} />
          <div className='d-flex flex-column'>
            <span style={{ fontSize: '1rem' }}>PLAYLIST</span>
            <span style={{
              fontSize: '6.5rem', marginBottom: '2rem',
              lineHeight: 1
            }}>
              Liked Songs
            </span>
            <span> {userTopTracks} • 32 songs</span>
          </div>
        </div>

        <div>

        </div>
      </Stack>
      {console.log(userTopTracks)}
    </>
  )
}

export default LikedSongs