import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import PlaylistsCards from './const/PlaylistsCards';
import Loader from './Loader';

function Music() {

  const { token } = useContext(Context);

  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const fetchNewReleases = async () => {
    const { albums } = await fetchFromAPI('browse/new-releases?country=US&limit=34', token);
    setNewReleases(albums.items);
  }

  const fetchFeaturedPlaylists = async () => {
    const { playlists } = await fetchFromAPI('browse/featured-playlists?country=US&limit=34', token);
    setFeaturedPlaylists(playlists.items);
  }

  const fetchCategories = async () => {
    const { playlists } = await fetchFromAPI('browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists?country=US&limit=34', token);
    setCategories(playlists.items);
  }

  const fetchRecommendations = async () => {
    const { tracks } = await fetchFromAPI('recommendations?country=US&limit=34&seed_genres=hip-hop&min_popularity=70&max_popularity=100', token);
    setRecommendations(tracks);
  }

  useEffect(() => {
    if (token) {
      fetchNewReleases();
      fetchFeaturedPlaylists();
      fetchCategories();
      fetchRecommendations();
    }
  }, [token])

  if(!newReleases.length) return <Loader bgColor='#1a0229'/>

  return (
    <>
      <Container fluid style={{ padding: "2.5rem 2rem 0 2rem", 
      backgroundColor: '#1a0229', minHeight: '100vh'}}>
        <PlaylistsCards state={newReleases} title='New Releases' artistsName={true} image={true} linkURL={'albums'} slice={10} sectionID={'newReleases'} section={true}/>
        <PlaylistsCards state={featuredPlaylists} title="Featured Playlists" artistsName={false} image={true} linkURL={'playlists'} slice={10} sectionID={'featuredPlaylists'} section={true}/>
        <PlaylistsCards state={categories} title="Popular hip-hop playlists" artistsName={false} image={true} linkURL={'playlists'} slice={10} sectionID={'categories'} section={true}/>
        <PlaylistsCards state={recommendations} title="The best rap songs" artistsName={true} image={false} linkURL={'track'} slice={10} sectionID={'recommendations'} section={true}/>
      </Container>
    </>
  )
}

export default Music