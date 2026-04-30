import React, { useState, useEffect, useRef } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ReportIcon from '@mui/icons-material/Report';
import BlockIcon from '@mui/icons-material/Block';
import CopyAllIcon from '@mui/icons-material/CopyAll';

const TrendMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const options = [
        { label: "Not interested in this", icon: <SentimentDissatisfiedIcon fontSize="small" /> },
        { label: "The associated content is not relevant", icon: <SentimentDissatisfiedIcon fontSize="small" /> },
        { label: "This trend is spam", icon: <ReportIcon fontSize="small" /> },
        { label: "This trend is abusive or harmful", icon: <BlockIcon fontSize="small" /> },
        { label: "This trend is a duplicate", icon: <CopyAllIcon fontSize="small" /> },
        { label: "This trend is harmful or spammy", icon: <ReportIcon fontSize="small" /> },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <MoreHorizIcon
                className='text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-colors p-1'
                onClick={(e) => {
                    e.stopPropagation(); 
                    setIsOpen(!isOpen);
                }}
            />

            {isOpen && (
                <div className='absolute right-0 top-0 mt-8 w-72 bg-white shadow-2xl border border-gray-100 rounded-xl py-2 z-[999] overflow-hidden'>
                    {options.map((opt, index) => (
                        <div
                            key={index}
                            className='flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700'
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log(opt.label);
                                setIsOpen(false);
                            }}
                        >
                            <span className="text-gray-500">{opt.icon}</span>
                            <span className="text-lg font-bold">{opt.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendMenu;