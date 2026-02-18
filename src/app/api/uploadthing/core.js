import { createUploadthing } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server"; 

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user || !user.userId) throw new Error("Unauthorized");
       return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
};