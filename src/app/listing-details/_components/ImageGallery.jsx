import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function ImageGallery({ carDetail }) {
  return (
    <div>
        {carDetail?.images?.length > 0 ? (
            <Carousel className="w-full">
                <CarouselContent>
                    {carDetail.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1 ">
                                <Image 
                                    src={image.imageUrl} 
                                    alt="car-image"
                                    width={800}
                                    height={500}
                                    className='w-full object-cover rounded-xl'
                                    priority={index === 0} 
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {carDetail.images.length > 1 && (
                    <>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </>
                )}
            </Carousel>
        ) : (
            <div className='w-full h-125 bg-slate-200 rounded-xl animate-pulse flex items-center justify-center text-gray-500'>
                No Image Available
            </div>
        )}
    </div>
  )
}

export default ImageGallery