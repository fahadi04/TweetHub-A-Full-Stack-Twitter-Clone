import { CircularProgress, Box } from '@mui/material';

export const LoadingSpinner = ({ size = 40, message = '' }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
        >
            <CircularProgress size={size} />
            {message && <p className="mt-4 text-gray-600">{message}</p>}
        </Box>
    );
};

export default LoadingSpinner;
