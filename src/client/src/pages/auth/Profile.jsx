import React from "react";

import AuthenticatedView from "../../components/AuthenticatedView";
import NotAuthenticatedView from "../../components/NotAuthenticatedView";

export default function Profile() {
    let Logout = () => {
        localStorage.removeItem("auth_token");
        window.location.reload();
    }
    return (
        <>
            <header className="panel text-center">
                <h1>Profile</h1>
            </header>
            <section id="profile_info" className="panel">
                <AuthenticatedView>
                    <p>You are logged in.</p>
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