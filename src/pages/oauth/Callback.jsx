import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import { useAsgardeoToken } from '../../data/hooks/auth';
import { COOKIES, setCookie } from '../../data/utils/cookies';

import '../../styles/Callback.css';
import CallbackItem from './CallbackItem';

export default function Callback(params) {
    const {
        isAsgardeoLoading,
        isChoreoTokenLoading,
        choreoTokenData,
        asgardeoStatus,
        choreoStatus,
        asgardeoError,
        choreoError,
        asgardeoTokenData,
    } = useAsgardeoToken();
    const history = useHistory();
    useEffect(() => {
        if (choreoTokenData) {
            setCookie(
                COOKIES.CHOREO_ID_TOKEN,
                choreoTokenData.id_token,
                choreoTokenData.expires_in
            );
            setCookie(
                COOKIES.CHOREO_REFRESH_TOKEN,
                choreoTokenData.refresh_token,
                86400
            );
            setCookie(
                COOKIES.CHOREO_ACCESS_TOKEN,
                choreoTokenData.access_token,
                choreoTokenData.expires_in
            );
            history.push('/');
        }
    }, [choreoTokenData]);

    useEffect(() => {
        if (asgardeoTokenData) {
            setCookie(
                COOKIES.ASGARDEO_ID_TOKEN,
                asgardeoTokenData.id_token,
                asgardeoTokenData.expires_in
            );
            setCookie(
                COOKIES.ASGARDEO_REFRESH_TOKEN,
                asgardeoTokenData.refresh_token,
                86400
            );
        }
    }, [asgardeoTokenData]);
    const getAsgardeoStatus = () => {
        let status = 'loading';
        if (isAsgardeoLoading) {
            status = 'loading';
        }
        if (asgardeoStatus === 'success') {
            status = 'success';
        }
        if (asgardeoError) {
            status = 'error';
        }
        return status;
    };

    const getChoreoStatus = () => {
        let status = 'loading';
        if (isChoreoTokenLoading) {
            status = 'loading';
        }
        if (choreoStatus === 'success') {
            status = 'success';
        }
        if (asgardeoError) {
            status = 'error';
        }
        return status;
    };
    return (
        <div className="callback-layout">
            <ul>
                <li>
                    <CallbackItem
                        text="Requesting Asgardeo token"
                        status={getAsgardeoStatus()}
                    />
                    {asgardeoError && <Banner error={asgardeoError} />}
                </li>
                <li>
                    <CallbackItem
                        text="Requesting Choreo token"
                        status={getChoreoStatus()}
                    />

                    {choreoError && <Banner error={choreoError} />}
                </li>
            </ul>
        </div>
    );
}
