import React from 'react'

function Contact() {
  return (
    <div className='p-10 flex justify-center items-center flex-col'>
      <h1 className='text-3xl font-bold mb-5'>Contact Us</h1>
      <p className='text-gray-500'>Feel free to reach out to us for any queries.</p>
            <div className='mt-10 w-full max-w-md border p-5 rounded-lg shadow-md'>
        <label className='block mb-2'>Email</label>
        <input type="email" placeholder="Enter your email" className='border w-full p-2 rounded mb-4' />
        
        <label className='block mb-2'>Message</label>
        <textarea placeholder="Your message" className='border w-full p-2 rounded mb-4' />
        
        <button className='bg-blue-800 text-white px-5 py-3 rounded w-full'>Send Message</button>
      </div>
    </div>
  )
}

export default Contact