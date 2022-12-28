import React, { useState, useEffect, useContext } from 'react'

import { Container } from 'react-bootstrap'
import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import NotFoundPage from '../const/NotFoundPage'
import PlaylistsCards from '../const/PlaylistsCards'
import SearchCatgBt from '../const/SearchCatgBt'

function SearchAlbums() {

    const { token, search } = useContext(Context)
    const [searchAlbums, setSearchAlbums] = useState([])

    const fetchSearchAlbums = async () => {
        const { albums: { items } } = await fetchFromAPI(`search?q=${search}&type=album&limit=49`, token)
        setSearchAlbums(items)
    }

    useEffect(() => {
        if (token && search.length !== 0 || undefined) {
            const timer = setTimeout(() => {
                fetchSearchAlbums();
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [search])

    if (searchAlbums.length == 0) return <NotFoundPage state={search} />

    return (
        <>
            <SearchCatgBt />
            <Container fluid style={{ padding: '1.5rem 2rem 0 3rem' }}
                className="border-bottom border-secondary pb-5 mb-5">
                <PlaylistsCards state={searchAlbums} title={''}
                    artistsName={false} image={true} linkURL={'albums'} />
            </Container>
        </>
    )
}

export default SearchAlbums