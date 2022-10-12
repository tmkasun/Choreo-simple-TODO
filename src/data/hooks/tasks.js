import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";
import { fetchGraphQL } from "../utils/gqlHelper";
import { API_BASE_URL } from "./todos";
import useUser from "./user";

export const TASK_STATUS = {
    INPROGRSS: 'in-progress',
    COMPLETED: 'complete',
    OPEN: 'open',
}

const getRandomStatus = () => Object.values(TASK_STATUS)[Math.floor(Math.random() * (3))]

let tempData = null;
const allTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/todos`, { headers: { Authorization: `bearer ${getCookie('access_token')}` } });
    const data = await response.json();
    data.list = data.list.map(task => ({ ...task, status: getRandomStatus() }));
    return data;
}

export const useTasksByGroup = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!tempData) {
            tempData = allTasks();
        }
        tempData.then(setData).finally(() => setIsLoading(false));
    }, [])

    return { data, isLoading, setData };
}

export const useTaskGroups = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const user = useUser();
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchGraphQL(`
                                        {
                                            groups {
                                                id
                                                name
                                                tasks {
                                                    id
                                                    title
                                                    status
                                                }
                                            }
                                        }
                                        `,user)
                debugger;
                setData(data);
            } catch (error) {
                debugger;
                console.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { data, isLoading, error };
}
