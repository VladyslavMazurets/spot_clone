import React, { useEffect, useContext } from 'react'
import { Button, Stack } from 'react-bootstrap';
import {BsLinkedin, BsGithub, BsTelegram} from 'react-icons/bs'
import {SiGmail} from 'react-icons/si'

import { ImSpotify } from 'react-icons/im';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Context } from '../context';
import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64';


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
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = "https://spot-clone-xi.vercel.app "; //http://localhost:3000
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}&response_type=code
&scope=user-library-read,user-library-modify,user-read-private
&response_type=token`;

function Sidebar() {

  const {code, setCode, setToken, token } = useContext(Context);

  const logout = () => {
    setToken("")
    setCode("")
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("code")
  }

  const getToken = async (code: string) => { 
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
      {
        headers: {
          Authorization: `Basic ${base64_encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res && localStorage.setItem("token", res.data.access_token)
    setToken(res.data.access_token);
    console.log("TOKEN RES", res)//.data.access_token
  }

  useEffect(() => {
    const href: string = window.location.href;
    let codeGet: string = window.localStorage.getItem("code")!;
    window.history.replaceState({}, document.title, document.location.origin);

    if (!codeGet && href) {
      codeGet = href.split("?").find((elem: any) => elem.startsWith("code"))?.split("=")[1]!

      window.history.replaceState({}, document.title, document.location.origin);
      codeGet && window.localStorage.setItem("code", codeGet)
    }
    setCode(codeGet)
  }, [])

  useEffect(() => {
    setToken(localStorage.getItem("token")!)
    if(code && !token)
     getToken(code);
  }, [code])

  return (
    <>
      <Stack className='d-flex flex-row'>
        <div>
          <CDBSidebar backgroundColor="#170124" maxWidth='300px'>
            <CDBSidebarHeader prefix={<i className="fa fa-bars" style={{
              paddingTop: '0.8rem', fontSize: '1.3rem',
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
                  <CDBSidebarMenuItem icon='music' className='hover_sidebar_button'>
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

             <div className='d-flex flex-column justify-content-center mt-5'>
              <Button variant='link' className='fs-5 text-muted hover_sidebar_button'
              onClick={() =>
                window.open('https://www.linkedin.com/in/vladyslav-mazurets-00b9b8257/')}>
                <BsLinkedin /> 
              </Button>
              <Button className='fs-5 text-muted hover_sidebar_button'
               variant='link' href='mailto:vladmazurec@gmail.com' 
              target='_blank'>
                <SiGmail /> 
              </Button>
              <Button className='fs-5 text-muted hover_sidebar_button'
               variant='link' onClick={() => window.open('https://github.com/VladyslavMazurets')}>
                <BsGithub /> 
              </Button>
              <Button variant='link' 
              className='fs-5 text-muted hover_sidebar_button' 
              onClick={() => window.open('https://t.me/Shaman_K1ng')}>
              <BsTelegram /> 
              </Button>
             </div>

            </CDBSidebarContent>
          </CDBSidebar>
        </div>

        <Outlet />

      </Stack>
    </>
  )
}

export default Sidebar