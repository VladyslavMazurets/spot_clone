import React, { useContext, useEffect, useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import { Context } from '../context';
import { fetchFromAPI } from '../utils/fetchFromAPI';

function Music() {

  const { token } = useContext(Context);

  const [newReleases, setnewReleases] = useState<string[]>([]);

  // useEffect(() => {
  //   fetchFromAPI('browse/new-releases?limit=20', token)
  //     .then((data) => setnewReleases(data.albums.limit));
  // }, [])

  useEffect(() => {
    if (token) {
      fetchFromAPI('browse/new-releases?limit=8', token)
        .then((res) => setnewReleases(res.albums.items))
    }
  }, [token])

  return (
    <>
      <Stack style={{ backgroundColor: '#2b0145', height: '100vh' }}>
        <Container style={{ margin: 0, padding: '0 3.3rem' }}>
          <Col style={{ padding: '2.7rem 0' }}>
            <Col style={{
              color: 'white', fontFamily: 'Be Vietnam Pro',
              fontSize: '2rem'
            }}>
              New Releases
            </Col>

            <Col style={{ color: 'white', marginTop: '1.5rem' }}>
              Albums Tabel
            </Col>
          </Col>
        </Container>
      </Stack>
      {console.log(newReleases)}
    </>
  )
}

export default Music