import React from 'react';
import { Box } from '@mui/material';

function FeaturePage({ title, subtitle, children }) {
    return (
        <Box className='timeline-page'>
            <Box className='timeline-header'>
                <Box className='timeline-title-row'>
                    <h2>{title}</h2>
                    <span>{subtitle}</span>
                </Box>
            </Box>

            <section className='empty-state'>
                <h3>{title} is ready for your backend</h3>
                <p>{children}</p>
            </section>
        </Box>
    );
}

export default FeaturePage;
