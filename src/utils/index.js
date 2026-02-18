import { db } from "@/configs/db";
import { CarListing, CarImages } from "./schema";
import { eq, desc } from "drizzle-orm";


export const CreateListing = async (formValues, features, imageUrls, userEmail, userName) => {

  try {
    //Car Details
    const result = await db.insert(CarListing).values({
      listingTitle: formValues.listingTitle,
      tagline: formValues.tagline,
      originalPrice: formValues.originalPrice,
      sellingPrice: formValues.sellingPrice,
      category: formValues.category,
      condition: formValues.condition,
      make: formValues.make,
      model: formValues.model,
      year: formValues.year,
      driveType: formValues.driveType,
      transmission: formValues.transmission,
      fuelType: formValues.fuelType,
      mileage: formValues.mileage,
      engineSize: formValues.engineSize,
      cylinder: formValues.cylinder,
      color: formValues.color,
      door: formValues.door,
      offerType: formValues.offerType,
      listingDescription: formValues.listingDescription,
      features: features,
      createdBy: userEmail,
      userName: userName,
      postedOn: new Date().toLocaleDateString()
    }).returning({ id: CarListing.id });

    if (result) {

      for (const imageUrl of imageUrls) {
        await db.insert(CarImages).values({
          imageUrl: imageUrl,
          carListingId: result[0].id
        });
      }
    }
    return { success: true, id: result[0].id };

  } catch (e) {
    console.log("Error Saving Listing:", e);
    return { success: false, error: e };
  }
};


export const GetUserListings = async (userEmail) => {
  const result = await db.select().from(CarListing)
    .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .where(eq(CarListing.createdBy, userEmail))
    .orderBy(desc(CarListing.id));

  const resp = result.reduce((acc, item) => {
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

  return resp;
};



export const GetListingDetailById = async (id) => {
  const result = await db.select().from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .where(eq(CarListing.id, id));

  const carDetail = result[0]?.carListing;
  const images = result.map((item) => item.carImages);

  const finalCarDetail = {
    ...carDetail,
    images: images
  }

  return finalCarDetail;
}

//DELETE 
export const DeleteListing = async (carId) => {
  const result = await db.delete(CarListing)
    .where(eq(CarListing.id, carId))
    .returning();

  return result;
}


//Edit
export const UpdateListing = async (carId, formValues, features, imageUrls) => {

  const updateResult = await db.update(CarListing).set({
    ...formValues,
    features: features
  }).where(eq(CarListing.id, carId)).returning();

  if (updateResult) {
    await db.delete(CarImages).where(eq(CarImages.carListingId, carId));
    for (const item of imageUrls) {
      const finalImageUrl = typeof item === 'string' ? item : item?.imageUrl;

      if (finalImageUrl) {
        await db.insert(CarImages).values({
          imageUrl: finalImageUrl,
          carListingId: carId
        });
      }
    }
  }

  return { success: true };
}