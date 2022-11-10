import React from 'react'

import { Stack } from 'react-bootstrap'

import Music from './Music'
import Sidebar from './Sidebar'

function Feed() {
  return (
    <>
      <Stack style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <Stack style={{ overflowY: "auto", height: "100vh", flex: 2 }}>
          <Music />
        </Stack>
      </Stack>
    </>
  )
}

export default Feed