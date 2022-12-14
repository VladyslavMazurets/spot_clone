import React, { useState, useEffect, useContext } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import SearchCatgBt from '../const/SearchCatgBt'
import Loader from '../Loader'
import '../style/hover.css'
import { Link, useNavigate } from 'react-router-dom'
import TrackList from '../const/TrackList'
import ArtistCards from '../const/ArtistCards'
import PlaylistsCards from '../const/PlaylistsCards'
import NotFoundPage from '../const/NotFoundPage'

function SearchAll() {

  const { token, search } = useContext(Context)

  const [searchAll, setSearchAll] = useState<any>({})

  const fetchAll = async () => {
    const { artists, albums, tracks, playlists, episodes } =
      await fetchFromAPI(`search?q=${search}&type=artist,album,track,playlist,episode&limit=10`, token)
    setSearchAll({ artists, tracks, albums, playlists, episodes })
  }

  useEffect(() => {
    if (token && search !== '') {
      const timer = setTimeout(() => {
        fetchAll();
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [search])

  if (Object.values(searchAll).length === 0 || undefined) return <Loader />
  if (searchAll.albums.items.length === 0) return <NotFoundPage state={search} />

  return (
    <>
      <SearchCatgBt />
      <Container fluid className="border-bottom border-secondary pb-5 mb-5">
        <Row className='mt-4 ms-4'>
          <Col sm={3}>
            <span className='text-white fw-bold fs-3'>Top result</span>
            <Link to={`/artist/${searchAll.artists.items[0]?.id}`}
              className='text-decoration-none'>
              <Col className='d-flex flex-column p-4 text-white rounded 
                mt-4 hover_artist_box'
                style={{ background: '#2e014a' }}>
                <img src={searchAll.artists.items[0]?.images[0]?.url}
                  alt='Artist Avatar' width="110px" height="110px"
                  className='rounded-circle' />
                <span className='fs-3 fw-bold mt-2 mb-2'>
                  {searchAll.artists.items[0]?.name}
                </span>
                <span className='fs-6 text-uppercase rounded-pill p-1 w-25 d-flex
                justify-content-center'
                  style={{ background: '#3e0163' }}>
                  {searchAll.artists.items[0]?.type}
                </span>
              </Col>
            </Link>
          </Col>

          <Col>
            <span className='text-white fw-bold fs-3'>Songs</span>
            <Col className='mt-3'>
              {searchAll.tracks.items?.slice(0, 4).map((item: any, idx: number) => {
                return (
                  <TrackList key={idx} idx={idx} item={item} track={true} />
                )
              })
              }
            </Col>
          </Col>
        </Row>

        <Row className='mt-5 ms-4'>
          <span className='text-white fw-bold fs-3'>Artists</span>
          <ArtistCards relatedArtists={searchAll.artists?.items} section={true} />
        </Row>

        <Row className='mt-3 ms-4'>
          <PlaylistsCards state={searchAll.albums?.items} title={'Albums'}
            artistsName={true} image={true} linkURL={'albums'} section={true} />
        </Row>

        <Row className='mt-3 ms-4'>
          <PlaylistsCards state={searchAll.playlists?.items} title={'Playlists'}
            artistsName={false} image={true} linkURL={'playlists'} section={true} />
        </Row>

        <Row className='mt-3 ms-4'>
          <PlaylistsCards state={searchAll.episodes?.items} title={'Episodes'}
            artistsName={false} image={true} linkURL={'episode'} section={true}/>
        </Row>
      </Container>
    </>
  )
}

export default SearchAll