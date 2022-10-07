import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";
import { API_BASE_URL } from "./todos";


export const TASK_STATUS = {
    INPROGRSS: 'inprogress',
    COMPLETED: 'completed',
    PENDING: 'pending',
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
        if(!tempData) {
            tempData = allTasks();
        }
        tempData.then(setData).finally(() => setIsLoading(false));
    }, [])

    return { data, isLoading, setData };
}

export const useTaskGroups = () => {
    const data = [
        { id: "foo", name: "Urgent & important" },
        { id: "bar", name: "Urgent, not important" },
        { id: "zoo", name: "Important, not urgent" },
        { id: "woo", name: "Not important and not urgent" }
    ]
    return { data };
}
