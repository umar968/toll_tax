import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeComponent() {
    return (
        <div className='container mx-auto'>
            <Link className='btn btn-primary' to="/entry">Enter a new vehicle</Link>
            <Link className='btn btn-success' to="/exit">Exit a vehicle</Link>
            <Link className='btn btn-info' to="/all-vehicle">See a list of all vehicles</Link>
        </div>
    )
}
