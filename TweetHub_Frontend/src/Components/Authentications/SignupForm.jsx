import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
    LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TweetHub_logo from '../../assets/Logo/TweetHub_logo.png';
import { getPasswordStrength } from '../../utils/validation';

const SignupForm = ({ onSwitchToLogin }) => {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuth();
    const [localError, setLocalError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

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

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 'Weak':
                return 'error';
            case 'Fair':
                return 'warning';
            case 'Good':
                return 'info';
            case 'Strong':
                return 'success';
            default:
                return 'inherit';
        }
    };

    return (
        <Box className="w-full max-w-md">
            <Box className="text-center mb-8">
                <img src={TweetHub_logo} alt="TweetHub" className="w-16 h-16 mx-auto mb-4" />
                <Typography variant="h4" className="font-bold">
                    Create your TweetHub account
                </Typography>
            </Box>

            {(error || localError) && (
                <Alert severity="error" className="mb-4">
                    {error || localError}
                </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    disabled={isLoading}
                />

                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={isLoading}
                />

                <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    disabled={isLoading}
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.password}
                    onChange={handlePasswordChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    disabled={isLoading}
                />

                {formik.values.password && (
                    <Box className="my-2">
                        <Box className="flex justify-between items-center mb-1">
                            <Typography variant="caption">Password Strength: {passwordStrength}</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={
                                passwordStrength === 'Weak' ? 25 :
                                    passwordStrength === 'Fair' ? 50 :
                                        passwordStrength === 'Good' ? 75 : 100
                            }
                            color={getStrengthColor()}
                        />
                    </Box>
                )}

                <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    disabled={isLoading}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="mt-6 py-3 font-bold text-lg"
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>
            </form>

            <Box className="mt-6 text-center">
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Button
                        color="primary"
                        onClick={onSwitchToLogin}
                        style={{ textTransform: 'none' }}
                    >
                        Sign in
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
};

export default SignupForm;
