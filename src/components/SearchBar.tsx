import React, { useState, useEffect, useContext } from 'react'

import Form from 'react-bootstrap/Form'
import { InputGroup, Button, Stack } from 'react-bootstrap'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import { Context } from '../context'
import { Outlet } from 'react-router-dom'

import { BsSearch } from 'react-icons/bs'
import { TfiClose } from 'react-icons/tfi'
import SearchIntro from './SearchIntro'

function SearchBar() {

    const { token } = useContext(Context)

    const initialState = '';
    const [search, setSearch] = useState(initialState)
    const [searchData, setSearchData] = useState({})

    const fetchSearch = async () => {
        fetchFromAPI('search?q=Chief%20Keef&type=show', token).then((data) => setSearchData(data))
    }

    useEffect(() => {
        if (token) {
            // fetchSearch();
        }
    }, [token, search])


    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
                <InputGroup className='w-50 mx-5 my-3 py-2'>
                    <Button variant='link' className='bg-white text-black border-0 fs-6'>
                        <BsSearch className='mb-1' />
                    </Button >
                    <Form.Control type='search' value={search}
                        placeholder='What do you want to listen to?'
                        className='border-0 shadow-none fs-6 outline-light'
                        onChange={(e) => setSearch(e.target.value)} />
                    <Button variant='link' className='bg-white text-black border-0 fs-6'
                        onClick={e => setSearch(initialState)}>
                        <TfiClose className={`${search === '' && 'd-none'} mb-1`} />
                    </Button >
                </InputGroup>

                <Outlet />
            
            </Stack>
        </>
    )
}

export default SearchBar