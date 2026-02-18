import React from 'react'
import { Fuel, Gauge, Grip } from 'lucide-react' 
import { Separator } from './ui/separator'
import { HiExternalLink } from "react-icons/hi";
import Link from 'next/link'


function CarItem({ car }) {
    return (
        <Link href={'/listing-details/' + car?.id}>
            <div className='rounded-xl bg-white border hover:shadow-md cursor-pointer pb-4'>
                <h2 className='absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white pb-1'>{car?.condition}</h2>
                <img
                    src={car?.images[0]?.imageUrl || 'no image avaible'}
                    width={300}
                    height={250}
                    alt={car?.listingTitle}
                    className='rounded-t-xl object-cover w-full'
                />
                <div className='p-4'>
                    <h2 className='font-bold text-black text-lg mb-2'>{car?.listingTitle}</h2>
                    <Separator className="my-2" />
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <Gauge className='w-4 h-4' />
                            <h2>{car?.mileage} Miles</h2>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <Fuel className='w-4 h-4' />
                            <h2>{car?.fuelType}</h2>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <Grip className='w-4 h-4' />
                            <h2>{car?.transmission}</h2>
                        </div>
                    </div>
                    <Separator className="my-2" />
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>${car?.sellingPrice}</h2>
                        <div className='flex gap-2 items-center text-blue-400 hover:text-blue-500'>
                            <h2 className='text-sm '>View Detail</h2>
                            <span><HiExternalLink /></span>
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default CarItem