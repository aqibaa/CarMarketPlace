import React from 'react'
import { db } from '@/configs/db';
import { CarImages, CarListing } from '@/utils/schema';
import { eq, and, desc } from 'drizzle-orm';
import CarItem from '@/components/CarItem';

export const dynamic = "force-dynamic";

async function Search({ searchParams }) {
  
  const params = await searchParams;
  
  const condition = params?.cars;
  const make = params?.make;
  const price = params?.price;
  const category = params?.category;

  let carList = [];

  try {
      const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(and(
            condition ? eq(CarListing.condition, condition) : undefined,
            make ? eq(CarListing.make, make) : undefined,
            category ? eq(CarListing.category, category) : undefined
        ))
        .orderBy(desc(CarListing.id));

      carList = result.reduce((acc, item) => {
        const listing = item.carListing;
        const image = item.carImages;
        const existingListing = acc.find(l => l.id === listing.id);
        if (existingListing) {
            existingListing.images.push(image);
        } else {
            listing.images = image ? [image] : [];
            acc.push(listing);
        }
        return acc;
      }, []);

  } catch (error) {
      console.log(" Database Error:", error);
  }

  return (
    <div>
]        
        <div className='p-16 bg-[#eef0fc] flex justify-center'>
            <h2 className='font-bold text-3xl text-center'>
                Search Results For: {make ? make : 'All Cars'}
            </h2>
        </div>

        <div className='p-10 md:px-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-7'>
                {carList.length > 0 ? carList.map((car, index) => (
                    <CarItem key={index} car={car} />
                )) : (
                    <div className='col-span-4 text-center mt-10'>
                        <h2 className='text-xl text-gray-500 font-bold'>No Cars Found</h2>
                        <p className='text-gray-400'>
                           Try changing filters or check database connection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search