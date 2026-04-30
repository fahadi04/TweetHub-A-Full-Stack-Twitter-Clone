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
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
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
  const [likes, setLikes] = useState(tweet?.likes || 0);
  const [retweets, setRetweets] = useState(tweet?.retweets || 0);
  const [bookmarked, setBookmarked] = useState(tweet?.bookmarked || false);
  const [liked, setLiked] = useState(tweet?.liked || false);
  const [retweeted, setRetweeted] = useState(tweet?.retweeted || false);
  const [shared, setShared] = useState(false);

  const isOwnTweet = currentUser?.id === tweet?.author?.id;

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

  const handleShare = async () => {
    await onShare?.(tweet);
    setShared(true);
    window.setTimeout(() => setShared(false), 1400);
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
    !isOwnTweet && { title: 'Follow @' + tweet?.author?.username, icon: <PersonAddAltIcon />, action: () => navigate(`/profile/${tweet?.author?.id}`) },
    !isOwnTweet && { title: 'Block @' + tweet?.author?.username, icon: <BlockIcon />, action: () => console.log('Block user') },
    !isOwnTweet && { title: 'Report Post', icon: <Report />, action: () => console.log('Report post') },
  ].filter(Boolean);

  if (!tweet) return null;

  return (
    <>
      <article className="tweet-card interactive-card border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer p-4 group">
        {tweet.retweetedBy && (
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <RepeatOnIcon sx={{ fontSize: 16, marginRight: 1 }} />
            <span>{tweet.retweetedBy} Retweeted</span>
          </div>
        )}

        <div className="flex gap-3">
          <Avatar
            src={tweet.author?.avatar}
            alt={tweet.author?.name}
            onClick={() => navigate(`/profile/${tweet.author?.id}`)}
            className="cursor-pointer hover:opacity-80"
            sx={{ width: 48, height: 48 }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900 hover:underline">
                  {tweet.author?.name}
                </span>
                {tweet.author?.verified && (
                  <VerifiedIcon sx={{ fontSize: 18, color: '#1d9bf0' }} />
                )}
                <span className="text-gray-500">@{tweet.author?.username}</span>
                <span className="text-gray-500">·</span>
                <Tooltip title={new Date(tweet.createdAt).toLocaleString()}>
                  <span className="text-gray-500 hover:underline">
                    {formatRelativeTime(tweet.createdAt)}
                  </span>
                </Tooltip>
              </div>

              <Tooltip title="More">
                <button
                  type="button"
                  onClick={handleMoreClick}
                  className="tweet-more-button opacity-0 group-hover:opacity-100 transition p-2 rounded-full hover:bg-blue-100 text-gray-500 hover:text-blue-500"
                  aria-label="More"
                >
                  <MoreHorizIcon />
                </button>
              </Tooltip>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMoreClose}>
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

            <p
              className="text-gray-900 text-base mb-2 break-words"
              onClick={() => navigate(`/tweet/${tweet.id}`)}
            >
              {tweet.content}
            </p>

            {tweet.image && (
              <img
                src={tweet.image}
                alt="Tweet media"
                className="tweet-media rounded-2xl max-h-96 w-full object-cover mb-3 hover:opacity-90 transition"
                onClick={() => navigate(`/tweet/${tweet.id}`)}
              />
            )}

            {(tweet.replies > 0 || retweets > 0 || likes > 0) && (
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

            <div className="flex justify-between text-gray-500 max-w-md text-sm tweet-actions">
              <div className="flex items-center gap-2 group/action">
                <button type="button" className="tweet-action-button reply-action p-2 rounded-full group-hover/action:bg-blue-100 group-hover/action:text-blue-500 transition cursor-pointer" onClick={() => onReply?.(tweet)}>
                  <ChatOutlinedIcon sx={{ fontSize: 18 }} />
                </button>
                {tweet.replies > 0 && <span className="text-xs group-hover/action:text-blue-500">{formatNumber(tweet.replies)}</span>}
              </div>

              <div className="flex items-center gap-2 group/action">
                <button type="button" className={`tweet-action-button retweet-action p-2 rounded-full group-hover/action:bg-green-100 transition cursor-pointer ${retweeted ? 'is-active text-green-500' : 'group-hover/action:text-green-500'}`} onClick={handleRetweet}>
                  {retweeted ? <RepeatOnIcon sx={{ fontSize: 18 }} /> : <RepeatIcon sx={{ fontSize: 18 }} />}
                </button>
                {retweets > 0 && <span className={`text-xs ${retweeted ? 'text-green-500' : 'group-hover/action:text-green-500'}`}>{formatNumber(retweets)}</span>}
              </div>

              <div className="flex items-center gap-2 group/action">
                <button type="button" className={`tweet-action-button like-action p-2 rounded-full group-hover/action:bg-red-100 transition cursor-pointer ${liked ? 'is-active text-red-500' : 'group-hover/action:text-red-500'}`} onClick={handleLike}>
                  {liked ? <FavoriteIcon sx={{ fontSize: 18 }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
                </button>
                {likes > 0 && <span className={`text-xs ${liked ? 'text-red-500' : 'group-hover/action:text-red-500'}`}>{formatNumber(likes)}</span>}
              </div>

              <div className="flex items-center gap-2 group/action">
                <button type="button" className={`tweet-action-button bookmark-action p-2 rounded-full transition cursor-pointer ${bookmarked ? 'is-active text-blue-500 bg-blue-100' : 'group-hover/action:bg-blue-100 group-hover/action:text-blue-500'}`} onClick={handleBookmark}>
                  {bookmarked ? <BookmarkIcon sx={{ fontSize: 18 }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
                </button>
              </div>

              <div className="flex items-center gap-2 group/action relative">
                <button type="button" className={`tweet-action-button share-action p-2 rounded-full group-hover/action:bg-blue-100 group-hover/action:text-blue-500 transition cursor-pointer ${shared ? 'is-active' : ''}`} onClick={handleShare}>
                  <ShareIcon sx={{ fontSize: 18 }} />
                </button>
                {shared && <span className="share-feedback">Copied</span>}
              </div>
            </div>
          </div>
        </div>
      </article>

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
