import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'

import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import NotFoundPage from '../const/NotFoundPage'
import PlaylistsCards from '../const/PlaylistsCards'
import SearchCatgBt from '../const/SearchCatgBt'

function SearchPlaylists() {

    const { token, search } = useContext(Context)
    const [searchPlaylists, setSearchPlaylists] = useState([])

    const fetchSearchPlaylists = async () => {
        const { playlists: { items } } = await fetchFromAPI(`search?q=${search}&type=playlist&genre=${search}&limit=49`, token)
        setSearchPlaylists(items)
    }

    useEffect(() => {
        fetchSearchPlaylists();
    }, [search])

    if (searchPlaylists.length == 0) return <NotFoundPage state={search} />

    return (
        <>
            <SearchCatgBt />
            <Container fluid className='px-5 py-4'>
                <PlaylistsCards state={searchPlaylists}
                    title="" artistsName={false} image={true}
                    linkURL={'playlists'} />
            </Container>
            {console.log(token)}
        </>
    )
}

export default SearchPlaylists