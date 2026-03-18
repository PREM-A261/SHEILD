import React, { createContext, useContext, useState } from 'react';
import mockUsers from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('geip_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        const found = mockUsers.find(u => u.email === email && u.password === password);
        if (found) {
            const userData = { id: found.id, name: found.name, email: found.email, role: found.role, department: found.department, organization: found.organization };
            setUser(userData);
            localStorage.setItem('geip_user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('geip_user');
    };

    const hasRole = (...roles) => user && roles.includes(user.role);

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export default AuthContext;
