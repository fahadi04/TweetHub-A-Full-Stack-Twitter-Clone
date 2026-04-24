import React from 'react'
import { Grid } from '@mui/material'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'
import RightPart from '../RightPart/RightPart'

function HomePage() {
    return (
        <div container xs={12} className='p-4 flex justify-evenly h-screen border-gray-600'>
            <Grid item xs={12} lg={3} className='hidden lg:block w-[15%] flex items-center relative' >
                <Navigation />
            </Grid>
            <div className='flex flex-col px-5 lg:px-hidden lg:flex-row w-full justify-between overflow-y-auto no-scrollbar'>
                <Grid item xs={12} lg={6} className='hidden lg:block w-[65%] ' >
                    <HomeSection />
                </Grid>
                <Grid item xs={12} lg={3} className='hidden lg:block w-[30%]'>
                    <RightPart />
                </Grid>
            </div>
        </div>
    )
}

export default HomePage