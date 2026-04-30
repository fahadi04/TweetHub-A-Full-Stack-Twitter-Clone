import React, { useState, useEffect, useCallback } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import TweetCard from '../HomeSection/TweetCard';
import tweetService from '../../services/tweetService';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { mockTweets } from '../../utils/mockData';

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState('recent');

    const fetchBookmarks = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await tweetService.getBookmarkedTweets();
            setBookmarks(data.content || data);
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            setBookmarks(mockTweets.filter((tweet) => tweet.bookmarked));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    return (
        <Box className='timeline-page'>
            {/* Header */}
            <Box className='timeline-header'>
                <Box className='timeline-title-row'>
                    <h2 className='text-xl font-bold'>Bookmarks</h2>
                    <span>Saved posts</span>
                </Box>

                {/* Tabs */}
                <Tabs
                    value={sortBy}
                    onChange={(e, value) => setSortBy(value)}
                    variant='fullWidth'
                >
                    <Tab label='Recent' value='recent' />
                    <Tab label='Popular' value='popular' />
                    <Tab label='Most Liked' value='liked' />
                </Tabs>
            </Box>

            {/* Bookmarks List */}
            {isLoading ? (
                <LoadingSpinner />
            ) : bookmarks.length === 0 ? (
                <Box className='empty-state'>
                    <h3>No bookmarks yet</h3>
                    <p>Tap the bookmark icon on any post to save it here.</p>
                </Box>
            ) : (
                bookmarks.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                        onBookmark={async () => {
                            await tweetService.removeBookmark(tweet.id);
                            setBookmarks(bookmarks.filter((t) => t.id !== tweet.id));
                        }}
                    />
                ))
            )}
        </Box>
    );
}

export default Bookmarks;
