import { useEffect, useMemo, useState } from "react";
import { parseJwt } from "../utils/auth";
import { deleteCookie, getCookie } from "../utils/cookies";

export default function useUser() {
    const accessToken = getCookie('access_token');
    const memonizedUser = useMemo(() => {
        let user = null;
        if (accessToken) {
            const idToken = getCookie('id_token');
            const { given_name, picture, email } = parseJwt(idToken);
            user = {
                logout: () => {
                    deleteCookie('access_token');
                    deleteCookie('id_token');
                },
                idToken,
                accessToken,
                given_name, picture, email
            }
        }
        return user;
    }, [accessToken]);
    return memonizedUser;

}