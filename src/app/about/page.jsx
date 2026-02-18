import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <div>
      
        
        <div className='px-10 md:px-20 py-10'>
            <div className='flex flex-col items-center text-center gap-4'>
                <h2 className='text-4xl font-bold text-primary'>About Us</h2>
                <p className='text-gray-500 max-w-2xl'>
                    We are the leading car marketplace dedicated to connecting buyers and sellers seamlessly. 
                    Our mission is to provide a transparent, secure, and user-friendly platform for all your automotive needs.
                </p>
            </div>

            <div className='my-10 flex justify-center'>
                <Image 
                    src='/tesla.png' 
                    alt="About Us" 
                    width={600} 
                    height={400} 
                    className='rounded-xl object-cover'
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 text-center'>
                <div className='p-6 border rounded-xl shadow-sm hover:shadow-md transition-all'>
                    <h2 className='text-3xl font-bold text-primary'>5000+</h2>
                    <p className='text-gray-500 mt-2'>Cars Listed</p>
                </div>
                <div className='p-6 border rounded-xl shadow-sm hover:shadow-md transition-all'>
                    <h2 className='text-3xl font-bold text-primary'>200+</h2>
                    <p className='text-gray-500 mt-2'>Trusted Sellers</p>
                </div>
                <div className='p-6 border rounded-xl shadow-sm hover:shadow-md transition-all'>
                    <h2 className='text-3xl font-bold text-primary'>24/7</h2>
                    <p className='text-gray-500 mt-2'>Support Available</p>
                </div>
            </div>

            <div className='mt-20 space-y-5'>
                <h3 className='text-2xl font-bold'>Who We Are</h3>
                <p className='text-gray-600 leading-7'>
                    Car Marketplace was founded with a simple idea: buying and selling cars should be easy. 
                    We leverage modern technology to verify listings, enable real-time chat between parties, 
                    and ensure that every transaction is as smooth as possible. Whether you are looking for 
                    a brand new SUV or a reliable used sedan, we have got you covered.
                </p>
            </div>
        </div>
    </div>
  )
}

export default About