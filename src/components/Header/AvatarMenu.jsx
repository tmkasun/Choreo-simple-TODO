import React, { useState } from 'react';
import useUser from '../../data/hooks/user.js';
import '../../styles/AvatarMenu.css'

import { default as AsgardeoConfig } from '../../data/configs/asgardeo.json';
const signOutRedirectURL = process.env.REACT_APP_signOutRedirectURL;

export default function AvatarMenu() {
    const [isHovered, setIsHovered] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const user = useUser();
    const logoutHandler = () => {
        setIsInProgress(true);
        user.logout();
        window.location.href = `${AsgardeoConfig.baseUrl}/oidc/logout?id_token_hint=${user.asgardeoIdToken}&post_logout_redirect_uri=${signOutRedirectURL}`
    }

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-panel'>
            <button disabled={isInProgress} className='login-button'>
                <img className='user-avatar' src={user.picture} alt='User avatar' /> Hi <b>{user.given_name}</b>
            </button>
            {user && isHovered && !isInProgress && <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-dropdown'>
                <button className='logout-button' onClick={logoutHandler}>
                    Logout
                </button>
            </div>}
        </div>
    );
}