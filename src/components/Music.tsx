import React, { useContext } from 'react';

import Stack from 'react-bootstrap/Stack';

import { Context } from '../context';
import PlaylistsCards from './const/PlaylistsCards';

function Music() {

  const { newReleases, featuredPlaylists, categories, recommendations,
  } = useContext(Context);

  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
        <PlaylistsCards state={newReleases} title='New Releases' artistsName={true} image={true} linkURL={'albums'} slice={7} sectionID={'newReleases'} />
        <PlaylistsCards state={featuredPlaylists} title="Featured Playlists" artistsName={false} image={true} linkURL={'playlists'} slice={7} sectionID={'featuredPlaylists'} />
        <PlaylistsCards state={categories} title="Popular hip-hop playlists" artistsName={false} image={true} linkURL={'playlists'} slice={7} sectionID={'categories'} />
        <PlaylistsCards state={recommendations} title="The best rap songs" artistsName={true} image={false} linkURL={'track'} slice={7} sectionID={'recommendations'} />
      </Stack>
    </>
  )
}

export default Music