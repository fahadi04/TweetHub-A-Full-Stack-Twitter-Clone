import React, { useState } from 'react';
import {
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BlockIcon from '@mui/icons-material/Block';
import Report from '@mui/icons-material/Flag';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import BarChartIcon from '@mui/icons-material/BarChart';
import { formatRelativeTime, formatNumber } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';

const TweetCard = ({
    tweet,
    onReply,
    onRetweet,
    onLike,
    onDelete,
    onBookmark,
    onShare,
}) => {
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [likes, setLikes] = useState(tweet.likes);
    const [retweets, setRetweets] = useState(tweet.retweets);
    const [bookmarked, setBookmarked] = useState(tweet.bookmarked);
    const [liked, setLiked] = useState(tweet.liked);
    const [retweeted, setRetweeted] = useState(tweet.retweeted);

    const isOwnTweet = currentUser?.id === tweet.author.id;

    const handleMoreClick = (event) => setAnchorEl(event.currentTarget);
    const handleMoreClose = () => setAnchorEl(null);

    const handleLike = async () => {
        try {
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
            await onLike?.(tweet.id);
        } catch (error) {
            setLiked(!liked);
            setLikes(liked ? likes + 1 : likes - 1);
            console.error('Error liking tweet:', error);
        }
    };

    const handleRetweet = async () => {
        try {
            setRetweeted(!retweeted);
            setRetweets(retweeted ? retweets - 1 : retweets + 1);
            await onRetweet?.(tweet.id);
        } catch (error) {
            setRetweeted(!retweeted);
            setRetweets(retweeted ? retweets + 1 : retweets - 1);
            console.error('Error retweeting:', error);
        }
    };

    const handleBookmark = async () => {
        try {
            setBookmarked(!bookmarked);
            await onBookmark?.(tweet.id);
        } catch (error) {
            setBookmarked(!bookmarked);
            console.error('Error bookmarking:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await onDelete?.(tweet.id);
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting tweet:', error);
        }
    };

    const moreOptions = [
        isOwnTweet && { title: 'Delete', icon: <NotInterestedIcon />, action: () => setDeleteDialogOpen(true) },
        !isOwnTweet && { title: 'Not Interested', icon: <NotInterestedIcon />, action: () => console.log('Not interested') },
        !isOwnTweet && { title: 'Follow @' + tweet.author.username, icon: <PersonAddAltIcon />, action: () => navigate(`/profile/${tweet.author.id}`) },
        !isOwnTweet && { title: 'Block @' + tweet.author.username, icon: <BlockIcon />, action: () => console.log('Block user') },
        !isOwnTweet && { title: 'Report Post', icon: <Report />, action: () => console.log('Report post') },
    ].filter(Boolean);

    return (
        <>
            <div className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer p-4 group">
                {/* Retweet info */}
                {tweet.retweetedBy && (
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <RepeatOnIcon sx={{ fontSize: 16, marginRight: 1 }} />
                        <span>{tweet.retweetedBy} Retweeted</span>
                    </div>
                )}

                <div className="flex gap-3">
                    {/* Avatar */}
                    <Avatar
                        src={tweet.author.avatar}
                        alt={tweet.author.name}
                        onClick={() => navigate(`/profile/${tweet.author.id}`)}
                        className="cursor-pointer hover:opacity-80"
                        sx={{ width: 48, height: 48 }}
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0 font-bold text-lg">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-3xl text-gray-900 hover:underline">
                                    {tweet.author.name}
                                </span>
                                {tweet.author.verified && (
                                    <VerifiedIcon sx={{ fontSize: 18, color: '#1d9bf0' }} />
                                )}
                                <span className="text-gray-500 text-xl">@{tweet.author.username}</span>
                                <span className="text-gray-500">·</span>
                                <Tooltip title={new Date(tweet.createdAt).toLocaleString()}>
                                    <span className="text-gray-500 hover:underline">
                                        {formatRelativeTime(tweet.createdAt)}
                                    </span>
                                </Tooltip>
                            </div>

                            {/* More menu */}
                            <Tooltip title="More">
                                <div
                                    onClick={handleMoreClick}
                                    className="opacity-0 group-hover:opacity-100 transition p-2 rounded-full hover:bg-blue-100 text-gray-500 hover:text-blue-500"
                                >
                                    <MoreHorizIcon />
                                </div>
                            </Tooltip>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMoreClose}
                            >
                                {moreOptions.map((option) => (
                                    <MenuItem key={option.title} onClick={() => {
                                        option.action?.();
                                        handleMoreClose();
                                    }}>
                                        <ListItemIcon>{option.icon}</ListItemIcon>
                                        <ListItemText>{option.title}</ListItemText>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>

                        {/* Tweet text */}
                        <p
                            className="text-gray-900 text-base mb-2 break-words"
                            onClick={() => navigate(`/tweet/${tweet.id}`)}
                        >
                            {tweet.content}
                        </p>

                        {/* Image */}
                        {tweet.image && (
                            <img
                                src={tweet.image}
                                alt="Tweet media"
                                className="rounded-2xl max-h-96 w-full object-cover mb-3 hover:opacity-90 transition"
                                onClick={() => navigate(`/tweet/${tweet.id}`)}
                            />
                        )}

                        {/* Stats */}
                        {(tweet.replies > 0 || tweet.retweets > 0 || likes > 0) && (
                            <div className="flex gap-4 text-sm text-gray-500 mb-3 py-2 border-t border-b border-gray-100">
                                {tweet.replies > 0 && (
                                    <div className="hover:text-blue-500 cursor-pointer">
                                        <span className="font-bold text-gray-900">{formatNumber(tweet.replies)}</span> Replies
                                    </div>
                                )}
                                {retweets > 0 && (
                                    <div className="hover:text-green-500 cursor-pointer">
                                        <span className="font-bold text-gray-900">{formatNumber(retweets)}</span> Retweets
                                    </div>
                                )}
                                {likes > 0 && (
                                    <div className="hover:text-red-500 cursor-pointer">
                                        <span className="font-bold text-gray-900">{formatNumber(likes)}</span> Likes
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between text-gray-500 max-w-md text-sm">
                            {/* Reply */}
                            <div className="flex items-center gap-2 group/action">
                                <div className="p-2 rounded-full group-hover/action:bg-blue-100 group-hover/action:text-blue-500 transition cursor-pointer"
                                    onClick={() => onReply?.(tweet)}>
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                                </div>
                                {tweet.replies > 0 && <span className="text-xs group-hover/action:text-blue-500">{formatNumber(tweet.replies)}</span>}
                            </div>

                            {/* Retweet */}
                            <div className="flex items-center gap-2 group/action">
                                <div className={`p-2 rounded-full group-hover/action:bg-green-100 transition cursor-pointer ${retweeted ? 'text-green-500' : 'group-hover/action:text-green-500'
                                    }`}
                                    onClick={handleRetweet}>
                                    {retweeted ? <RepeatOnIcon sx={{ fontSize: 18 }} /> : <RepeatIcon sx={{ fontSize: 18 }} />}
                                </div>
                                {retweets > 0 && <span className={`text-xs ${retweeted ? 'text-green-500' : 'group-hover/action:text-green-500'}`}>{formatNumber(retweets)}</span>}
                            </div>

                            {/* Like */}
                            <div className="flex items-center gap-2 group/action">
                                <div className={`p-2 rounded-full group-hover/action:bg-red-100 transition cursor-pointer ${liked ? 'text-red-500' : 'group-hover/action:text-red-500'
                                    }`}
                                    onClick={handleLike}>
                                    {liked ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                                </div>
                                {likes > 0 && <span className={`text-xs ${liked ? 'text-red-500' : 'group-hover/action:text-red-500'}`}>{formatNumber(likes)}</span>}
                            </div>

                            {/* Bookmark */}
                            <div className="flex items-center gap-2 group/action">
                                <div className={`p-2 rounded-full transition cursor-pointer ${bookmarked
                                    ? 'text-blue-500 bg-blue-100'
                                    : 'group-hover/action:bg-blue-100 group-hover/action:text-blue-500'
                                    }`}
                                    onClick={handleBookmark}>
                                    {bookmarked ? <BookmarkIcon sx={{ fontSize: 18 }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
                                </div>
                            </div>

                            {/* Share */}
                            <div className="flex items-center gap-2 group/action">
                                <div className="p-2 rounded-full group-hover/action:bg-blue-100 group-hover/action:text-blue-500 transition cursor-pointer"
                                    onClick={() => onShare?.(tweet)}>
                                    <ShareIcon sx={{ fontSize: 18 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Tweet?</DialogTitle>
                <DialogContent>
                    This can't be undone and it will be removed from your profile.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TweetCard;
