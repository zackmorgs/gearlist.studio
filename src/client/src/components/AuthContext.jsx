import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister, loginWithGoogle as apiLoginWithGoogle } from "../services/authService";

const TOKEN_KEY = "auth_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hydrate user from stored token on mount
    useEffect(() => {
        if (!token) return;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser({
                id: payload.sub,
                email: payload.email,
                displayName: payload.name,
            });
        } catch {
            localStorage.removeItem(TOKEN_KEY);
            setToken(null);
        }
    }, [token]);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogin(email, password);
            localStorage.setItem(TOKEN_KEY, data.token);
            setToken(data.token);
            setUser({
                id: data.user.id,
                email: data.user.email,
                displayName: data.user.displayName,
            });
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const loginWithGoogle = useCallback(async (idToken) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLoginWithGoogle(idToken);
            localStorage.setItem(TOKEN_KEY, data.token);
            setToken(data.token);
            setUser({
                id: data.user.id,
                email: data.user.email,
                displayName: data.user.displayName,
            });
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (email, password, displayName) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiRegister(email, password, displayName);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
        setError(null);
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, loginWithGoogle, register, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}
