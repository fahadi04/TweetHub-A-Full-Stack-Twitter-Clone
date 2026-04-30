import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { demoUser } from '../utils/mockData';

export const AuthContext = createContext();

function AuthProviderComponent({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        const isDemoEnabled = import.meta.env.VITE_ENABLE_DEMO_AUTH !== 'false';
        const activeUser = currentUser || (isDemoEnabled ? demoUser : null);

        if (!currentUser && activeUser) {
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('user', JSON.stringify(activeUser));
        }

        setUser(activeUser);
        setIsAuthenticated(!!activeUser);
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, password);
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            if (!err.response) {
                const data = { token: 'demo-token', user: { ...demoUser, email } };
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return data;
            }
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await authService.register(userData);
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            if (!err.response) {
                const data = {
                    token: 'demo-token',
                    user: { ...demoUser, ...userData, id: Date.now() },
                };
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return data;
            }
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
            if (err.response) {
                setError(err.response?.data?.message || 'Logout failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthProvider = AuthProviderComponent;
