import React, { useState } from 'react';
import { Box, TextField, Tab, Tabs, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import userService from '../../services/userService';
import { Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { followSuggestions, trends } from '../../utils/mockData';

function Explore() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('trending');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            if (filter === 'users') {
                const data = await userService.searchUsers(query);
                setResults(data.content || data);
            } else {
                setResults(
                    trends.filter((trend) =>
                        trend.title.toLowerCase().includes(query.toLowerCase()),
                    ),
                );
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults(
                filter === 'users'
                    ? followSuggestions.filter((person) =>
                        `${person.name} ${person.username}`.toLowerCase().includes(query.toLowerCase()),
                    )
                    : trends.filter((trend) =>
                        trend.title.toLowerCase().includes(query.toLowerCase()),
                    ),
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box className='timeline-page'>
            {/* Header */}
            <Box className='timeline-header explore-header'>
                <Box className='flex items-center bg-gray-100 rounded-full px-4 py-2'>
                    <SearchIcon className='text-gray-500' />
                    <TextField
                        fullWidth
                        variant='standard'
                        placeholder='Search users, tweets...'
                        InputProps={{ disableUnderline: true }}
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        className='ml-3'
                    />
                </Box>
            </Box>

            {/* Tabs */}
            <Tabs
                value={filter}
                onChange={(e, value) => setFilter(value)}
                variant='fullWidth'
            >
                <Tab label='Trending' value='trending' />
                <Tab label='Users' value='users' />
                <Tab label='Hashtags' value='hashtags' />
            </Tabs>

            {/* Results */}
            <Box>
                {isLoading && (
                    <Box display='flex' justifyContent='center' p={4}>
                        <CircularProgress />
                    </Box>
                )}

                {!isLoading && searchQuery && results.length === 0 && (
                    <Box p={4} textAlign='center' color='gray'>
                        <Typography>No results found</Typography>
                    </Box>
                )}

                {!isLoading && !searchQuery && filter === 'trending' && (
                    <Box className='trend-stack'>
                        {trends.map((trend) => (
                            <article className='discover-card' key={trend.title}>
                                <span>{trend.category}</span>
                                <strong>{trend.title}</strong>
                                <p>{trend.count}</p>
                            </article>
                        ))}
                    </Box>
                )}

                {!isLoading && !searchQuery && filter === 'users' && (
                    <Box>
                        {followSuggestions.map((person) => (
                            <Box
                                key={person.id}
                                p={4}
                                borderBottom='1px solid var(--border-color)'
                                className='hover:bg-gray-50 cursor-pointer transition'
                                onClick={() => navigate(`/profile/${person.id}`)}
                            >
                                <Box display='flex' gap={3}>
                                    <Avatar src={person.avatar} alt={person.name} />
                                    <Box flex={1}>
                                        <Typography variant='subtitle1' className='font-bold'>
                                            {person.name}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary'>
                                            @{person.username}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {!isLoading && filter !== 'users' && searchQuery && results.map((trend) => (
                    <article className='discover-card' key={trend.title}>
                        <span>{trend.category}</span>
                        <strong>{trend.title}</strong>
                        <p>{trend.count}</p>
                    </article>
                ))}

                {!isLoading && filter === 'users' && results.map((result) => (
                    <Box
                        key={result.id}
                        p={4}
                        borderBottom='1px solid var(--border-color)'
                        className='hover:bg-gray-50 cursor-pointer transition'
                        onClick={() => navigate(`/profile/${result.id}`)}
                    >
                        <Box display='flex' gap={3}>
                            <Avatar src={result.avatar} alt={result.name} />
                            <Box flex={1}>
                                <Typography variant='subtitle1' className='font-bold'>
                                    {result.name}
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    @{result.username}
                                </Typography>
                                <Typography variant='body2' className='mt-2'>
                                    {result.bio}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default Explore;
