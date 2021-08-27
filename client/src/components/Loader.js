import React from 'react'
import '../loader.css'

const Loader = () => {
    return (
        <div className="w-full h-96 flex flex-col justify-center items-center mt-16">
            <div className="loader loader-1">
                <div className="loader-outter"></div>
                <div className="loader-inner"></div>
            </div>
            <p className="primary-text text-xl">Please Wait</p>
        </div>
    )
}

export default Loader
