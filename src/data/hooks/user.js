import { useEffect, useMemo, useState } from "react";
import { parseJwt } from "../utils/auth";
import { getCookie } from "../utils/cookies";

export default function useUser() {
    const accessToken = getCookie('access_token');
    const memonizedUser = useMemo(() => {
        let user = null;
        if (accessToken) {
            const idTokenString = sessionStorage.getItem('id_token');
            const idToken = parseJwt(idTokenString);
            const { given_name, picture, email } = idToken;
            user = {
                idToken,
                accessToken,
                given_name, picture, email
            }
        }
        return user;
    }, [accessToken]);
    return memonizedUser;

}