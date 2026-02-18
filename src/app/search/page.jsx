import React,{Suspense} from 'react'
import { db } from '@/configs/db';
import { CarImages, CarListing } from '@/utils/schema';
import { eq, and } from 'drizzle-orm';
import CarItem from '@/components/CarItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function Searching({ searchParams }) {

    const params = await searchParams;

    const condition = params.cars;
    const make = params.make;
    const price = params.price;
    const category = params.category;


    const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(and(
            condition ? eq(CarListing.condition, condition) : undefined,
            make ? eq(CarListing.make, make) : undefined,
            category ? eq(CarListing.category, category) : undefined
        ));

    const carList = result.reduce((acc, item) => {
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

    return (
        <>
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
                        <div className='col-span-4 flex flex-col items-center justify-center mt-10 py-20 bg-gray-50 rounded-xl border border-dashed'>
                            <h2 className='text-3xl font-bold text-gray-400'>No Results Found</h2>
                            <p className='text-gray-400 mt-2'>Try adjusting your search filters (e.g., Make, Price)</p>

                            <Link href="/">
                                <Button className="mt-5 bg-gray-600">Clear All Filters</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Searching />
    </Suspense>
  )
}

export default Search