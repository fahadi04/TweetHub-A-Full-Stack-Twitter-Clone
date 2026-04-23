import React from 'react'
import { Grid } from '@mui/material'
import Navigation from '../Navigation/Navigation'
import HomeSection from '../HomeSection/HomeSection'

function HomePage() {
    return (
        <div container xs={12} className='px-5 lg:px-36 flex justify-evenly  h-screen '>
            <Grid item xs={12} lg={3} className='hidden lg:block w-[25%] flex items-center relative border-r border-gray-600' >
                <Navigation />
            </Grid>
            <Grid item xs={12} lg={6} className='hidden lg:block w-full border-r border-gray-600'>
                <HomeSection />
            </Grid>
            <Grid item xs={12} lg={3} className='hidden lg:block w-[30%]'>
                Right Part
            </Grid>
        </div>
    )
}

export default HomePage