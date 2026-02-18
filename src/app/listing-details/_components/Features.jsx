import React from 'react'
import { Check } from 'lucide-react'

function Features({ features }) {
    return (
        <div className='p-5 bg-white border shadow-md rounded-xl mt-6'>
            <h2 className='font-medium text-2xl mb-4'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {features && Object.values(features).map((item, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                        <div className='bg-blue-100 p-1 rounded-full text-primary'>
                            <Check className='h-4 w-4' />
                        </div>
                        <h2>{item}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Features