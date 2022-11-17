import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Context } from '../context';
import PlaylistsCards from './const/PlaylistsCards';

function Section() {

  const { newReleases, featuredPlaylists, categories,
    recommendations } = useContext(Context);

  const { id } = useParams();

  return (
    <>
      <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh' }}>
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
          <PlaylistsCards state={recommendations} title="The best rap songs" artistsName={true} image={false} linkURL={'playlists'} />
        }
      </Stack>
    </>
  )
}

export default Section