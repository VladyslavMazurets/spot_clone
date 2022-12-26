import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Context } from './context';
import Section from './components/Section';
import Sidebar from './components/Sidebar';
import Music from './components/Music';
import LikedSongs from './components/LikedSongs';
import PlaylistsDetail from './components/const/PlaylistsDetail';
import { fetchFromAPI } from './utils/fetchFromAPI';
import AlbumDetail from './components/const/AlbumDetail';
import TrackDetail from './components/TrackDetail';
import Artist from './components/Artist';
import SearchBar from './components/Search/SearchBar';
import SearchIntro from './components/Search/SearchIntro';
import Genre from './components/Genre';
import SearchAll from './components/Search/SearchAll';
import Episode from './components/Episode';
import SearchSongs from './components/Search/SearchSongs';
import SearchArtists from './components/Search/SearchArtists';
import SearchAlbums from './components/Search/SearchAlbums';
import SearchShows from './components/Search/SearchShows';
import Show from './components/Show';
import SearchPlaylists from './components/Search/SearchPlaylists';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState('')

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

  const providerValue = useMemo(() => ({
    token, setToken, newReleases,
    setNewReleases, featuredPlaylists, setFeaturedPlaylists, categories,
    setCategories, recommendations, setRecommendations, search, setSearch
  }), [token, newReleases, featuredPlaylists, categories, recommendations, search,
    setSearch])

  return (
    <>
      <Context.Provider value={providerValue}>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Sidebar />}>
            <Route index element={<Music />} />
            <Route path='search' element={<SearchBar />}>
              <Route index element={<SearchIntro />} />
              <Route path='all' element={<SearchAll />} />
              <Route path='songs' element={<SearchSongs />} />
              <Route path='artists' element={<SearchArtists />} />
              <Route path='albums' element={<SearchAlbums />} />
              <Route path='shows' element={<SearchShows />} />
              <Route path='playlists' element={<SearchPlaylists />} />
            </Route>
            <Route path='library' element={<LikedSongs />} />
            <Route path='section/:id' element={<Section />} />
            <Route path='section/:id/:categoriesName/:navURL' element={<Section />} />
            <Route path='playlists/:id' element={<PlaylistsDetail />} />
            <Route path='albums/:id' element={<AlbumDetail />} />
            <Route path='track/:id' element={<TrackDetail />} />
            <Route path='track/:id/artist/:artistID/album/:albumID/:artistName/:trackName' element={<TrackDetail />} />
            <Route path='artist/:id' element={<Artist />} />
            <Route path='genre/:categoriesName/:id' element={<Genre />} />
            <Route path='episode/:id' element={<Episode />} />
            <Route path='show/:id' element={<Show />} />
          </Route>
        </Routes>
      </Context.Provider>
    </>
  )
}

export default App;
