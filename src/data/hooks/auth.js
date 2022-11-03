import React, { useState, useEffect, useCallback } from 'react';

import {
    ASGARDEO_STATE_SUFFIX_CHOREO,
    generateCodeVerifier,
    generateHash,
    getChoreoAccessToken,
} from '../utils/auth';
import { default as asgardeoSdkConfig } from '../../data/configs/asgardeo.json';
import { useLocation } from 'react-router-dom';
import { COOKIES, getCookie, setCookie } from '../utils/cookies';

const signInRedirectURL = `${window.location.origin}/oauth/callback`;

export const useAuthRequestURL = () => {
    const [codeChallenge, setCodeChallenge] = useState(null);

    useEffect(() => {
        (async () => {
            const codeVerifier = generateCodeVerifier();
            const newCodeChallenge = await generateHash(codeVerifier);
            sessionStorage.setItem('pkce_code_verifier#0', codeVerifier);
            setCodeChallenge(newCodeChallenge);
        })();
    }, []);

    const getAuthRequestURL = useCallback(
        (configs = {}) => {
            const {
                endpoints: { authorizationEndpoint },
                clientID,
                scope,
            } = asgardeoSdkConfig;
            const { state } = configs;
            return (
                `${authorizationEndpoint}?response_type=code&client_id=${clientID}` +
                `&scope=${scope.join('+')}&redirect_uri=${signInRedirectURL}` +
                `&response_mode=query&code_challenge_method=S256&code_challenge=${codeChallenge}` +
                `&state=${state}${ASGARDEO_STATE_SUFFIX_CHOREO} : ''}`
            );
        },
        [codeChallenge]
    );

    return { getAuthRequestURL, codeChallenge };
};

export const useAsgardeoToken = () => {
    const [asgardeoTokenData, setAsgardeoData] = useState();
    const [isAsgardeoLoading, setAsgardeoIsLoading] = useState(true);
    const [asgardeoError, setAsgardeoError] = useState();
    const [asgardeoStatus, setAsgardeoStatus] = useState('initial');

    const [choreoTokenData, setChoreoToken] = useState();
    const [isChoreoTokenLoading, setIsChoreoTokenLoading] = useState(true);
    const [choreoError, setChoreoError] = useState();
    const [choreoStatus, setChoreoStatus] = useState('initial');

    const {
        endpoints: { tokenEndpoint },
        clientID,
        stsTokenEndpoint,
        stsConfig,
    } = asgardeoSdkConfig;

    const { search } = useLocation();
    const oauthCode = new URLSearchParams(search).get('code');
    useEffect(() => {
        if (oauthCode) {
            (async () => {
                setAsgardeoIsLoading(true);
                const formBody = new URLSearchParams({
                    client_id: clientID,
                    code: oauthCode,
                    grant_type: 'authorization_code',
                    redirect_uri: signInRedirectURL,
                    code_verifier: sessionStorage.getItem(
                        'pkce_code_verifier#0'
                    ),
                });

                try {
                    const response = await fetch(tokenEndpoint, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                        },
                        body: formBody,
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'omit',
                    });
                    if (!response.ok) {
                        setAsgardeoError(response);
                        console.error(response);
                        setAsgardeoStatus('error');
                    } else {
                        const data = await response.json();
                        setAsgardeoData(data);
                        setAsgardeoStatus('success');
                    }
                } catch (error) {
                    setAsgardeoError(error);
                    console.error(error);
                    setAsgardeoStatus('error');
                } finally {
                    setAsgardeoIsLoading(false);
                }
            })();
        }
    }, [oauthCode]);

    useEffect(() => {
        if (asgardeoStatus === 'success') {
            (async () => {
                setIsChoreoTokenLoading(true);
                const { id_token } = asgardeoTokenData;
                try {
                    const data = await getChoreoAccessToken(id_token);
                    setChoreoToken(data);
                    setChoreoStatus('success');
                } catch (error) {
                    setChoreoError(error);
                    console.error(error);
                    setChoreoStatus('error');
                } finally {
                    sessionStorage.removeItem('pkce_code_verifier#0'); // TODO: Should have removed after successfully generating a token from Asgardeo
                    setIsChoreoTokenLoading(false);
                }
            })();
        }
    }, [asgardeoStatus]);
    return {
        asgardeoTokenData,
        isAsgardeoLoading,
        asgardeoError,
        asgardeoStatus,
        choreoTokenData,
        isChoreoTokenLoading,
        choreoError,
        choreoStatus,
    };
};

