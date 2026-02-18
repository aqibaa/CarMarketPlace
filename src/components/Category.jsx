import { Category } from '@/constants/carData'
import Link from 'next/link'
import React from 'react'

function CategorySearch() {
  return (
    <div className='mt-24'>
        <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>
        
        <div className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
            {Category.map((item, index) => (
                <Link href={'/search?category=' + item.name} key={index} className='group'>
                    <div className='border rounded-xl p-3 items-center flex flex-col hover:shadow-md cursor-pointer hover:bg-blue-50 transition-all'>
                        <img src={item.icon} width={35} height={35} alt={item.name} />
                        <h2 className='mt-2 text-sm group-hover:text-primary'>{item.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategorySearch