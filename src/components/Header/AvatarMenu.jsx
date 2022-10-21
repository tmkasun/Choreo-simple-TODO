import React, { useEffect, useRef, useState } from 'react';
import useUser from '../../data/hooks/user.js';
import '../../styles/AvatarMenu.css';

import { default as AsgardeoConfig } from '../../data/configs/asgardeo.json';
const signOutRedirectURL = `${window.location.origin}/`;

export default function AvatarMenu() {
    const [isInProgress, setIsInProgress] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef();
    const [user] = useUser();

    useEffect(() => {
        const windowClicker = function (event) {
            if (event.target !== dropdownRef.current) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('click', windowClicker, false);
        return () => {
            window.removeEventListener('click', windowClicker, false);
        };
    }, []);

    const logoutHandler = () => {
        setIsInProgress(true);
        user.logout();
        window.location.href = `${AsgardeoConfig.baseUrl}/oidc/logout?id_token_hint=${user.asgardeoIdToken}&post_logout_redirect_uri=${signOutRedirectURL}`;
    };

    return (
        <div className="login-panel">
            <button
                ref={dropdownRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                disabled={isInProgress}
                className="avatar-button"
            >
                <img
                    className="user-avatar"
                    src={user.picture}
                    alt="User avatar"
                />
                Hi, {user.given_name}
            </button>
            {isMenuOpen && user && !isInProgress && (
                <div className="dropdown-content avatar-dropdown">
                    <a onClick={logoutHandler} href="#">
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
}
