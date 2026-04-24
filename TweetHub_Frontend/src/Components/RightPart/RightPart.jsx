import React from 'react'
import SearchIcon from '@mui/icons-material/SearchSharp';
import BrightnessIcon from '@mui/icons-material/Brightness4Sharp';
import CloseIcon from '@mui/icons-material/CloseSharp';
// import MoreHorizIcon from '@mui/icons-material/MoreHorizSharp';
import TrendMenu from "./TrendMenu"
import { Avatar } from '@mui/material';
function RightPart() {

    const handleChangeTheme = () => {
        console.log("handle change theme");

    }

    const handleCloseNews = () => {
        console.log("handle close news");
    }


    const handleOpen = () => {
        console.log("handle open");
    }

    return (
        <div className='py-3 sticky top-0'>

            <div className='relative flex items-center border-gray-600 mb-5 rounded-full bg-gray-100 w-auto mr-5'>
                <input type="text" placeholder="Search"
                    className='py-3 rounded-full text-gray-500 w-full font-bold text-2xl pl-12' />
                <div className='absolute top-0 left-0 pl-3 pt-3 '>
                    <SearchIcon className='text-gray-500 font-bold text-2xl' />
                </div>
                {/* <BrightnessIcon className='absolute top-0 right-0  cursor-pointer pr-3 pt-3 text-gray-500' onClick={handleChangeTheme} /> */}
            </div>

            <section className='my-8 border-gray-600 p-4 rounded-lg bg-gray-100 w-auto mr-5'>
                <div className='flex justify-between items-center font-bold mb-4'>
                    <h1 className='text-lg'>Subscribe to Premium</h1>
                    <p className='bg-green-200 rounded-full p-2 '>50% off</p>
                </div>
                <p className='text-gray-600 text-md mb-6 font-medium'>
                    Get rid of ads, see your analytics, boost your replies and unlock 20+ features.
                </p>
                <button className='bg-blue-500 text-white py-2 px-4 cursor-pointer font-bold text-lg rounded-full hover:bg-blue-600'>
                    Subscribe
                </button>
            </section>

            <section className='mt-7 border-gray-600 p-4 rounded-lg bg-gray-100 mr-5 relative'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-xl font-extrabold'>Today's News</h1>
                    <CloseIcon
                        className='cursor-pointer text-gray-500 hover:bg-gray-200 rounded-full p-1 transition-colors'
                        onClick={handleCloseNews}
                    />
                </div>

                <div className="space-y-6">
                    {[1, 1, 1].map((_, index) => (
                        <div key={index} className='group cursor-pointer'>
                            <h2 className='text-xl font-bold leading-5 '>
                                RBI Cancels Paytm Payments Bank Licence, Orders Winding Up
                            </h2>

                            <div className='flex items-center space-x-4 mt-2 w-full'>
                                <Avatar sx={{ width: 50, height: 50 }} />
                                <div className='flex items-center justify-between p-2 pace-x-2 text-lg font-medium text-gray-500'>
                                    <div>
                                        <p className="font-medium">6 hours ago</p>
                                    </div>
                                    <div>
                                        <p>News · <span>3,708 posts</span></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            <section className='mt-7 space-y-5 border-gray-600 p-4 rounded-lg bg-gray-100 mr-5 relative'>
                <div className='flex flex-col items-start justify-between mt-5'>
                    <h1 className='text-3xl mb-3 font-bold'>What's happening</h1>
                    <div className='flex justify-between w-full mb-4'>
                        <div>
                            <p className='text-xl font-medium'>Technology.Trending</p>
                            <h1 className='font-bold text-2xl'>8000 mAh</h1>
                        </div>
                        {/* <MoreHorizIcon className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={handleOpen} /> */}
                        <TrendMenu />
                    </div>
                    <div className='flex justify-between w-full mb-4'>
                        <div>
                            <p className='text-xl font-medium'>Politics.Trending</p>
                            <h1 className='font-bold text-2xl'>Didi</h1>
                        </div>
                        {/* <MoreHorizIcon className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={handleOpen} /> */}
                        <TrendMenu />
                    </div>
                    <div className='flex justify-between w-full mb-2'>
                        <div>
                            <p className='text-xl font-medium'>Entertainment.Trending</p>
                            <h1 className='font-bold text-2xl'># <span>Salman Khan</span></h1>
                            <p className='text-gray-500 text-lg font-medium mt-1'>
                                Trending with <span className='text-blue-400  cursor-pointer'>Human Being</span>
                            </p>
                        </div>
                        {/* <MoreHorizIcon className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={handleOpen} /> */}
                        <TrendMenu />
                    </div>
                    <p className='text-blue-500 font-bold hover:text-blue-700 cursor-pointer mt-5' onClick={handleOpen}>Show more</p>
                </div>
            </section>

            <section className='mt-7 space-y-5 border-gray-600 p-4 rounded-lg bg-gray-100 mr-5 relative'>
                <div className='flex flex-col items-start justify-between mt-5 mb-4'>
                    <h1 className='text-3xl font-bold'>Who to follow</h1>

                    <p className='text-blue-500 font-bold hover:text-blue-700 cursor-pointer' onClick={handleOpen}>Show more</p>
                </div>
            </section>

            <div className='mt-5 mb-4 px-4 text-gray-500 text-md font-medium'>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                    <a href="#" className="hover:underline">Terms of Service</a> <p>|</p>
                    <a href="#" className="hover:underline">Privacy Policy</a> <p>|</p>
                    <a href="#" className="hover:underline">Cookie Policy</a> <p>|</p>
                    <a href="#" className="hover:underline">Accessibility</a><p>|</p>
                    <a href="#" className="hover:underline">Ads Info</a><p>|</p>
                    <span className="hover:underline cursor-pointer">More...</span>
                    <span>&copy; 2026 TweetHub</span>
                </div>
            </div>
        </div>
    )
}

export default RightPart