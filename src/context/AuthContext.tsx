import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../service/api';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: { name: string, email: string, mobile: string, password: string }) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
    fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Validate token exists
    const fetchUser = async () => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) {
            setUser(null);
            localStorage.removeItem('user');
            return;
        }
        // Restore user from localStorage if available
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    };

    useEffect(() => {
        // Fetch user data on mount if token exists
        const currentToken = localStorage.getItem('token');
        if (currentToken && currentToken === token) {
            fetchUser();
        } else if (!currentToken) {
            setUser(null);
            setToken(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            console.log('Attempting login for:', email);
            const response = await api.login(email, password);
            console.log('Login response:', response);

            if (response.data.token) {
                // Set token in localStorage and state
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);

                // Set user data from login response
                // Note: Login response only provides id and token, not full user details
                const userData = {
                    id: response.data.id,
                    name: email.split('@')[0], // Use email prefix as name
                    email: email,
                    mobile: '', // Not available from login response
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            } else {
                throw new Error('No token received from server');
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (data: { name: string, email: string, mobile: string, password: string }) => {
        setIsLoading(true);
        try {
            await api.signup(data);
            // After signup, redirect to login (no auto-login)
        } catch (error) {
            console.error('Signup failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Call logout API if token exists
            if (token) {
                await api.logout();
            }
        } catch (error) {
            console.error('Logout API failed', error);
        } finally {
            // Clear local state regardless of API call result
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            signup,
            logout,
            isLoading,
            isAuthenticated: !!token,
            fetchUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
