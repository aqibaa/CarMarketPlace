import React from 'react'
import { CalendarDays, Gauge, Fuel, Grip } from 'lucide-react'

function DetailHeader({ carDetail }) {
    return (

        <div>
            {carDetail?.listingTitle ? (
                <div>
                    <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
                    <p className='text-sm text-gray-500 mt-2'>{carDetail?.tagline}</p>

                    <div className='flex flex-wrap gap-2 mt-3'>
                        <div className='flex gap-2 items-center bg-blue-50 border border-blue-200 p-1 px-3 rounded-full text-primary text-sm'>
                            <CalendarDays className='h-4 w-4' />
                            <p>{carDetail?.year}</p>
                        </div>
                        <div className='flex gap-2 items-center bg-blue-50 border border-blue-200 p-1 px-3 rounded-full text-primary text-sm'>
                            <Gauge className='h-4 w-4' />
                            <p>{carDetail?.mileage} Miles</p>
                        </div>
                        <div className='flex gap-2 items-center bg-blue-50 border border-blue-200 p-1 px-3 rounded-full text-primary text-sm'>
                            <Grip className='h-4 w-4' />
                            <p>{carDetail?.transmission}</p>
                        </div>
                        <div className='flex gap-2 items-center bg-blue-50 border border-blue-200 p-1 px-3 rounded-full text-primary text-sm'>
                            <Fuel className='h-4 w-4' />
                            <p>{carDetail?.fuelType}</p>
                        </div>
                    </div>
                </div>) :

                (<div className='w-full rounded-xl h-25 bg-slate-200 animate-pulse'>

                </div>)}


        </div>
    )
}

export default DetailHeader