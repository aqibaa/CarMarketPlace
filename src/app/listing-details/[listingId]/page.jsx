import { db } from '@/configs/db';
import { CarImages, CarListing } from '@/utils/schema';
import { eq, ne } from 'drizzle-orm';
import Specification from '../_components/Specification';
import OwnerDetail from '../_components/OwnerDetail';
import React from 'react'
import DetailHeader from '../_components/DetailHeader';
import ImageGallery from '../_components/ImageGallery';
import Description from '../_components/Description';
import Features from '../_components/Features';
import FinancialCalculator from '../_components/FinancialCalculator';
import MostSearchedCar from '@/components/MostSearchedCar';

async function ListingDetail({ params }) {
    const { listingId } = await params;

    const result = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, listingId)); 

    const carDetail = result[0]?.carListing;
    const images = result.map((item) => item.carImages);

    const finalCarDetail = {
        ...carDetail,
        images: images
    }


    const suggestionResult = await db.select().from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(ne(CarListing.id, listingId))
        .limit(10); 

    const carList = suggestionResult.reduce((acc, item) => {
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

            <div className='p-10 md:px-20'>
                <DetailHeader carDetail={finalCarDetail} />

                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    <div className='md:col-span-2 flex flex-col gap-7'>
                        <ImageGallery carDetail={finalCarDetail} />
                        <Description carDetail={finalCarDetail} />
                        <Features features={finalCarDetail?.features} />
                        <FinancialCalculator carDetail={finalCarDetail} />
                    </div>

                    <div className=''>
                        <div className='border p-5 rounded-xl shadow-md'>
                            <h2 className='text-xl font-bold'>Price</h2>
                            <h2 className='text-3xl font-bold text-primary'>${finalCarDetail?.sellingPrice}</h2>
                        </div>
                        <Specification carDetail={finalCarDetail} />
                        <OwnerDetail carDetail={finalCarDetail} />
                    </div>
                </div>

            </div>
            <div className=''>
                <MostSearchedCar carList={carList} />
            </div>
        </>
    )
}

export default ListingDetail