import React, { useState, useEffect, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import PlaylistsCards from './const/PlaylistsCards';
import Loader from './Loader';

function Section() {

  const { newReleases, featuredPlaylists, categories,
    recommendations } = useContext(Context);


  const { id, categoriesName, navURL } = useParams();

  const { token, search } = useContext(Context)

  const [genrePlaylists, setGenrePlaylists] = useState([])
  const [genreTracks, setGenreTracks] = useState([])
  const [searchCategories, setSearchCategories] = useState([])
  const [oldSchoolTracks, setOldSchoolTracks] = useState([])
  const [searchShows, setSearchShows] = useState([])

  const CategoriesName = categoriesName!.toLowerCase()

  const fetchGenrePlaylists = async () => {
    const { playlists: { items } } = await fetchFromAPI(`browse/categories/${id}/playlists`, token)
    setGenrePlaylists(items)
  }

  const fetchGenreTracks = async () => {
    const { tracks } = await fetchFromAPI(`recommendations?limit=34&seed_genres=${CategoriesName}&min_popularity=70&max_popularity=100`, token)
    setGenreTracks(tracks)
  }

  const fetchSearchCategories = async () => {
    const { playlists: { items } } = await fetchFromAPI(`search?q=${CategoriesName}&type=playlist&genre=${CategoriesName}`, token)
    setSearchCategories(items)
  }

  const fetchOldSchoolTracks = async () => {
    const { tracks: { items } } = await fetchFromAPI(`search?q=${CategoriesName}1990&type=track&limit=7`, token)
    setOldSchoolTracks(items)
  }

  const fetchSearchShows = async () => {
    const { shows: { items } } = await fetchFromAPI(`search?q=${categoriesName}&type=show&limit=49`, token)
    setSearchShows(items)
  }

  useEffect(() => {
    if (token) {
      fetchSearchShows();
    }
  }, [categoriesName])

  useEffect(() => {
    if (token && parseInt(id!) === 0) {
      fetchGenrePlaylists();
      fetchGenreTracks();
      fetchSearchCategories();
      fetchOldSchoolTracks();
    }
  }, [token])

  if (!genrePlaylists || !genreTracks || !oldSchoolTracks || !searchCategories)
    return <Loader />

  return (
    <>
      <Container fluid style={{ padding: "2rem 2rem 0 2rem", backgroundColor: '#1a0229', minHeight: '100vh' }}>
        {'newReleases' == id &&
          <PlaylistsCards state={newReleases} title='New Releases' artistsName={true} image={true} linkURL={'albums'} />
        }
        {'featuredPlaylists' == id &&
          <PlaylistsCards state={featuredPlaylists} title="Featured Playlists" artistsName={false} image={true} linkURL={'playlists'} />
        }
        {'categories' == id &&
          <PlaylistsCards state={categories} title="Popular hip-hop playlists" artistsName={false} image={true} linkURL={'playlists'} />
        }
        {'recommendations' == id &&
          <PlaylistsCards state={recommendations} title="The best rap songs" artistsName={true} image={false} linkURL={'track'} />
        }
        {'show' == id &&
          <PlaylistsCards state={searchShows} title={'Podcasts'} artistsName={false} image={true} linkURL={'show'} />
        }
        {parseInt(id!) === 0 && navURL == 'popular' &&
          <PlaylistsCards state={genrePlaylists} title={`Popular ${categoriesName} playlists`} artistsName={false} image={true} linkURL={'show'} />
        }
        {parseInt(id!) === 0 && navURL == 'track' &&
          <PlaylistsCards state={genreTracks} title={`The best ${categoriesName} songs`} artistsName={true} image={false} linkURL={'track'} />
        }
        {parseInt(id!) === 0 && navURL == 'featured' &&
          <PlaylistsCards state={searchCategories} title={`Featured ${categoriesName} Playlists`} artistsName={false} image={true} linkURL={'playlists'} />
        }
        {parseInt(id!) === 0 && navURL == 'oldSchoolTracks' &&
          <PlaylistsCards state={oldSchoolTracks} title={`Old School ${categoriesName} tracks`} artistsName={true} image={false} linkURL={'track'} />
        }
      </Container>
      {console.log(searchShows)}
    </>
  )
}

export default Section