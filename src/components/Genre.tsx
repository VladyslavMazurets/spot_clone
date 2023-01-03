import React, { useState, useEffect, useContext } from 'react'

import { Container, Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import PlaylistsCards from './const/PlaylistsCards';

function Genre() {

    const { token } = useContext(Context)
    const { categoriesName, id } = useParams()

    const [genrePlaylists, setGenrePlaylists] = useState([]);
    const [genreTracks, setGenreTracks] = useState([]);
    const [searchCategories, setSearchCategories] = useState([])
    const [oldSchoolTracks, setOldSchoolTracks] = useState([])

    const CategoriesName = categoriesName!.toLowerCase()

    const fetchGenrePlaylists = async () => {
        const { playlists: { items } } = await fetchFromAPI(`browse/categories/${id}/playlists?limit=10`, token)
        setGenrePlaylists(items)
    }

    const fetchGenreTracks = async () => {
        const { tracks } = await fetchFromAPI(`recommendations?limit=7&seed_genres=${CategoriesName}&min_popularity=70&max_popularity=100`, token)
        setGenreTracks(tracks)
    }

    const fetchSearchCategories = async () => {
        const { playlists: { items } } = await fetchFromAPI(`search?q=${CategoriesName}&type=playlist&genre=${CategoriesName}&limit=10`, token)
        setSearchCategories(items)
    }

    const fetchOldSchoolTracks = async () => {
        const { tracks: { items } } = await fetchFromAPI(`search?q=${CategoriesName}1990&type=track&limit=10`, token)
        setOldSchoolTracks(items)
    }

    useEffect(() => {
        if (token) {
            fetchGenrePlaylists();
            fetchGenreTracks();
            fetchSearchCategories();
            fetchOldSchoolTracks();
        }
    }, [token])

    return (
        <>
            <Stack>
                <span className=" text-white fw-bold ps-4"
                    style={{
                        fontSize: '6rem', padding: '4rem 0 3rem',
                        backgroundColor: '#200133'
                    }}>
                    {categoriesName}
                </span>
                <Container fluid style={{ padding: "2rem 2rem 0 2rem", backgroundColor: '#1a0229', minHeight: '100vh' }}>
                    <PlaylistsCards state={genrePlaylists} title={`Popular ${categoriesName} playlists`}
                        artistsName={false} image={true} navURL={'popular'} linkURL={'playlists'}
                        sectionID={id} categoriesName={categoriesName} section={true}/>
                    {genreTracks.length != 0 && <PlaylistsCards state={genreTracks} title={`The best ${categoriesName} songs`}
                        artistsName={true} image={false} navURL={'track'} linkURL={'track'}
                        sectionID={id} categoriesName={categoriesName} section={true}/>}
                    <PlaylistsCards state={searchCategories} title={` Featured ${categoriesName} Playlists`}
                        artistsName={false} image={true} navURL={'featured'} linkURL={'playlists'}
                        sectionID={id} categoriesName={categoriesName} section={true}/>
                    <PlaylistsCards state={oldSchoolTracks} title={`Old School ${categoriesName} tracks`}
                        artistsName={true} image={false} navURL={'oldSchoolTracks'} linkURL={'track'}
                        sectionID={id} categoriesName={categoriesName} section={true}/>
                </Container>
            </Stack>
        </>
    )
}

export default Genre