import React, { useEffect, useContext } from 'react'
import { Stack } from 'react-bootstrap';

import { ImSpotify } from 'react-icons/im';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Context } from '../context';

const {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBBtn
} = require('cdbreact');

const Active = ({ isActive }: any) => ({ color: isActive ? 'white' : '#656566' })
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "https://spot-clone-xi.vercel.app/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-library-read,user-library-modify&response_type=token`;

function Sidebar() {

  const { token, setToken } = useContext(Context);

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
      <Stack className='d-flex flex-row'>
        <div>
          <CDBSidebar backgroundColor="#170124" maxWidth='300px'>
            <CDBSidebarHeader prefix={<i className="fa fa-bars" style={{
              paddingTop: '0.8rem', fontSize: '1.3rem'
            }} />} >
              <Link to='/' style={{
                textDecoration: 'none', color: 'white',
                display: 'flex', alignItems: 'center'
              }}>
                <ImSpotify style={{ fontSize: '2.8rem', marginRight: '1rem' }} />
                <span style={{ fontSize: '1.5rem', letterSpacing: '0.01rem' }}> SpotClone </span>
              </Link>
            </CDBSidebarHeader>
            <CDBSidebarContent>
              <CDBSidebarMenu style={{ fontSize: '1.2rem' }}>
                <NavLink to="/" style={Active}>
                  <CDBSidebarMenuItem icon='home' className='hover_sidebar_button'>
                    Home
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to='/search' style={Active}>
                  <CDBSidebarMenuItem icon='search' className='hover_sidebar_button'>
                    Search
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to='/library' style={Active}>
                  <CDBSidebarMenuItem icon='music library' className='hover_sidebar_button'>
                    Liked Songs
                  </CDBSidebarMenuItem>
                </NavLink>
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

        <Outlet />

      </Stack>
    </>
  )
}

export default Sidebar