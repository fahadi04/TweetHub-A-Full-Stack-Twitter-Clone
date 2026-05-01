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
} from '@mui/material';
import TweetHub_logo from '../../assets/Logo/TweetHub_logo.png';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getPasswordStrength } from '../../utils/validation';

const SignupForm = ({ onSwitchToLogin }) => {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuth();
    const [localError, setLocalError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLocalError('');
            try {
                await register({
                    name: values.name,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                });
                navigate('/');
            } catch (err) {
                setLocalError(err.response?.data?.message || 'Registration failed');
            }
        },
    });

    const handlePasswordChange = (e) => {
        formik.handleChange(e);
        setPasswordStrength(getPasswordStrength(e.target.value));
    };

    const getStrengthLevel = () => {
        if (!formik.values.password) return 'none';
        switch (passwordStrength) {
            case 'Weak':
                return 'weak';
            case 'Fair':
                return 'fair';
            case 'Good':
                return 'good';
            case 'Strong':
                return 'strong';
            default:
                return 'none';
        }
    };

    const isPasswordMatch = formik.values.password === formik.values.confirmPassword && formik.values.password;

    return (
        <Box>
            {/* Logo Section */}
            <div className="auth-logo-section">
                <div className="auth-logo">
                    <img src={TweetHub_logo} alt="TweetHub" />
                </div>
                <h1 className="auth-title">Join TweetHub</h1>
                <p className="auth-subtitle">Create an account and start sharing your thoughts</p>
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
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={isLoading}
                    placeholder="John Doe"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: '#64748b', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />

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
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    disabled={isLoading}
                    placeholder="@username"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon sx={{ color: '#64748b', fontSize: 20 }} />
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
                    onChange={handlePasswordChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    disabled={isLoading}
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formik.values.password && (
                    <div className={`password-strength strength-${getStrengthLevel()}`}>
                        <div className="strength-meter">
                            <div className="strength-bar"></div>
                        </div>
                        <span className="strength-text">{passwordStrength || 'Unknown'}</span>
                    </div>
                )}

                <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    disabled={isLoading}
                    placeholder="Re-enter your password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon sx={{ color: '#64748b', fontSize: 20 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {formik.values.confirmPassword && (
                                    <Box
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {isPasswordMatch ? (
                                            <CheckIcon sx={{ color: '#10b981', fontSize: 20 }} />
                                        ) : (
                                            <CloseIcon sx={{ color: '#f87171', fontSize: 20 }} />
                                        )}
                                    </Box>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />

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
                        'Create Account'
                    )}
                </Button>
            </form>

            {/* Toggle to Login */}
            <div className="auth-toggle">
                <span className="auth-toggle-text">
                    Already have an account?
                    <Button
                        className="auth-toggle-btn"
                        onClick={onSwitchToLogin}
                    >
                        Sign in
                    </Button>
                </span>
            </div>
        </Box>
    );
};

export default SignupForm;
