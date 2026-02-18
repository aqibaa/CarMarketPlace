
"use client"
import React from 'react'
import { UserButton, useUser, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { SignOutButton } from '@clerk/nextjs'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet"
import { IoReorderThreeOutline } from "react-icons/io5";
function Header() {

  const { user, isSignedIn } = useUser();



  return (
    <div className='flex justify-between items-center shadow-sm p-5 sticky top-0 z-50 bg-white'>
      <Link href={'/'}>
        <Image src='/logo.svg' width={150} height={100} alt='logo' />
      </Link>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-sm">
              <IoReorderThreeOutline className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" >
            <SheetHeader>
              <SheetTitle>
                <Image src="/logo.svg" width={150} height={100} alt="Logo" />
              </SheetTitle>
            </SheetHeader>
            <div className="">
              {isSignedIn ? (
                <div className="flex flex-col">
                  <div className="flex flex-col justify-center items-center gap-3 border-b pb-4">
                    <img src={user.imageUrl} className='h-15 w-15 rounded-full' alt="User profile" />
                    <div className='text-center'>
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                    </div>
                  </div>

                  <SheetClose asChild className='px-5 mt-5 '>
                    <Link href={'/'}>
                      <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Home</Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild className='px-5 mt-3'>
                    <Link href={'/search'}>
                      <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Search</Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild className='px-5 mt-3'>
                    <Link href={'/search?cars=New'}>
                      <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">New</Button>
                    </Link>
                  </SheetClose >
                  <SheetClose asChild className='px-5 mt-3'>
                    <Link href={'/profile'}>
                      <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">My Listing</Button>
                    </Link>
                  </SheetClose >
                  <SheetClose asChild className='px-5 mt-3'>
                    <Link href={'/add-listing'}>
                      <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Submit Listing</Button>
                    </Link>
                  </SheetClose >
                  <SheetClose asChild className='px-5 mt-3'>
                    <Link href={'/about'}>
                      <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">About Us</Button>
                    </Link>
                  </SheetClose >
                  <SheetClose asChild className='px-5 mt-3 border-b pb-4'>
                    <Link href={'/contact'}>
                      <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Contact Us</Button>
                    </Link>
                  </SheetClose >
                  <SignOutButton>
                    <Button variant="destructive" className="mt-3 w-40 mx-auto">
                      Logout
                    </Button>
                  </SignOutButton>
                </div>
              ) : (
                <div className="text-center border-t">
                  <h2 className='font-bold text-lg mt-4 '>Sign In With Clerk Auth</h2>
                  <p className=" text-gray-500">Sign in to unlock all features.</p>

                  <SignInButton mode="modal" className="mt-2">
                    <Button>Sign In</Button>
                  </SignInButton>

                  <div className='px-5'>
                    <SheetClose asChild className='px-5 mt-5 '>
                      <Link href={'/'}>
                        <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Home</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild className='px-5 mt-3'>
                      <Link href={'/search'}>
                        <Button variant='ghost' className=" w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Search</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild className='px-5 mt-3'>
                      <Link href={'/search?cars=New'}>
                        <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">New</Button>
                      </Link>
                    </SheetClose >
                    <SheetClose asChild className='px-5 mt-3'>
                      <Link href={'/about'}>
                        <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">About Us</Button>
                      </Link>
                    </SheetClose >
                    <SheetClose asChild className='px-5 mt-3 border-b pb-4'>
                      <Link href={'/contact'}>
                        <Button variant='ghost' className="w-full block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-black">Contact Us</Button>
                      </Link>
                    </SheetClose >
                  </div>

                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ul className='max-lg:hidden lg:flex flex-row lg:gap-10'>
        <Link href={'/'}><li className='...'>Home</li></Link>
        <Link href={'/search'}><li className='...'>Search</li></Link>
        <Link href={'/search?cars=New'}><li className='...'>New</li></Link>
        <Link href={'/about'}><li className='...'>About Us</li></Link>
        <Link href={'/contact'}><li className='...'>Contact Us</li></Link>

        {isSignedIn &&
          <Link href={'/profile'}>
            <li className='font-medium hover:text-primary cursor-pointer'>My Listings</li>
          </Link>
        }
      </ul>
      <div className='max-lg:hidden lg:flex flex-row items-center gap-5 '>
        {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <UserButton />
            <Link href={'/add-listing'}>
              <Button>Submit Listing</Button>
            </Link>
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

export default Header