import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../service/api';
import type { SignupRequest } from '../types';
import { getUserFromToken } from '../utils/jwt';

interface UserInfo {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserInfo | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: SignupRequest) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserInfo | null>(null);

    // Check if user is already authenticated on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = getUserFromToken(token);
            if (userInfo) {
                setUser(userInfo);
                setIsAuthenticated(true);
            } else {
                // Invalid token, clear it
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await api.login(email, password);

            // Store token in localStorage
            if (response.token) {
                localStorage.setItem('token', response.token);

                // Decode token to get user info
                const userInfo = getUserFromToken(response.token);
                if (userInfo) {
                    setUser(userInfo);
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (data: SignupRequest) => {
        setIsLoading(true);
        try {
            const response = await api.signup(data);
            // Signup successful, user can now login
            console.log('Signup successful:', response.message);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, signup, logout }}>
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
