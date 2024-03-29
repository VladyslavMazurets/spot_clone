import React, { useState, useEffect, useContext } from 'react'

import { Stack } from 'react-bootstrap'
import { Context } from '../context'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import PlaylistsContent from './const/PlaylistsContent'
import TrackHeader from './const/TrackHeader'
import Loader from './Loader'

function LikedSongs() {

  const { token } = useContext(Context)
  const [userName, setUserName] = useState({})
  const [userLikedTracks, setUserLikedTracks] = useState<any>([])

  const fetchUserName = async () => {
    const { display_name } = await fetchFromAPI('me', token)
    setUserName(display_name)
  }

  const fetchUserTopTracks = async () => {
    const { items } = await fetchFromAPI('me/tracks?limit=50', token)
    setUserLikedTracks(items)
  }

  useEffect(() => {
    if (token) {
      fetchUserTopTracks();
      fetchUserName();
    }
  }, [token])

  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
        <div className='d-flex flex-row text-white align-items-end fw-bold'
          style={{
            padding: '5rem 2rem 1.5rem',
            background: 'linear-gradient(to left top, purple, #3a49f0)'
          }}>
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
            <span> {`${userName} • ${Object.keys(userLikedTracks).length} songs`}</span>
          </div>
        </div>

{ userLikedTracks.length ?
        <div className='pt-5 pb-5 mb-5 px-4 border-bottom border-secondary'>
          <TrackHeader album={'album'} date={'date added'} />
          {userLikedTracks?.map((item: any, idx: number) => {
            return (
              <PlaylistsContent key={idx} item={item} idx={idx} />
            )
          })
          }
        </div>
      : <Loader 
          bgColor='#1a0229' 
           title={`you don't have any favorite tracks at the moment, add your first favorite track to see it here`}/>
}
      </Stack>
    </>
  )
}

export default LikedSongs