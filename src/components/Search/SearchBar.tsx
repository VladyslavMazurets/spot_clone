import React, { useContext, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import { InputGroup, Button, Stack } from 'react-bootstrap'
import { Context } from '../../context'
import { Outlet, useNavigate } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs'
import { TfiClose } from 'react-icons/tfi'

function SearchBar() {

    const { search, setSearch } = useContext(Context)
    const navigate = useNavigate()


    useEffect(() => {
        { search.length == 0 && navigate('/search', { replace: true }) }
    }, [search])

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
                <InputGroup className='w-50 mx-5 my-3 py-2'>
                    <Button variant='link' className='bg-white text-black 
                    border-0 fs-6'>
                        <BsSearch className='mb-1' />
                    </Button >
                    <Form.Control value={search}
                        placeholder='What do you want to listen to?'
                        className='border-0 shadow-none fs-6 outline-light'
                        onChange={(e) => setSearch(e.target.value)} />
                    <Button variant='link' onClick={() => setSearch('')}
                        className='bg-white text-black'>
                        {search.length !== 0 && <TfiClose />}
                    </Button>
                </InputGroup>
                <Outlet />
            </Stack>
        </>
    )
}

export default SearchBar