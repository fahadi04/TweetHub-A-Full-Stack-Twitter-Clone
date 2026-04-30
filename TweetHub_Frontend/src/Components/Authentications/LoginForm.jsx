import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';
import TweetHub_logo from '../../assets/Logo/TweetHub_logo.png';

const LoginForm = ({ onSwitchToSignup }) => {
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();
    const [localError, setLocalError] = useState('');

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

    return (
        <Box className="w-full max-w-md">
            <Box className="text-center mb-8">
                <img src={TweetHub_logo} alt="TweetHub" className="w-16 h-16 mx-auto mb-4" />
                <Typography variant="h4" className="font-bold">
                    Sign in to TweetHub
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
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                    {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
            </form>

            <Box className="mt-6 text-center">
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Button
                        color="primary"
                        onClick={onSwitchToSignup}
                        style={{ textTransform: 'none' }}
                    >
                        Sign up
                    </Button>
                </Typography>
            </Box>

            <Box className="mt-4 text-center">
                <Link to="/" className="text-blue-500 hover:underline text-sm">
                    Forgot password?
                </Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
