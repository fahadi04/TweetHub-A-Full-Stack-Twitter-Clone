import React from 'react';
import { Alert, Button, Container } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    reset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm" className="mt-8">
                    <Alert severity="error">
                        Something went wrong. Please try again.
                    </Alert>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.reset}
                        className="mt-4"
                    >
                        Try Again
                    </Button>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
