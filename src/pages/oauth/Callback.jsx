import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAsgardeoToken } from '../../data/hooks/auth';
import { setCookie } from '../../data/utils/cookies';

import '../../styles/Callback.css';

export default function Callback(params) {
    const { isAsgardeoLoading, isChoreoTokenLoading, choreoTokenData, asgardeoStatus, choreoStatus, asgardeoError, choreoError,asgardeoTokenData } = useAsgardeoToken();
    const history = useHistory();
    useEffect(() => {
        if (choreoTokenData) {
            setCookie('id_token', choreoTokenData.id_token, choreoTokenData.expires_in);
            setCookie('access_token', choreoTokenData.access_token, choreoTokenData.expires_in);
            history.push('/')
        }
    }, [choreoTokenData])

    useEffect(() => {
        if (asgardeoTokenData) {
            setCookie('asgardeo_id_token', asgardeoTokenData.id_token, asgardeoTokenData.expires_in);
        }
    }, [asgardeoTokenData])
    return (
        <div className='callback-layout'>
            <ul>
                <li>
                    {asgardeoStatus === "success" ? "Asgardeo token Done" : "Asgardeo token pending . . ."}
                    {isAsgardeoLoading && "Requesting Asgardeo token"}
                    {asgardeoError && `${asgardeoError}`}
                </li>
                <li>
                    {choreoStatus === "success" ? "Choreo token Done" : "Choreo token pending . . ."}
                    {isChoreoTokenLoading && "Requesting Choreo token"}
                    {choreoError && `${choreoError}`}

                </li>
            </ul>
        </div>
    );
}