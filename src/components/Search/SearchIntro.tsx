import React, { useContext, useEffect } from 'react'
import { Context } from '../../context'

import { Container } from 'react-bootstrap'
import IntroCards from '../const/IntroCards'
import { useNavigate } from 'react-router-dom'

function SearchIntro() {

  const { search } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    { search.length > 0 && navigate('all', { replace: true }) }
  }, [search])

  return (
    <>
      <Container fluid className='ps-4 pt-3 pb-5 border-bottom border-secondary mb-5'>
        <span className='text-white fs-3 fw-bold'>
          Browse all
        </span>
        <IntroCards />
      </Container>
    </>
  )
}

export default SearchIntro