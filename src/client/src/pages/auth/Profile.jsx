import React from "react";

import { getMe } from "../../services/authService";

import AuthenticatedView from "../../components/AuthenticatedView";
import NotAuthenticatedView from "../../components/NotAuthenticatedView";



export default function Profile() {
    let Logout = () => {
        localStorage.removeItem("auth_token");
        window.location.reload();
    }

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        getMe(token)
            .then(userData => setUser(userData))
            .catch(err => {
                console.error("Failed to fetch user data:", err);
                Logout();
            }
            );
    }, []);
    return (
        <>
            <header className="panel text-center">
                {user && <img src={user.profileImageUrl} alt={user.displayName} id="profile_pic" />
                }
                <h1>Profile</h1>
            </header>
            <section id="profile_info" className="panel">
                <AuthenticatedView>
                    <p>You are logged in.</p>
                    {user && (
                        <div className="profile-details">
                            <p><b>Name:</b> {user.displayName}</p>
                            <p><b>Email:</b> {user.email}</p>
                        </div>
                    )}
                    <button className="btn" onClick={Logout}>
                        Log Out
                    </button>
                </AuthenticatedView>
                <NotAuthenticatedView>
                    <p>Please log in to view your profile information.</p>
                </NotAuthenticatedView>
            </section>
        </>
    );
}