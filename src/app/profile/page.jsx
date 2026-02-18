"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { GetUserListings } from '@/utils'
import CarItem from '@/components/CarItem'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { DeleteListing } from '@/utils'
import { toast } from 'sonner'
import CarItemSkeleton from '@/components/CarItemSkeleton'
import { Separator } from '@/components/ui/separator'
import { MdEdit } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from '../inbox/page'
import Link from 'next/link'


function Profile() {

    const { user } = useUser();
    const [userListings, setUserListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            GetUserListingData();
        }
    }, [user]);

    const GetUserListingData = async () => {
        const result = await GetUserListings(user?.primaryEmailAddress?.emailAddress);
        setUserListings(result);
        setLoading(false);
    }

    const handleDelete = async (carId) => {
        const confirmation = confirm("Are you sure you want to delete this listing?");

        if (confirmation) {
            setLoading(true);
            const result = await DeleteListing(carId);

            if (result) {
                toast('Listing Deleted Successfully!');
                setUserListings(prev => prev.filter(item => item.id !== carId));
            }
            setLoading(false);
        }
    }


    return (
        <>
            <div className='px-10 md:px-20 my-10'>
                <Tabs defaultValue="my-listing" className='w-full'>
                    <TabsList className='w-auto md:w-100'>
                        <TabsTrigger value="my-listing">My Listing</TabsTrigger>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-listing" className='w-full'>
                        <p className='text-2xl font-bold p-5'>My Listing</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                            {loading ? (
                                [1, 2, 3, 4].map((item, index) => (
                                    <CarItemSkeleton key={index} />
                                ))
                            )
                                : userListings.length > 0 ? (
                                    userListings.map((item, index) => (
                                        <div key={index}>
                                            <CarItem car={item} />
                                            <div className='p-2 bg-gray-50 rounded-lg flex justify-between w-full mt-2'>
                                                <Button
                                                    variant="destructive"
                                                    className="bg-red-500 text-white h-8 w-8 p-1"
                                                    onClick={() => handleDelete(item?.id)}
                                                >
                                                    <Trash className='w-4 h-4' />
                                                </Button>
                                                <h2 className='text-gray-500 text-sm'>
                                                    Posted on: {item?.postedOn}
                                                </h2>
                                                <Link href={'add-listing?mode=edit&id=' + item?.id}>
                                                    <Button
                                                        className="bg-gray-600 text-white h-8 w-8 p-1"

                                                    >
                                                        <MdEdit className='w-4 h-4' />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='col-span-4 text-center text-gray-500'>You haven't uploaded any cars yet.</p>
                                )}

                        </div>


                    </TabsContent>
                    <TabsContent value="inbox">
                        <Inbox />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Profile