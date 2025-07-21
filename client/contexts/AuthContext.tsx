import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// There are no backend API calls in this file, so nothing to remove here.

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

// Mock user data storage
const MOCK_USERS_KEY = 'mock_users';
const MOCK_TOKENS_KEY = 'mock_tokens';

const getMockUsers = (): Record<string, User> => {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    return stored ? JSON.parse(stored) : {};
};

const saveMockUsers = (users: Record<string, User>) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const getMockTokens = (): Record<string, string> => {
    const stored = localStorage.getItem(MOCK_TOKENS_KEY);
    return stored ? JSON.parse(stored) : {};
};

const saveMockTokens = (tokens: Record<string, string>) => {
    localStorage.setItem(MOCK_TOKENS_KEY, JSON.stringify(tokens));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            // Mock implementation - get user from token
            const tokens = getMockTokens();
            const userId = Object.keys(tokens).find(key => tokens[key] === authToken);

            if (userId) {
                const users = getMockUsers();
                const userData = users[userId];
                if (userData) {
                    setUser(userData);
                } else {
                    // Token is invalid, clear it
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUser(null);
                }
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
            // Mock implementation
            const users = getMockUsers();
            let user = Object.values(users).find(u => u.email === email);

            // If no user exists, create a mock user for demo purposes
            if (!user) {
                const newUser: User = {
                    _id: `user_${Date.now()}`,
                    username: email.split('@')[0], // Use email prefix as username
                    email: email,
                    firstName: 'Demo',
                    lastName: 'User',
                    avatar: '',
                    isOnline: true,
                    lastSeen: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                users[newUser._id] = newUser;
                saveMockUsers(users);
                user = newUser;
            }

            const mockToken = `mock_token_${Date.now()}`;
            const tokens = getMockTokens();
            tokens[user._id] = mockToken;
            saveMockTokens(tokens);

            setToken(mockToken);
            setUser(user);
            localStorage.setItem('authToken', mockToken);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('userType', 'registered');
            localStorage.removeItem('guestId');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            // Mock implementation
            const users = getMockUsers();

            // Check if user already exists
            const existingUser = Object.values(users).find(u =>
                u.email === userData.email || u.username === userData.username
            );

            if (existingUser) {
                throw new Error('User already exists');
            }

            const newUser: User = {
                _id: `user_${Date.now()}`,
                username: userData.username,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                avatar: '',
                isOnline: true,
                lastSeen: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            users[newUser._id] = newUser;
            saveMockUsers(users);

            const mockToken = `mock_token_${Date.now()}`;
            const tokens = getMockTokens();
            tokens[newUser._id] = mockToken;
            saveMockTokens(tokens);

            setToken(mockToken);
            setUser(newUser);
            localStorage.setItem('authToken', mockToken);
            localStorage.setItem('userId', newUser._id);
            localStorage.setItem('userType', 'registered');
            localStorage.removeItem('guestId');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Mock implementation - no server call needed
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userType');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateProfile = async (profileData: Partial<User>) => {
        try {
            // Mock implementation
            if (!user) throw new Error('No user logged in');

            const users = getMockUsers();
            const updatedUser = { ...user, ...profileData, updatedAt: new Date().toISOString() };
            users[user._id] = updatedUser;
            saveMockUsers(users);

            setUser(updatedUser);
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    };

    const checkUsername = async (username: string): Promise<boolean> => {
        try {
            // Mock implementation
            const users = getMockUsers();
            const existingUser = Object.values(users).find(u => u.username === username);
            return !existingUser; // Available if no user found
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