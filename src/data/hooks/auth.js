import { generateCodeVerifier, generateHash } from "../utils";

export const useAuthRequestURL = () => {
    const [codeChallenge, setCodeChallenge] = useState < null | string > (null);

    useEffect(() => {
        (async () => {
            const codeVerifier = generateCodeVerifier();
            const newCodeChallenge = await generateHash(codeVerifier);
            sessionStorage.setItem('pkce_code_verifier#0', codeVerifier);
            setCodeChallenge(newCodeChallenge);
        })();
    }, []);

    const getAuthRequestURL = useCallback(
        (configs) => {
            const {
                endpoints: { authorizationEndpoint },
                clientID,
                signInRedirectURL,
            } = asgardeoSdkConfig;
            const { fidp, state, captchaInfo, username } = configs;
            const captchaInfoQueryParam = `&captchaInfo=${captchaInfo}`;
            return (
                `${authorizationEndpoint}?response_type=code&client_id=${clientID}` +
                `&scope=openid+${asgardeoSdkScopes.replaceAll(
                    '|',
                    '+'
                )}&redirect_uri=${signInRedirectURL}` +
                `&response_mode=query&code_challenge_method=S256&code_challenge=${codeChallenge}` +
                `&fidp=${fidp}&state=${state}${ASGARDEO_STATE_SUFFIX_CHOREO}${captchaInfo ? captchaInfoQueryParam : ''
                }${username ? `&username=${username}` : ''}`
            );
        },
        [codeChallenge]
    );

    return [getAuthRequestURL, codeChallenge];
};
