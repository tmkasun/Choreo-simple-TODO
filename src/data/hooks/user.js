import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../utils/auth';
import { COOKIES, deleteCookie, getCookie } from '../utils/cookies';

const customParams = (user) => ({
    'x-choreo-user-email': user.email,
    'x-choreo-user-sid': user.sid,
});

export const readUser = () => {
    const accessToken = getCookie(COOKIES.CHOREO_ACCESS_TOKEN);
    let user = null;
    if (accessToken) {
        const idToken = getCookie(COOKIES.CHOREO_ID_TOKEN);
        const asgardeoIdToken = getCookie(COOKIES.ASGARDEO_ID_TOKEN);
        const { given_name, picture, email, sid, ...otherClaims } =
            parseJwt(asgardeoIdToken);
        user = {
            logout: () => Object.values(COOKIES).forEach(deleteCookie),
            idToken,
            asgardeoIdToken,
            accessToken,
            given_name,
            picture,
            email,
            sid,
            customParams: new URLSearchParams({ email, sid }).toString(),
        };
    }
    return user;
};

export default function useUser() {
    const [user, setUser] = useState(readUser);
    const accessToken = getCookie(COOKIES.CHOREO_ACCESS_TOKEN);

    const refreshUser = useCallback(() => {
        setUser(readUser());
    });
    useEffect(refreshUser, [accessToken]);
    const generateCustomParams = () => {
        if (user) {
            const queryPrams = new URLSearchParams(customParams(user));
            return queryPrams.toString();
        } else {
            return '';
        }
    };
    return [user, generateCustomParams, refreshUser];
}
