import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
    _id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    gender?: 'male' | 'female' | 'other';
    country?: string;
    bio?: string;
    isOnline: boolean;
    lastSeen: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    updateProfile: (profileData: Partial<User>) => Promise<void>;
    checkUsername: (username: string) => Promise<boolean>;
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

    // Check for existing token on app load
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
            fetchUserProfile(savedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUserProfile = async (authToken: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                // Token is invalid, clear it
                localStorage.removeItem('authToken');
                setToken(null);
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user._id); // <-- Add this
            localStorage.setItem('userType', 'registered'); // <-- Add this
            localStorage.removeItem('guestId'); // <-- Remove guestId if present
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.errors ? data.errors.join(', ') : data.message || 'Registration failed';
                throw new Error(errorMessage);
            }

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.user._id); // <-- Add this
            localStorage.setItem('userType', 'registered'); // <-- Add this
            localStorage.removeItem('guestId'); // <-- Remove guestId if present
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            if (token) {
                await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
        }
    };

    const updateProfile = async (profileData: Partial<User>) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Profile update failed');
            }

            setUser(data.user);
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    };

    const checkUsername = async (username: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/check-username/${username}`);
            const data = await response.json();
            return data.available;
        } catch (error) {
            console.error('Username check error:', error);
            return false;
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        checkUsername,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 