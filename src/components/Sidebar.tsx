import React, { useEffect, useContext } from 'react'

import { ImSpotify } from 'react-icons/im';
import { Context } from '../context';

const {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBBtn
} = require('cdbreact');

function Sidebar() {

  const { token, setToken } = useContext(Context);

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

  const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  useEffect(() => {
    const hash: string = window.location.hash!;
    let token: string = window.localStorage.getItem("token")!;

    if (!token && hash) {
      token = hash.substring(1).split("&").find((elem: any) => elem.startsWith("access_token"))?.split("=")[1]!

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  return (
    <>
    <div>
      <CDBSidebar backgroundColor="#170124" maxWidth='350px' fixed>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" style={{
          paddingTop: '0.8rem', fontSize: '1.3rem'
        }} />} >
          <div style={{
            display: 'flex', alignItems: 'center', margin: 0,
            padding: 0
          }}>
            <ImSpotify style={{ fontSize: '2.8rem', marginRight: '1rem' }} />
            <span style={{ fontSize: '1.5rem' }}> Spot Clone </span>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu style={{ fontSize: '1.2rem' }}>
            <CDBSidebarMenuItem icon='home'>
              Home
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon='search'>
              Search
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon='music library'>
              Your Library
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>

          <CDBSidebarMenu style={{
            display: 'flex',
            flexDirection: 'column', alignItems: 'center'
          }}>
            <CDBSidebarMenuItem>
              {!token ?
                <CDBBtn color="success" circle size="large" style={{
                  textDecoration: 'none', fontWeight: 'bold',
                  marginLeft: '0.5rem', padding: '0.5rem 2.5rem',
                  marginRight: '1.5rem', borderColor: 'transparent'
                }}
                  href={loginURL}>
                  Login  Spotify
                </CDBBtn >
                :
                <CDBBtn color="danger" circle size="large" style={{
                  fontWeight: 'bold', borderColor: 'transparent',
                  marginLeft: '0.5rem', padding: '0.5rem 3rem',
                  marginRight: '2rem'
                }}
                  onClick={logout}>
                  Logout
                </CDBBtn >
              }
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      </div>
    </>
  )
}

export default Sidebar