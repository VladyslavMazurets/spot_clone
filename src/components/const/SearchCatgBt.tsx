import React from 'react'

import { Stack } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const buttonClass = 'rounded-pill px-3 py-2 text-decoration-none'

const styleButton = {
    background: '#7d02c7', border: 'inherit', color: 'white'
}

const styleActiveButton = {
    background: 'white', color: 'black'
}

function SearchCatgBt() {
    return (
        <>
            <Stack direction='horizontal' gap={2} className='ms-5'>
                <NavLink className={buttonClass} to='/search/all'
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    All
                </NavLink>
                <NavLink to='/search/songs' className={buttonClass}
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    Songs
                </NavLink>
                <NavLink to='/search/artists' className={buttonClass}
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    Artists
                </NavLink>
                <NavLink to='/search/albums' className={buttonClass}
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    Albums
                </NavLink>
                <NavLink to='/search/playlists' className={buttonClass}
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    Playlists
                </NavLink>
                <NavLink to='/search/shows' className={buttonClass}
                    style={({ isActive }) => !isActive ? styleButton : styleActiveButton}>
                    Podcasts & Shows
                </NavLink>
            </Stack>
        </>
    )
}

export default SearchCatgBt