import React from 'react'
import { Stack } from 'react-bootstrap';

import { Triangle } from 'react-loader-spinner';

function Loader() {
    return (
        <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
            <div style={{
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', height: '100vh'
            }}>
                <Triangle color='white' width='140px' height='140px' />
            </div>
        </Stack>
    )
}

export default Loader