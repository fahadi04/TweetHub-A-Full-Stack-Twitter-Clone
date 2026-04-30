import React, { useState, useEffect, useCallback } from 'react';
import { Box, Tab, Tabs, Avatar, Typography, Button } from '@mui/material';
import notificationService from '../../services/notificationService';
import { formatRelativeTime } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { demoUser } from '../../utils/mockData';

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = useCallback(async () => {
        setIsLoading(true);
        try {
            let data;
            if (filter === 'all') {
                data = await notificationService.getAllNotifications();
            } else {
                data = await notificationService.getNotificationsByType(filter);
            }
            setNotifications(data.content || data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([
                {
                    id: 1,
                    type: 'like',
                    read: false,
                    user: { name: 'Aisha Sharma', avatar: '' },
                    message: 'liked your post about responsive UI.',
                    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
                    userId: demoUser.id,
                },
                {
                    id: 2,
                    type: 'follow',
                    read: true,
                    user: { name: 'Code Daily', avatar: '' },
                    message: 'followed you.',
                    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                    userId: demoUser.id,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleMarkAsRead = async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(
                notifications.map((n) =>
                    n.id === id ? { ...n, read: true } : n
                )
            );
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'like':
                return <FavoriteBorderIcon className='text-red-500' />;
            case 'reply':
            case 'mention':
                return <ChatBubbleIcon className='text-blue-500' />;
            case 'follow':
                return <PersonAddIcon className='text-blue-500' />;
            default:
                return null;
        }
    };

    return (
        <Box className='timeline-page'>
            {/* Header */}
            <Box className='timeline-header'>
                <Box className='timeline-title-row'>
                    <h2 className='text-xl font-bold'>Notifications</h2>
                    <span>Activity around your account</span>
                </Box>

                {/* Tabs */}
                <Tabs
                    value={filter}
                    onChange={(e, value) => setFilter(value)}
                    variant='fullWidth'
                >
                    <Tab label='All' value='all' />
                    <Tab label='Mentions' value='mention' />
                    <Tab label='Likes' value='like' />
                    <Tab label='Follows' value='follow' />
                </Tabs>
            </Box>

            {/* Notifications List */}
            {isLoading ? (
                <Box display='flex' justifyContent='center' p={4}>
                    Loading...
                </Box>
            ) : notifications.length === 0 ? (
                <Box className='empty-state'>
                    <h3>No notifications yet</h3>
                    <p>Likes, replies, follows, and mentions will show up here.</p>
                </Box>
            ) : (
                notifications.map((notification) => (
                    <Box
                        key={notification.id}
                        p={4}
                        borderBottom='1px solid #e1e8ed'
                        className={`hover:bg-gray-50 transition cursor-pointer ${!notification.read ? 'bg-blue-50' : ''
                            }`}
                        onClick={() => {
                            handleMarkAsRead(notification.id);
                            if (notification.userId) {
                                navigate(`/profile/${notification.userId}`);
                            }
                        }}
                    >
                        <Box display='flex' gap={3}>
                            <Box>{getNotificationIcon(notification.type)}</Box>
                            <Box flex={1}>
                                <Box display='flex' gap={2} alignItems='center'>
                                    <Avatar
                                        src={notification.user?.avatar}
                                        alt={notification.user?.name}
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <Box flex={1}>
                                        <Typography variant='body2'>
                                            <span className='font-bold'>{notification.user?.name}</span>{' '}
                                            {notification.message}
                                        </Typography>
                                        <Typography variant='caption' color='textSecondary'>
                                            {formatRelativeTime(notification.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
}

export default Notifications;
