import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'

import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import NotFoundPage from '../const/NotFoundPage'
import SearchCatgBt from '../const/SearchCatgBt'
import TrackHeader from '../const/TrackHeader'
import TrackList from '../const/TrackList'
import Loader from '../Loader'

function SearchSongs() {

    const { token, search } = useContext(Context)
    const [searchSongs, setSearchSongs] = useState([])

    const fetchSearchSongs = async () => {
        const { tracks: { items } } = await fetchFromAPI(`search?q=${search}&type=track&limit=50`, token)
        setSearchSongs(items)
    }

    useEffect(() => {
        if (token && search.length !== 0 || undefined)
            fetchSearchSongs();
    }, [token, search])

    if (!searchSongs) return <Loader />
    if (searchSongs?.length === 0 && searchSongs) return <NotFoundPage state={search} />

    return (
        <>
            <SearchCatgBt />
            <Container fluid style={{ padding: "2.5rem 2rem 0 2rem" }}
                className="border-bottom border-secondary pb-5 mb-5">
                <TrackHeader />
                {searchSongs?.map((item: any, idx: number) => {
                    return (
                        <TrackList idx={idx} item={item} track={true} />
                    )
                })
                }
            </Container>
        </>
    )
}

export default SearchSongs