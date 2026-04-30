import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import VerifiedIcon from '@mui/icons-material/Verified';
import Profile_Bg_Img_jpg from '../../assets/ProfileBG/Profile_Bg_Img.jpg';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseSharp';
import { demoUser } from '../../utils/mockData';

function Profile() {
    const navigate = useNavigate();
    const { id: userId } = useParams();
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null') || demoUser;
    const isOwnProfile = !userId || Number(userId) === Number(storedUser.id);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [tab, setTab] = useState('posts');
    const [profileData, setProfileData] = useState({
        name: storedUser.name || demoUser.name,
        bio: storedUser.bio || demoUser.bio,
        location: storedUser.location || demoUser.location,
        website: storedUser.website || demoUser.website,
    });

    const handleProfileDataChange = (event) => {
        const { name, value } = event.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        const updatedUser = { ...storedUser, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditModalOpen(false);
    };

    return (
        <div className='timeline-page profile-page'>
            <section className='profile-sticky-header'>
                <button className='profile-back' onClick={() => navigate(-1)} aria-label='Go back'>
                    <KeyboardBackspaceIcon />
                </button>
                <div>
                    <h1>{profileData.name}</h1>
                    <span>1,284 posts</span>
                </div>
            </section>

            <section className='profile-cover'>
                <img src={Profile_Bg_Img_jpg} alt='Profile banner' />
            </section>

            <section className='profile-summary'>
                <Avatar className='profile-avatar' src={storedUser.avatar} alt={profileData.name} />
                <div className='profile-actions'>
                    {isOwnProfile ? (
                        <button className='outline-pill' onClick={() => setIsEditModalOpen(true)}>
                            Edit profile
                        </button>
                    ) : (
                        <button className='solid-pill' onClick={() => setIsFollowing(!isFollowing)}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>

                <div className='profile-identity'>
                    <h2>
                        {profileData.name}
                        {storedUser.verified && <VerifiedIcon />}
                    </h2>
                    <span>@{storedUser.username || demoUser.username}</span>
                </div>

                <p className='profile-bio'>{profileData.bio}</p>

                <div className='profile-meta'>
                    <span><LocationOnIcon /> {profileData.location}</span>
                    <span><LinkIcon /> {profileData.website}</span>
                    <span><CalendarMonthIcon /> Joined April 2026</span>
                </div>

                <div className='profile-counts'>
                    <span><strong>{storedUser.following || demoUser.following}</strong> Following</span>
                    <span><strong>{storedUser.followers || demoUser.followers}</strong> Followers</span>
                </div>
            </section>

            <Tabs value={tab} onChange={(event, value) => setTab(value)} variant='fullWidth'>
                <Tab label='Posts' value='posts' />
                <Tab label='Replies' value='replies' />
                <Tab label='Media' value='media' />
                <Tab label='Likes' value='likes' />
            </Tabs>

            <section className='empty-state'>
                <h3>{tab === 'posts' ? 'Your posts will show here' : `No ${tab} yet`}</h3>
                <p>Once activity is available from your backend, this tab will fill automatically.</p>
            </section>

            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} fullWidth maxWidth='sm'>
                <DialogTitle className='profile-dialog-title'>
                    <button onClick={() => setIsEditModalOpen(false)} aria-label='Close'>
                        <CloseIcon />
                    </button>
                    Edit profile
                </DialogTitle>
                <DialogContent className='profile-dialog-content'>
                    <TextField fullWidth label='Name' name='name' value={profileData.name} onChange={handleProfileDataChange} margin='normal' />
                    <TextField fullWidth label='Bio' name='bio' value={profileData.bio} onChange={handleProfileDataChange} multiline rows={3} margin='normal' />
                    <TextField fullWidth label='Location' name='location' value={profileData.location} onChange={handleProfileDataChange} margin='normal' />
                    <TextField fullWidth label='Website' name='website' value={profileData.website} onChange={handleProfileDataChange} margin='normal' />
                </DialogContent>
                <DialogActions>
                    <Button className='solid-pill' onClick={handleSaveProfile}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Profile;
