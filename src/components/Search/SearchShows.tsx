import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../../context'
import { fetchFromAPI } from '../../utils/fetchFromAPI'
import NotFoundPage from '../const/NotFoundPage'
import PlaylistsCards from '../const/PlaylistsCards'
import SearchCatgBt from '../const/SearchCatgBt'

function SearchShows() {

    const { token, search } = useContext(Context)
    const [searchShows, setSearchShows] = useState<any>([])

    const fetchSearchShows = async () => {
        const { shows: { items } } = await fetchFromAPI(`search?q=${search}&type=show&limit=10`, token)
        setSearchShows(items)
    }

    useEffect(() => {
        if (token && search.length !== 0 || undefined) {
            const timer = setTimeout(() => {
                fetchSearchShows();
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [search])

    if (searchShows.length == 0) return <NotFoundPage state={search} />

    return (
        <>
            <SearchCatgBt />
            <Container fluid style={{ padding: '1.5rem 2rem 0 4rem' }}
                className="border-bottom border-secondary pb-5 mb-5">
                <PlaylistsCards state={searchShows} title={'Podcasts & Shows'}
                    image={true} artistsName={false} linkURL={'show'}
                    sectionID={'show'} section={true}
                    categoriesName={searchShows[0]?.name.slice(0, 10)} />
            </Container>
        </>
    )
}

export default SearchShows