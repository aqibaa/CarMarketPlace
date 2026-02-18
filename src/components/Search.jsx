"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CiSearch } from "react-icons/ci"; // Using React Icons
import { CarMakes, Pricing } from '@/constants/carData'; // Data constants import karein
import Link from 'next/link'; // Navigation ke liye

function Search() {

    const [cars, setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();


    return (
        <div className=' mt-5 p-5 bg-white max-md:rounded-md md:rounded-full max-md:flex-col w-75 md:flex md:flex-row gap-10 px-5 items-center md:w-auto'>

            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className="outline-none mb-2 md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className=" max-md:hidden md:block h-5" />

            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className="outline-none mb-2  md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Car Makes" />
                </SelectTrigger>
                <SelectContent>
                    {CarMakes.map((maker, index) => (
                        <SelectItem key={index} value={maker.name}>{maker.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Separator orientation="vertical" className=" max-md:hidden md:block h-5" />

            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className="outline-none mb-2 md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing Optional" />
                </SelectTrigger>
                <SelectContent>
                    {Pricing.map((price, index) => (
                        <SelectItem key={index} value={price.amount}>{price.amount}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Link href={'/search?cars=' + cars + '&make=' + make + '&price=' + price}>

                <div className='max-md:hidden transition-all hover:scale-105 cursor-pointer'>
                    <CiSearch className='text-[50px] bg-primary rounded-full p-3 text-white' />

                </div>

                <div className='max-md:block md:hidden w-full'>
                    <button className='bg-primary text-white w-full py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2'>
                        Search
                    </button>
                </div>

            </Link>

        </div>
    )
}

export default Search