export const useRefreshUser = () => {
    const [asgardeoTokenData, setAsgardeoData] = useState();
    const [isAsgardeoLoading, setAsgardeoIsLoading] = useState(true);
    const [asgardeoError, setAsgardeoError] = useState();

    const [newChoreoToken, setChoreoToken] = useState();
    const [isChoreoTokenLoading, setIsChoreoTokenLoading] = useState(true);
    const [choreoError, setChoreoError] = useState();
    const [choreoStatus, setChoreoStatus] = useState('initial');

    const {
        stsConfig,
        clientID: asgardeoClientID,
        endpoints: { tokenEndpoint: asgardeoTokenEndpoint },
    } = asgardeoSdkConfig;

    const refreshUser = useCallback(async ({ onSuccuss }) => {
        setAsgardeoIsLoading(true);
        const asgardeoRefreshToken = getCookie(COOKIES.ASGARDEO_REFRESH_TOKEN);
        if (!asgardeoRefreshToken) {
            setAsgardeoError('No refresh token found');
            setAsgardeoIsLoading(false);
            setIsChoreoTokenLoading(false);
            return;
        }
        const formBody = new URLSearchParams({
            client_id: asgardeoClientID,
            grant_type: 'refresh_token',
            refresh_token: asgardeoRefreshToken,
        });

        try {
            const response = await fetch(asgardeoTokenEndpoint, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
            });

            if (!response.ok) {
                setAsgardeoError(response);
                console.error(response);
            } else {
                const asgardeoTokenData = await response.json();
                if (asgardeoTokenData) {
                    setAsgardeoData(asgardeoTokenData);
                    setCookie(
                        COOKIES.ASGARDEO_ID_TOKEN,
                        asgardeoTokenData.id_token,
                        asgardeoTokenData.expires_in
                    );
                    setCookie(
                        COOKIES.ASGARDEO_REFRESH_TOKEN,
                        asgardeoTokenData.refresh_token,
                        86400 // TODO Should read from the token expire at claim
                    );
                }
                setIsChoreoTokenLoading(true);
                const { id_token } = asgardeoTokenData;
                try {
                    const newChoreoToken = await getChoreoAccessToken(id_token);
                    if (newChoreoToken) {
                        setCookie(
                            COOKIES.CHOREO_ID_TOKEN,
                            newChoreoToken.id_token,
                            newChoreoToken.expires_in
                        );
                        setCookie(
                            COOKIES.CHOREO_REFRESH_TOKEN,
                            newChoreoToken.refresh_token,
                            86400
                        );
                        setCookie(
                            COOKIES.CHOREO_ACCESS_TOKEN,
                            newChoreoToken.access_token,
                            newChoreoToken.expires_in
                        );
                        setChoreoToken(newChoreoToken);
                        setChoreoStatus('success');
                        onSuccuss(newChoreoToken);
                    } else {
                        setChoreoStatus('error');
                        setChoreoError(new Error('No token found'));
                    }
                } catch (error) {
                    setChoreoError(error);
                    console.error(error);
                    setChoreoStatus('error');
                } finally {
                    setIsChoreoTokenLoading(false);
                }
            }
        } catch (error) {
            setAsgardeoError(error);
            console.error(error);
        } finally {
            setAsgardeoIsLoading(false);
        }
    }, []);
    return {
        asgardeoTokenData,
        isAsgardeoLoading,
        asgardeoError,
        choreoTokenData: newChoreoToken,
        isChoreoTokenLoading,
        choreoError,
        choreoStatus,
        refreshUser,
    };
};
