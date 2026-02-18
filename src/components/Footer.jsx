import React from 'react'
import Link from 'next/link'
import { Separator } from './ui/separator'

function Footer() {
    return (
        <footer className="bg-white">
            <Separator className='max-w-350 mx-auto' />
            <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="text-teal-600">
                            <Link href={'/'}>
                                <img src='/logo.svg' width={150} height={100} alt='logo' />
                            </Link>                        </div>

                        <p className="mt-4 max-w-xs text-gray-500">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam
                            molestias.
                        </p>

                        <ul className="mt-8 flex gap-6">
                            <li>
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                    <span className="sr-only">Facebook</span>

                                </a>
                            </li>

                            <li>
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                                    <span className="sr-only">GitHub</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div>
                            <p className="font-medium text-gray-900">Services</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Accounts Review
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        SEO Optimisation
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Accounts Review
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Helpful Links</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Legal</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Accessibility </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Hiring-3 Statistics
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-gray-500">© 2026. Company Name. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
