import React, { useState } from 'react';
import {
    Box,
    Button,
    Switch,
    FormControlLabel,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SecurityIcon from '@mui/icons-material/Security';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import BlockIcon from '@mui/icons-material/Block';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function Settings() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('general');

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const settingsTabs = [
        { id: 'general', label: 'General', icon: <DarkModeIcon /> },
        { id: 'privacy', label: 'Privacy & Safety', icon: <PrivacyTipIcon /> },
        { id: 'security', label: 'Security', icon: <SecurityIcon /> },
        { id: 'blocked', label: 'Blocked Accounts', icon: <BlockIcon /> },
        { id: 'muted', label: 'Muted Accounts', icon: <VolumeOffIcon /> },
    ];

    return (
        <Box className='timeline-page'>
            {/* Header */}
            <Box className='timeline-header'>
                <Box className='timeline-title-row'>
                    <h2 className='text-xl font-bold'>Settings</h2>
                    <span>Privacy, display, and account controls</span>
                </Box>
            </Box>

            {/* Settings Content */}
            <Box display='flex' minHeight='calc(100vh - 60px)'>
                {/* Sidebar */}
                <Box
                    sx={{
                        width: 280,
                        borderRight: '1px solid #eff3f4',
                        overflowY: 'auto',
                    }}
                >
                    <List>
                        {settingsTabs.map((tab) => (
                            <ListItemButton
                                key={tab.id}
                                selected={selectedTab === tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                            >
                                <ListItemText primary={tab.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Settings Panel */}
                <Box flex={1} p={4}>
                    {selectedTab === 'general' && (
                        <Box>
                            <Typography variant='h6' className='mb-6 font-bold'>
                                General Settings
                            </Typography>

                            <Box className='space-y-4'>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={isDarkMode}
                                            onChange={toggleTheme}
                                        />
                                    }
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Dark Mode
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                Adjust the appearance
                                            </Typography>
                                        </Box>
                                    }
                                />

                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Private Account
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                Only approve followers
                                            </Typography>
                                        </Box>
                                    }
                                />

                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Allow Messages
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                From anyone or followers only
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>
                        </Box>
                    )}

                    {selectedTab === 'privacy' && (
                        <Box>
                            <Typography variant='h6' className='mb-6 font-bold'>
                                Privacy & Safety
                            </Typography>

                            <Box className='space-y-4'>
                                <FormControlLabel
                                    control={<Switch defaultChecked={false} />}
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Protect your Tweets
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                Only followers can see your Tweets
                                            </Typography>
                                        </Box>
                                    }
                                />

                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Allow people to tag you in photos
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                Customize who can tag you
                                            </Typography>
                                        </Box>
                                    }
                                />

                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label={
                                        <Box className='ml-2'>
                                            <Typography variant='body1' className='font-medium'>
                                                Searchable by email
                                            </Typography>
                                            <Typography variant='caption' color='textSecondary'>
                                                Allow people to find you by email
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Box>
                        </Box>
                    )}

                    {selectedTab === 'security' && (
                        <Box>
                            <Typography variant='h6' className='mb-6 font-bold'>
                                Security Settings
                            </Typography>

                            <Box className='space-y-4'>
                                <Button variant='outlined' fullWidth>
                                    Change Password
                                </Button>
                                <Button variant='outlined' fullWidth>
                                    Two-Factor Authentication
                                </Button>
                                <Button variant='outlined' fullWidth>
                                    Login History
                                </Button>
                                <Button variant='outlined' fullWidth>
                                    Active Sessions
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {selectedTab === 'blocked' && (
                        <Box>
                            <Typography variant='h6' className='mb-6 font-bold'>
                                Blocked Accounts
                            </Typography>
                            <Typography color='textSecondary'>
                                You haven't blocked anyone yet
                            </Typography>
                        </Box>
                    )}

                    {selectedTab === 'muted' && (
                        <Box>
                            <Typography variant='h6' className='mb-6 font-bold'>
                                Muted Accounts
                            </Typography>
                            <Typography color='textSecondary'>
                                You haven't muted anyone yet
                            </Typography>
                        </Box>
                    )}

                    {/* Logout Button */}
                    <Box mt={8} pt={4} borderTop='1px solid #eff3f4'>
                        <Button
                            variant='contained'
                            color='error'
                            fullWidth
                            startIcon={<LogoutIcon />}
                            onClick={() => setLogoutDialogOpen(true)}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
                <DialogTitle>Logout?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to logout from TweetHub?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleLogout}
                        color='error'
                        variant='contained'
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Settings;
