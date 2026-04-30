import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Avatar,
    Button,
    Box,
    TextField,
    IconButton,
    Tooltip,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import GifIcon from '@mui/icons-material/GifBox';
import PollIcon from '@mui/icons-material/Poll';
import EmojiIcon from '@mui/icons-material/EmojiEmotions';
import ScheduleIcon from '@mui/icons-material/PendingActionsSharp';
import LocationIcon from '@mui/icons-material/LocationPin';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../hooks/useAuth';
import { TWEET_MAX_LENGTH } from '../../utils/constants';

const TweetComposer = ({ onTweetCreated, onLoading }) => {
    const { user } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const composerInputRef = useRef(null);

    useEffect(() => {
        const focusComposer = () => {
            composerInputRef.current?.focus();
            setIsFocused(true);
        };

        window.addEventListener('tweethub:focus-composer', focusComposer);
        return () => window.removeEventListener('tweethub:focus-composer', focusComposer);
    }, []);

    const validationSchema = Yup.object().shape({
        content: Yup.string()
            .required('Tweet content is required')
            .max(TWEET_MAX_LENGTH, `Tweet must be at most ${TWEET_MAX_LENGTH} characters`),
    });

    const formik = useFormik({
        initialValues: {
            content: '',
            image: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                onLoading?.(true);
                await onTweetCreated(values);
                formik.resetForm();
                setSelectedImage(null);
                setIsFocused(false);
            } catch (error) {
                console.error('Error creating tweet:', error);
            } finally {
                setIsLoading(false);
                onLoading?.(false);
            }
        },
    });

    const handleImageSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            formik.setFieldValue('image', file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        formik.setFieldValue('image', null);
    };

    const remainingCharacters = TWEET_MAX_LENGTH - formik.values.content.length;
    const isCharacterCountLow = remainingCharacters < 20;
    const usedCharacters = Math.min(100, (formik.values.content.length / TWEET_MAX_LENGTH) * 100);

    return (
        <Box className={`tweet-composer ${isFocused ? 'is-focused' : ''}`}>
            <div className="flex gap-4">
                <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    sx={{ width: 48, height: 48 }}
                    className="composer-avatar"
                />

                <div className="flex-1">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="composer-audience-pill">Everyone can reply</div>
                        <TextField
                            inputRef={composerInputRef}
                            fullWidth
                            multiline
                            minRows={isFocused || formik.values.content ? 3 : 2}
                            placeholder="What is happening?!"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onFocus={() => setIsFocused(true)}
                            name="content"
                            disabled={isLoading}
                            sx={{
                                '& .MuiInput-input': {
                                    color: 'var(--text-primary)',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    lineHeight: 1.35,
                                },
                            }}
                        />

                        {selectedImage && (
                            <Box className="composer-media-preview">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    className="rounded-lg max-h-64 w-full object-cover"
                                />
                                <IconButton
                                    size="small"
                                    className="absolute top-2 left-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white"
                                    onClick={removeImage}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        )}

                        {formik.touched.content && formik.errors.content && (
                            <p className="text-red-500 text-sm mt-2">{formik.errors.content}</p>
                        )}

                        <Box className="composer-toolbar">
                            <Box className="composer-tools">
                                <Tooltip title="Media">
                                    <IconButton size="small" component="label" className="composer-tool-button">
                                        <ImageIcon />
                                        <input hidden accept="image/*" type="file" onChange={handleImageSelect} disabled={isLoading} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="GIF">
                                    <IconButton size="small" className="composer-tool-button">
                                        <GifIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Poll">
                                    <IconButton size="small" className="composer-tool-button">
                                        <PollIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Emoji">
                                    <IconButton size="small" className="composer-tool-button">
                                        <EmojiIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Schedule">
                                    <IconButton size="small" className="composer-tool-button">
                                        <ScheduleIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Location">
                                    <IconButton size="small" className="composer-tool-button">
                                        <LocationIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                            <Box className="composer-submit-group">
                                {formik.values.content && (
                                    <div className={`composer-meter ${isCharacterCountLow ? 'is-low' : ''}`}>
                                        <span style={{ '--meter-value': `${usedCharacters}%` }} />
                                        <strong>{remainingCharacters}</strong>
                                    </div>
                                )}

                                <Button
                                    variant="contained"
                                    disabled={
                                        !formik.values.content ||
                                        isLoading ||
                                        !!formik.errors.content ||
                                        remainingCharacters < 0
                                    }
                                    className="composer-post-button"
                                    type="submit"
                                >
                                    {isLoading ? 'Posting' : 'Post'}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </div>
            </div>
        </Box>
    );
};

export default TweetComposer;
