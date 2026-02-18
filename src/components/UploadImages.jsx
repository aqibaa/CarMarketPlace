"use client"
import { UploadDropzone } from '../utils/uploadthing' 
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

function UploadImages({ setImages, imageList }) {

    const [imageUrls, setImageUrls] = useState([]);

    const handleRemoveImage = (imageToRemove, index) => {
        const result = imageUrls.filter((item) => item !== imageToRemove);
        setImageUrls(result);
        setImages(result);
    }

    useEffect(() => {
        if (imageList) {
            const urls = imageList.map((image) => {
                if (typeof image === 'object' && image.imageUrl) {
                    return image.imageUrl;
                }
                return image;
            });
            setImageUrls(urls);
        }
    }, [imageList])

    return (
        <div>

            <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5'>

                <UploadDropzone

                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {



                        const urls = res.map(file => file.url);


                        setImageUrls((prev) => [...prev, ...urls]);
                        setImages((prev) => [...prev, ...urls]); 

                        alert("Upload Completed");
                    }}
                    onUploadError={(error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 '>
                {imageUrls.map((url, index) => (
                    <div key={index} className='relative'>
                          <Image 
                            src={url} 
                            alt="car" 
                            width={200}
                            height={130}
                            className='w-full h-32 object-cover rounded-xl border' 
                        />
                        <X
                            className='absolute top-2 right-2 cursor-pointer bg-orange-500 rounded-full p-1 text-red-500 hover:bg-red-100 transition-all'
                            size={20}
                            onClick={() => handleRemoveImage(url,index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UploadImages