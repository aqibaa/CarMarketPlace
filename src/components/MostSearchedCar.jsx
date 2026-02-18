import React from 'react'
import CarItem from './CarItem'
import { Separator } from './ui/separator';
import CarItemSkeleton from './CarItemSkeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function MostSearchedCar({ carList }) {
  return (
    <div className='mx-14 sm:mx-20 mt-20 mb-20'>
      <Separator></Separator>
      <h2 className='font-bold text-3xl text-center mt-10 mb-7 '>Most Searched Cars</h2>
      <Carousel>
        <CarouselContent>
          {!carList ? (
            [1, 2, 3, 4].map((item, index) => (
              <CarouselItem>
                <CarItemSkeleton key={index} />
              </CarouselItem>
            ))
          ) : (
            carList.map((car, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                <CarItem key={index} car={car} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchedCar