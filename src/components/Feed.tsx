import React from 'react'

import { Stack } from 'react-bootstrap'

import Music from './Music'
import Sidebar from './Sidebar'

function Feed() {
  return (
    <>
      <Stack style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <Stack>
          <Music />
        </Stack>
      </Stack>
    </>
  )
}

export default Feed