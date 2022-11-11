import React from 'react'

import { Triangle } from 'react-loader-spinner';

function Loader() {
    return (
        <div style={{ minHeight: '5vh' }}>
            <div style={{
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', height: '40vh'
            }}>
                <Triangle color='white' width='140px' height='140px' />
            </div>
        </div>
    )
}

export default Loader