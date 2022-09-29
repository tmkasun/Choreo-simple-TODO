import React, { useState } from 'react';
import { useAuthRequestURL } from '../data/hooks/auth.js';
import useUser from '../data/hooks/user.js';
import googleLogo from '../images/google.svg';
import '../styles/LoginButton.css'

import {default as AsgardeoConfig} from '../data/configs/asgardeo.json';
const signOutRedirectURL = process.env.REACT_APP_signOutRedirectURL;

export default function LoginButton() {
    const { getAuthRequestURL } = useAuthRequestURL();
    const [isHovered, setIsHovered] = useState(false);
    const [isInProgress, setIsInProgress] = useState(false);
    const user = useUser();
    const onLoginClick = async () => {
        setIsInProgress(true);
        const loginURL = await getAuthRequestURL();
        window.location.href = loginURL;
    }
    const logoutHandler = () => {
        user.logout();
        window.location.href = `${AsgardeoConfig.baseUrl}/oidc/logout?id_token_hint=${user.idToken}&post_logout_redirect_uri=${signOutRedirectURL}`
    }

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-panel'>
            {user ?
                <button onClick={onLoginClick} className='login-button'>
                    <img className='user-avatar' src={user.picture} alt='User avatar' /> Hi <b>{user.given_name}</b>
                </button> : <button disabled={isInProgress} onClick={onLoginClick} className='login-button'>
                    <img src={googleLogo} alt='Google logo' /> Login with google
                </button>}
            {user && isHovered && !isInProgress && <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-dropdown'>
                <button onClick={logoutHandler}>
                    Logout
                </button>
            </div>}
        </div>
    );
}