import React, { useState } from 'react';
import useUser from '../../data/hooks/user.js';
import '../../styles/AvatarMenu.css';

import { default as AsgardeoConfig } from '../../data/configs/asgardeo.json';
const signOutRedirectURL = process.env.REACT_APP_signOutRedirectURL;

export default function AvatarMenu() {
    const [isInProgress, setIsInProgress] = useState(false);
    const [user] = useUser();
    const logoutHandler = () => {
        setIsInProgress(true);
        user.logout();
        window.location.href = `${AsgardeoConfig.baseUrl}/oidc/logout?id_token_hint=${user.asgardeoIdToken}&post_logout_redirect_uri=${signOutRedirectURL}`;
    };

    return (
        <div className="login-panel">
            <button disabled={isInProgress} className="avatar-button">
                <img
                    className="user-avatar"
                    src={user.picture}
                    alt="User avatar"
                />
                Hi, {user.given_name}
            </button>
            {user && !isInProgress && (
                <div className="dropdown-content avatar-dropdown">
                    <a onClick={logoutHandler} href="#">
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
}
