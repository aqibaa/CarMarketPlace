import React from 'react'
import Search from './Search'
import Image from 'next/image'
function Hero() {
  return (
    <div>
        <div className='flex flex-col items-center p-10 py-20 gap-6 h-200 w-full bg-[#eef0fc]'>
            <h2 className='text-lg'>Find cars for sale and for rent near you</h2>
            <h2 className=' text-5xl sm:text-[60px] font-bold text-center'>Find Your Dream Car</h2>
            
            <Search />

            <Image 
                src='/tesla.png' 
                alt='car' 
                width={700} 
                height={500} 
                className='mt-15'
            />
        </div>
    </div>
  )
}

export default Hero