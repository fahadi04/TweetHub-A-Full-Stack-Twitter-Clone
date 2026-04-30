import React from 'react'
import Navigation from '../Navigation/Navigation'
import RightPart from '../RightPart/RightPart'
import './HomePage.css'

function HomePage({ children }) {
    return (
        <div className='homepage-container'>
            {/* Left Sidebar - Navigation */}
            <aside className='sidebar-left'>
                <Navigation />
            </aside>

            {/* Main Content Area */}
            <main className='main-content'>
                {children}
            </main>

            {/* Right Sidebar - Trends & Recommendations */}
            <aside className='sidebar-right'>
                <RightPart />
            </aside>
        </div>
    )
}

export default HomePage
