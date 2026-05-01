import { useState } from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthStyles.css';

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box className="auth-container">
      <div className="auth-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <Container maxWidth="sm" className="auth-content">
        <div className={`auth-card ${isLogin ? 'login-mode' : 'signup-mode'}`}>
          <div className="auth-card-inner">
            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </Container>
    </Box>
  );
}

export default Authentication;