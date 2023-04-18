import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Context } from './context';
import Section from './components/Section';
import Sidebar from './components/Sidebar';
import Music from './components/Music';
import LikedSongs from './components/LikedSongs';
import PlaylistsDetail from './components/const/PlaylistsDetail';
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
import axios from 'axios';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  const [token, setToken] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [search, setSearch] = useState('')

  const providerValue = useMemo(() => ({
    token, setToken, search, setSearch, code, setCode
  }), [token, code, search, setSearch])
  

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
