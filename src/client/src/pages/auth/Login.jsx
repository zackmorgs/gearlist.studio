import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

const GOOGLE_CLIENT_ID = "453988233199-74j3q2sqqbsf3hisv1ba78k49qoanjr0.apps.googleusercontent.com";

export default function Login() {
    const { login, loginWithGoogle, loading, error, clearError } = useAuth();
    const navigate = useNavigate();
    const googleButtonRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Load and initialize Google Identity Services
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleCredential,
            });
            if (googleButtonRef.current) {
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    width: googleButtonRef.current.offsetWidth || 300,
                });
            }
        };
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    async function handleGoogleCredential(response) {
        clearError();
        try {
            await loginWithGoogle(response.credential);
            navigate("/profile");
        } catch {
            // error is set in context
        }
    }


    return (
        <>
            <header className="panel text-center">
                <h1>Login</h1>
                <p>Use Google SSO to Login and Register</p>
            </header>
            <section id="login_form" className="panel">
                {error && <p role="alert">{error}</p>}
                <div ref={googleButtonRef} />
            </section>
        </>
    );
}
