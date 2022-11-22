import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap';

import { Triangle } from 'react-loader-spinner';
import { Context } from '../context';

function Loader() {

    const { token } = useContext(Context);

    return (
        <>
            <Stack style={{ backgroundColor: '#1a0229', minHeight: '100vh', color: 'white' }}>
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', height: '100vh'
                }}>
                    {token ?
                        <Triangle color='white' width='140px' height='140px' />
                        :
                        <div className='d-flex flex-column align-items-center'>
                            <Triangle color='white' width='140px' height='140px' />
                            <span className="mt-5 fs-4 text-capitalize fw-bolder">
                                Please login in your Spotify account
                            </span>
                        </div>
                    }
                </div>
            </Stack>
        </>
    )
}

export default Loader