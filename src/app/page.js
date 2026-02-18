import Hero from "@/components/Hero";
import MostSearchedCar from "@/components/MostSearchedCar";
import { db } from "@/configs/db";
import { CarImages, CarListing } from "@/utils/schema";
import CategorySearch from "@/components/Category";
import { desc, eq } from "drizzle-orm";

export default async function Home() {

  const carList = await db.select()
    .from(CarListing)
    .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .orderBy(desc(CarListing.id))
    .limit(10);
  const result = carList.reduce((acc, item) => {
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
    <div>
      <Hero />
      <CategorySearch />
      <MostSearchedCar carList={result} />
    </div>
  );
}
