import React from 'react'
import { Link } from 'react-router-dom'

const Not_Found = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-center'>
            <h1 className='text-6xl font-bold gradient-title mb-4'>404</h1>
            <h2 className='text-2xl font-semibold mb-4'>Page Note Found</h2>
            <p className='text-gray-600 mb-8'>Oops! The page you&apos;re looking for doesn&apos;t exits or has been moved</p>
            <Link href="/">
                <button>Return Home</button>
            </Link>
        </div>
    )
}

export default Not_Found