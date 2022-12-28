import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'

import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import ArtistCards from '../const/ArtistCards'
import NotFoundPage from '../const/NotFoundPage'
import SearchCatgBt from '../const/SearchCatgBt'

function SearchArtists() {

    const { token, search } = useContext(Context)
    const [searchArtists, setSearchArtists] = useState([])

    const fetchSearchArtists = async () => {
        const { artists: { items } } = await fetchFromAPI(`search?q=${search}&type=artist&limit=49`, token)
        setSearchArtists(items)
    }

    useEffect(() => {
        if (token && search.length !== 0 || undefined) {
            const timer = setTimeout(() => {
                fetchSearchArtists();
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [search])

    if (searchArtists?.length === 0) return <NotFoundPage state={search} />

    return (
        <>
            <SearchCatgBt />
            <Container fluid style={{ padding: '1.5rem 2rem 0 3rem' }}
                className="border-bottom border-secondary pb-5 mb-5">
                <ArtistCards relatedArtists={searchArtists} />
            </Container>
        </>
    )
}

export default SearchArtists