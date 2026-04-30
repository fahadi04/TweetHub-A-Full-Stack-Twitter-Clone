import { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8 rounded-2xl">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default Authentication;