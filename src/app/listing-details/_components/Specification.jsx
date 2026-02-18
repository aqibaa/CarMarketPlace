import React from 'react'
import {
    CarFront,
    Check,
    CircleDashed,
    Compass,
    CalendarDays,
    Fuel,
    Gauge,
    Grip,
    Tag,
    Zap
} from 'lucide-react'

function Specification({ carDetail }) {
  return (
    <div className='p-5 rosunded-xl border shadow-md mt-7 bg-white'>
        <h2 className='font-medium text-2xl mb-4'>Specifications</h2>
        
        {carDetail ? (
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <CarFront className='h-5 w-5' />
                        <h2>Make</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.make}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <CircleDashed className='h-5 w-5' />
                        <h2>Model</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.model}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <CalendarDays className='h-5 w-5' />
                        <h2>Year</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.year}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <Grip className='h-5 w-5' />
                        <h2>Transmission</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.transmission}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <Fuel className='h-5 w-5' />
                        <h2>Fuel</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.fuelType}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <Gauge className='h-5 w-5' />
                        <h2>Mileage</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.mileage}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <Compass className='h-5 w-5' />
                        <h2>Color</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.color}</h2>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center text-gray-600'>
                        <Check className='h-5 w-5' />
                        <h2>Condition</h2>
                    </div>
                    <h2 className='font-medium'>{carDetail.condition}</h2>
                </div>
            </div>
        ) : (
            <div className='w-full h-50 bg-slate-200 animate-pulse rounded-xl'></div>
        )}
    </div>
  )
}

export default Specification