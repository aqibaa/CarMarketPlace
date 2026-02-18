"use client"
import React, { useEffect, useState } from 'react'
import { CarMakes, Category, FuelType, Transmission, features } from '@/constants/carData'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import UploadImages from '@/components/UploadImages'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { GetListingDetailById, CreateListing, UpdateListing } from '@/utils';


function AddListing() {



    const { user } = useUser();
    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData] = useState([]);
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const recordId = searchParams.get('id');

    useEffect(() => {
        if (mode === 'edit') {
            GetListingDetail();
        }
        else {
            setFormData({});
            setFeaturesData([]);
            setImages([]);
        }
    }, [mode, recordId]);

    const GetListingDetail = async () => {
        setLoader(true);
        const result = await GetListingDetailById(recordId);

        if (result) {
            setFormData(result);
            setFeaturesData(result.features || []);
            setImages(result.images || []);
        }
        setLoader(false);
    }

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFeatureChange = (name, isChecked) => {
        if (isChecked) {
            setFeaturesData(prev => [...prev, name]);
        } else {
            setFeaturesData(prev => prev.filter(item => item !== name));
        }
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (!formData.listingTitle || !formData.sellingPrice || !formData.category || !formData.door) {
            alert("Please fill all required fields (Title, Price, Category, Doors)!");
            setLoader(false);

            return;
        }

        if (mode === 'edit') {
            try {
                const result = await UpdateListing(
                    recordId,
                    formData,
                    featuresData,
                    images
                );

                if (result.success) {
                    console.log("Updated Successfully");
                    toast('Listing Updated Successfully!');
                    setLoader(false);
                    router.push('/profile');
                }
            } catch (error) {
                console.log("Update Error:", error);
                setLoader(false);
            }
        }
        else {

            try {
                const result = await CreateListing(
                    formData,
                    featuresData,
                    images,
                    user?.primaryEmailAddress?.emailAddress,
                    user?.fullName,

                );

                if (result.success) {
                    console.log("SUCCESS! Data Saved", result.id);
                    alert("Listing Created Successfully!");
                    setLoader(false);
                    toast("Once Your Ad Submitted You Directed To Home Page")
                    router.push('/');
                } else {
                    console.log("ERROR", result.error);
                    alert("Error while saving listing");
                    setLoader(false);
                }
            } catch (error) {
                console.log("System Error", error);
                setLoader(false);
            }
        }
    }


    return (
        <div>
            <div className='px-10 md:px-20 my-10'>
                <h2 className='font-bold text-4xl'>Add New Listing</h2>

                <form className='p-10 border rounded-xl mt-10 shadow-md flex flex-col gap-7'>

                    <div>
                        <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Listing Title <span className='text-red-500'>*</span></label>
                                <Input placeholder="Ex. Honda Civic 2024"
                                    defaultValue={formData?.listingTitle || ""}
                                    onChange={(e) => handleInputChange('listingTitle', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Tagline</label>
                                <Input placeholder="Ex. Well Maintained"
                                    defaultValue={formData?.tagline || ""}
                                    onChange={(e) => handleInputChange('tagline', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Original Price</label>
                                <Input type="number"
                                    defaultValue={formData?.originalPrice || ""}
                                    onChange={(e) => handleInputChange('originalPrice', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Selling Price <span className='text-red-500'>*</span></label>
                                <Input type="number"
                                    defaultValue={formData?.sellingPrice || ""}
                                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Category <span className='text-red-500'>*</span></label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.category || ""}
                                    onChange={(e) => handleInputChange('category', e.target.value)}>
                                    <option disabled value="" >Select Category</option>
                                    {Category.map((item, index) => <option key={index}>{item.name}</option>)}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Make <span className='text-red-500'>*</span></label>
                                <select
                                    className='border rounded-md p-2 w-full'
                                    required
                                    value={formData?.make || ""}
                                    onChange={(e) => handleInputChange('make', e.target.value)}
                                >
                                    <option value="" disabled >Select Make</option>
                                    {CarMakes.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Model <span className='text-red-500'>*</span></label>
                                <Input
                                    defaultValue={formData?.model || ""}
                                    onChange={(e) => handleInputChange('model', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Year <span className='text-red-500'>*</span></label>
                                <Input type="number"
                                    defaultValue={formData?.year || ""}
                                    onChange={(e) => handleInputChange('year', e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Mileage <span className='text-red-500'>*</span></label>
                                <Input type="number"
                                    defaultValue={formData?.mileage || ""}
                                    onChange={(e) => handleInputChange('mileage', e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Drive Type</label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.driveType || ""}
                                    onChange={(e) => handleInputChange('driveType', e.target.value)}>
                                    <option value="" disabled>Select Drive-Type</option>
                                    <option>Front-Wheel Drive</option>
                                    <option>Rear-Wheel Drive</option>
                                    <option>All-Wheel Drive</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Transmission <span className='text-red-500'>*</span></label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.transmission || ""}
                                    onChange={(e) => handleInputChange('transmission', e.target.value)}>
                                    <option disabled value="">Select Transmission</option>
                                    {Transmission.map((item, index) => <option key={index}>{item.name}</option>)}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Fuel Type <span className='text-red-500'>*</span></label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.fuelType || ""}
                                    onChange={(e) => handleInputChange('fuelType', e.target.value)}>
                                    <option value="" disabled>Select Fuel-Type</option>
                                    {FuelType.map((item, index) => <option key={index}>{item.name}</option>)}
                                </select>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Condition <span className='text-red-500'>*</span></label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.condition || ""}
                                    onChange={(e) => handleInputChange('condition', e.target.value)}>
                                    <option value="" disabled>Select Condtion</option>
                                    <option>New</option>
                                    <option>Used</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Color <span className='text-red-500'>*</span></label>
                                <Input
                                    defaultValue={formData?.color || ""}
                                    onChange={(e) => handleInputChange('color', e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>No. of Doors <span className='text-red-500'>*</span></label>
                                <select className='border rounded-md p-2 w-full'
                                    value={formData?.door || ""}
                                    onChange={(e) => handleInputChange('door', e.target.value)}>
                                    <option value="" disabled>Select</option>
                                    <option>2</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Cylinders</label>
                                <Input type="number" placeholder="Ex. 4"
                                    defaultValue={formData?.cylinder || ""}
                                    onChange={(e) => handleInputChange('cylinder', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Engine Size</label>
                                <Input placeholder="Ex. 1.8L"
                                    defaultValue={formData?.engineSize || ""}
                                    onChange={(e) => handleInputChange('engineSize', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>VIN</label>
                                <Input
                                    defaultValue={formData?.vin || ""}
                                    onChange={(e) => handleInputChange('vin', e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-slate-500'>Offer Type</label>
                                <Input placeholder="Ex. Cash / Finance"
                                    defaultValue={formData?.offerType || ""}
                                    onChange={(e) => handleInputChange('offerType', e.target.value)} />
                            </div>

                        </div>
                    </div>
                    <Separator className="my-6" />
                    <div className='flex flex-col gap-2'>
                        <label className='text-slate-500'>Description <span className='text-red-500'>*</span></label>
                        <Textarea className="h-28" placeholder="Describe your car..."
                            value={formData?.listingDescription || ""}
                            onChange={(e) => handleInputChange('listingDescription', e.target.value)} />
                    </div>
                    <Separator className="my-6" />
                    <div>
                        <h2 className='font-medium text-xl mb-6'>Features</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {features.map((item, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <Checkbox
                                        onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                                        checked={featuresData?.includes(item.name)} />
                                    <label>{item.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="my-6" />
                    <UploadImages
                        setImages={(value) => setImages(value)}
                        imageList={images}
                    />
                    <div className='flex justify-end mt-10'>
                        <Button type="button" onClick={onSubmit} disabled={loader}>
                            {loader ? 'Saving...' : 'Submit Listing'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddListing