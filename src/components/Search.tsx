import React from 'react'

import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import { InputGroup, Button } from 'react-bootstrap'

import { BsSearch } from 'react-icons/bs'
import { TfiClose } from 'react-icons/tfi'

function Search() {
  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
        <InputGroup className='w-50 mx-5 my-3 py-2'>
          <Button variant='link' className='bg-white text-black border-0 fs-4'>
            <BsSearch className='mb-2' />
          </Button >
          <Form.Control type='search' placeholder='What do you want to listen to?'
            className='border-0 fs-5' />
          <Button variant='link' className='bg-white text-black border-0 fs-4'>
            <TfiClose className='mb-2' />
          </Button >
        </InputGroup>
      </Stack>
    </>
  )
}

export default Search