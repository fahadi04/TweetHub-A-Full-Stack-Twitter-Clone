import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TweetComposer from './TweetComposer';
import TweetCard from './TweetCard';
import { useTweets } from '../../hooks/useTweets';
import { LoadingSpinner } from '../Common/LoadingSpinner';

function HomeSection() {
    const {
        tweets,
        isLoading,
        fetchTweets,
        createTweet,
        likeTweet,
        retweet,
        bookmarkTweet,
        deleteTweet,
    } = useTweets();
    const [filter, setFilter] = useState('forYou');
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        fetchTweets();
    }, [fetchTweets]);

    const handleCreateTweet = async (tweetData) => {
        try {
            await createTweet(tweetData);
        } catch (error) {
            console.error('Failed to create tweet:', error);
        }
    };

    const handleReply = (tweet) => {
        setReplyingTo(tweet);
    };

    const handleRetweet = async (tweetId) => {
        await retweet(tweetId);
    };

    const handleLike = async (tweetId) => {
        await likeTweet(tweetId);
    };

    const handleDelete = async (tweetId) => {
        await deleteTweet(tweetId);
    };

    const handleBookmark = async (tweetId) => {
        await bookmarkTweet(tweetId);
    };

    const handleShare = (tweet) => {
        const url = `${window.location.origin}/tweet/${tweet.id}`;
        navigator.clipboard?.writeText(url);
    };

    const visibleTweets = [...tweets].sort((a, b) => {
        if (filter === 'popular') return (b.likes || 0) + (b.retweets || 0) - ((a.likes || 0) + (a.retweets || 0));
        if (filter === 'following') return a.author?.id === 1 ? -1 : 0;
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    return (
        <Box className='timeline-page'>
            {/* Header */}
            <Box className='timeline-header'>
                <Box className='timeline-title-row'>
                    <h2>Home</h2>
                    <span>Live demo feed</span>
                </Box>

                {/* Tabs */}
                <Tabs
                    value={filter}
                    onChange={(e, value) => setFilter(value)}
                    variant='fullWidth'
                >
                    <Tab label='For you' value='forYou' />
                    <Tab label='Popular' value='popular' />
                    <Tab label='Following' value='following' />
                </Tabs>
            </Box>

            {/* Tweet Composer */}
            <TweetComposer onTweetCreated={handleCreateTweet} />

            {/* Tweets Feed */}
            {isLoading ? (
                <LoadingSpinner />
            ) : visibleTweets.length === 0 ? (
                <Box className='empty-state'>
                    <h3>Welcome to TweetHub</h3>
                    <p>Post something to start your timeline.</p>
                </Box>
            ) : (
                visibleTweets.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                        onReply={handleReply}
                        onRetweet={handleRetweet}
                        onLike={handleLike}
                        onDelete={handleDelete}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                    />
                ))
            )}

            {replyingTo && (
                <Box className='reply-toast' onClick={() => setReplyingTo(null)}>
                    Replying to @{replyingTo.author?.username}. Reply composer can be wired to your backend next.
                </Box>
            )}
        </Box>
    );
}

export default HomeSection;
