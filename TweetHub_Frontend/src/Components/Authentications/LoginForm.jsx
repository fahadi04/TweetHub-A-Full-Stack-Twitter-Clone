import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import TweetHub_logo from '../../assets/Logo/TweetHub_logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';

const LoginForm = ({ onSwitchToSignup }) => {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [localError, setLocalError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [resetError, setResetError] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLocalError('');
            try {
                await login(values.email, values.password);
                navigate('/');
            } catch (err) {
                setLocalError(err.response?.data?.message || 'Login failed');
            }
        },
    });

    const handleForgotPasswordClick = () => {
        setForgotPasswordOpen(true);
        setResetSent(false);
        setResetError('');
    };

    const handleForgotPasswordSubmit = async () => {
        if (!forgotEmail) {
            setResetError('Please enter your email address');
            return;
        }

        // Simulate password reset request
        try {
            // In a real app, this would call an API endpoint
            setResetSent(true);
            setTimeout(() => {
                setForgotPasswordOpen(false);
                setForgotEmail('');
                setResetSent(false);
            }, 2000);
        } catch (err) {
            setResetError('Failed to send reset email');
        }
    };

    return (
        <Box>
            {/* Logo Section */}
            <div className="auth-logo-section">
                <div className="auth-logo">
                    <img src={TweetHub_logo} alt="TweetHub" />
                </div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your TweetHub account</p>
            </div>

            {/* Error Alert */}
            {(error || localError) && (
                <Alert severity="error" className="auth-alert">
                    {error || localError}
                </Alert>
            )}

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="auth-form">
                <TextField
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isLoading}
                    placeholder="you@example.com"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon sx={{ color: '#64748b', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: '#64748b', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{ cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon sx={{ color: '#64748b', fontSize: 20 }} />
                                ) : (
                                    <VisibilityIcon sx={{ color: '#64748b', fontSize: 20 }} />
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

                <div className="auth-forgot-password">
                    <Button
                        className="auth-forgot-link"
                        onClick={handleForgotPasswordClick}
                        disabled={isLoading}
                    >
                        Forgot password?
                    </Button>
                </div>

                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    className="auth-submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size={20} sx={{ color: '#ffffff' }} />
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>

            {/* Toggle to Signup */}
            <div className="auth-toggle">
                <span className="auth-toggle-text">
                    Don't have an account?
                    <Button
                        className="auth-toggle-btn"
                        onClick={onSwitchToSignup}
                    >
                        Create one
                    </Button>
                </span>
            </div>

            {/* Forgot Password Dialog */}
            <Dialog
                open={forgotPasswordOpen}
                onClose={() => !resetSent && setForgotPasswordOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        background: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(29, 155, 240, 0.2)',
                        borderRadius: '16px',
                    }
                }}
            >
                <DialogTitle sx={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, pb: 1 }}>
                    Reset Password
                </DialogTitle>
                <DialogContent>
                    {!resetSent ? (
                        <Box sx={{ pt: 2 }}>
                            <p style={{ color: '#cbd5e1', marginBottom: '16px' }}>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            {resetError && (
                                <Alert severity="error" sx={{ mb: 2, background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                    {resetError}
                                </Alert>
                            )}
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                value={forgotEmail}
                                onChange={(e) => {
                                    setForgotEmail(e.target.value);
                                    setResetError('');
                                }}
                                placeholder="you@example.com"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: '#64748b' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#ffffff',
                                        backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                        '& fieldset': {
                                            borderColor: 'rgba(71, 85, 105, 0.5)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'rgba(29, 155, 240, 0.4)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1d9bf0',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#cbd5e1',
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                            <p style={{ color: '#10b981', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                                ✓ Email sent successfully!
                            </p>
                            <p style={{ color: '#cbd5e1', fontSize: '14px' }}>
                                Check your inbox for the password reset link.
                            </p>
                        </Box>
                    )}
                </DialogContent>
                {!resetSent && (
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button
                            onClick={() => setForgotPasswordOpen(false)}
                            sx={{
                                color: '#cbd5e1',
                                '&:hover': { background: 'rgba(71, 85, 105, 0.2)' }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleForgotPasswordSubmit}
                            variant="contained"
                            startIcon={<SendIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #1d9bf0, #0f7bc2)',
                                color: '#ffffff',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1da1f2, #0a66c2)',
                                }
                            }}
                        >
                            Send Reset Link
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </Box>
    );
};

export default LoginForm;
