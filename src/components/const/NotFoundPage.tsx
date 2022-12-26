import React from 'react'
import SearchCatgBt from './SearchCatgBt'

interface INotFound {
    state: any
}

function NotFoundPage({ state }: INotFound) {
    return (
        <>
            <SearchCatgBt />
            <div className='text-white d-flex flex-column justify-content-end 
    align-items-center h-50'>
                <span className='fs-3 fw-bold'>
                    No results found for "{state}"
                </span>
                <span className='fs-5 mt-2'>
                    Please make sure your words are spelled correctly or use less or different keywords.
                </span>
            </div>
        </>
    )
}

export default NotFoundPage