import { nanoid } from 'nanoid';
import { default as asgardeoSdkConfig } from '../configs/asgardeo.json';

export function generateCodeVerifier() {
    return nanoid(48);
}

export function generateHash(value) {
    /**
   * 
    plain
        code_challenge = code_verifier

    S256
        code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
   */
    const encoder = new TextEncoder();
    return crypto.subtle
        .digest('SHA-256', encoder.encode(value))
        .then((hashedCC) => arrayBufferToBase64(hashedCC));
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 1) {
        binary += String.fromCharCode(bytes[i]);
    }
    const b64 = window.btoa(binary);
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function parseJwt(token) {
    if (!token) {
        return null;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const ASGARDEO_STATE_SUFFIX_CHOREO = '_request_0'; // Used to identify the request counter in the state

export const getChoreoAccessToken = async (id_token) => {
    const {
        stsTokenEndpoint,
        stsConfig: { client_id, orgHandle, scope },
    } = asgardeoSdkConfig;
    const formBody = new URLSearchParams({
        client_id: client_id,
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        scope: scope.join('+'),
        subject_token: id_token,
        orgHandle,
    });
    const response = await fetch(stsTokenEndpoint, {
        headers: {
            authorization: `Bearer ${id_token}`,
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    });

    if (!response.ok) {
        console.error(response);
        throw new Error(response);
    } else {
        const data = await response.json();
        return data;
    }
};
