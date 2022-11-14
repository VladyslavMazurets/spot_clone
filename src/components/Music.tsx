import React, { useContext, useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import Cards from './const/Cards';

function Music() {

  const { token } = useContext(Context);

  const [newReleases, setNewReleases] = useState<any>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [recommendations, setRecommendations] = useState<any>([]);


  const fetchNewReleases = async () => {
    const { albums } = await fetchFromAPI('browse/new-releases?country=US&limit=7', token);
    setNewReleases(albums.items);
  }

  const fetchFeaturedPlaylists = async () => {
    const { playlists } = await fetchFromAPI('browse/featured-playlists?country=US&limit=7', token);
    setFeaturedPlaylists(playlists.items);
  }

  const fetchCategories = async () => {
    const { playlists } = await fetchFromAPI('browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists?country=US&limit=7', token);
    setCategories(playlists.items);
  }

  const fetchRecommendations = async () => {
    const { tracks } = await fetchFromAPI('recommendations?country=US&limit=7&seed_genres=hip-hop&max_popularity=100', token);
    setRecommendations(tracks);
  }

  useEffect(() => {
    console.log(token)
    if (token) {
      fetchNewReleases();
      fetchFeaturedPlaylists();
      fetchCategories();
      fetchRecommendations();
    }
  }, [token])

  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229' }}>
        <Cards state={newReleases} title='New Releases' artistsName={true} image={true} />
        <Cards state={featuredPlaylists} title="Featured Playlists" artistsName={false} image={true} />
        <Cards state={categories} title="Popular hip-hop playlists" artistsName={false} image={true} />
        <Cards state={recommendations} title="The best rap songs" artistsName={true} image={false} />
      </Stack>
    </>
  )
}

export default Music