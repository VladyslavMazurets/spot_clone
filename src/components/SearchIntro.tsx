import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { fetchFromAPI } from '../utils/fetchFromAPI'

import { Container } from 'react-bootstrap'
import IntroCards from './const/IntroCards'

function SearchIntro() {

  const { token } = useContext(Context)

  const [genre, setGenre] = useState({})

  const fetchGenre = async () => {
    fetchFromAPI('browse/categories/latin/playlists', token).then((data) => setGenre(data))
  }

  useEffect(() => {
    if (token) {
      fetchGenre();
    }

  }, [token])


  return (
    <>
      <Container fluid className='ms-5 pt-3 pb-2'>
        <span className='text-white fs-3 fw-bold'> Browse all </span>
        <IntroCards />
      </Container>
      {console.log(genre)}
    </>
  )
}

export default SearchIntro