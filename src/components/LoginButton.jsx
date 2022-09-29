import React, { useState } from 'react';
import { useAuthRequestURL } from '../data/hooks/auth.js';
import useUser from '../data/hooks/user.js';
import googleLogo from '../images/google.svg';
import '../styles/LoginButton.css'

export default function LoginButton() {
    const { getAuthRequestURL } = useAuthRequestURL();
    const [isHovered, setIsHovered] = useState(false);
    const user = useUser();
    const onLoginClick = async () => {
        const loginURL = await getAuthRequestURL();
        window.location.href = loginURL;
    }

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-panel'>
            {user ?
                <button onClick={onLoginClick} className='login-button'>
                    <img className='user-avatar' src={user.picture} alt='User avatar' /> Hi <b>{user.given_name}</b>
                </button> : <button onClick={onLoginClick} className='login-button'>
                    <img src={googleLogo} alt='Google logo' /> Login with google
                </button>}
            {user && isHovered && <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='login-dropdown'>
                <button>
                    Logout
                </button>
            </div>}
        </div>
    );
}