import React, { useState, useContext, useEffect } from 'react'
import { Stack } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function Section() {

    const { id } = useParams();

  return (
    <>
    <Stack style={{ backgroundColor: '#1a0229' }}>
    </Stack>
    </>
  )
}

export default Section