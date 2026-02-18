"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { CreateSendBirdChannel } from '@/utils/Sendbird'

function OwnerDetail({ carDetail }) {

    const { user } = useUser();
    const router = useRouter();

    const isOwner = user?.primaryEmailAddress?.emailAddress === carDetail?.createdBy;

    const OnMessageOwnerButtonClick = async () => {
        if (!user) {
            alert("Please Login to Contact Owner");
            return;
        }

        const userId = user.primaryEmailAddress.emailAddress.split('@')[0];
        const ownerUserId = carDetail?.createdBy.split('@')[0];

        try {
            const channel = await CreateSendBirdChannel(
                [userId, ownerUserId],
                carDetail?.listingTitle,

                carDetail
            );

            if (channel) {
                router.push('/inbox?channel_url=' + channel.url);
            }
        } catch (e) {
            console.log("Error:", e);
        }
    }

    return (
        <div className='p-5 border rounded-xl shadow-md mt-7  '>
            <h2 className='font-medium lg:text-2xl mb-4 text-center'>Owner / Deal Details</h2>

            <div className='flex md:flex-col items-center justify-center gap-4'>
                {user &&

                    <div className="h-8 w-8 sm:h-18 sm:w-18 bg-primary rounded-full flex items-center justify-center text-white font-bold lg:text-xl">
                        {carDetail?.userName?.charAt(0).toUpperCase()} 
                    </div>
                }
                <div className=''>
                    <h2 className='font-bold lg:text-xl text-center'>{carDetail?.userName}</h2>
                    <h2 className=' text-gray-500'>{carDetail?.createdBy}</h2>
                </div>
            </div>

            {!isOwner && (
                <Button
                    className="w-full mt-6"
                    onClick={OnMessageOwnerButtonClick}
                >
                    Message Owner
                </Button>
            )}


            {isOwner && (
                <div className='mt-6 text-center text-gray-400 bg-gray-50 p-2 rounded'>
                    You own this listing
                </div>
            )}
        </div>
    )
}

export default OwnerDetail