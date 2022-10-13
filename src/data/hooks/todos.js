/**
 * These hooks are DEPRECATED ⚠️ ⛔️ , Look `tasks.js` for newer version of this.
 */
import { useEffect, useState } from "react";
import useUser from "./user";

export function useTodos() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const user = useUser();

  const refetch = async (status = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, { headers: { Authorization: `bearer ${user.accessToken}` } });
      const data = await response.json();
      if (status.stale !== true) {
        setData(data);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    let status = { stale: false };
    refetch(status);
    return () => {
      status.stale = true;
    }
  }, [])
  return { data, isLoading, error, refetch, setData };
}

export function useDeleteTodo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState();
  const user = useUser();

  const deleteTodo = async (todo, { onSuccess }) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        headers: {
          Authorization: `bearer ${user.accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      });
      if (!response.ok) {
        setError(response);
        console.error(response);
        setStatus('error');
      }
      const data = await response.json();
      setData(data);
      setStatus('success');
      onSuccess(todo);
    } catch (error) {
      setError(error);
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }
  return {
    deleteTodo, data, isLoading, error, isSuccess: status === 'success', isError: status === 'error'
  }
}


export function useUpdateTodo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState();
  const user = useUser();

  const updateTodo = async (updatedTodo, { onSuccess }) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${updatedTodo.id}`, {
        headers: {
          Authorization: `bearer ${user.accessToken}}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(updatedTodo), // body data type must match "Content-Type" header
      });
      if (!response.ok) {
        setError(response);
        console.error(response);
        setStatus('error');
      }
      const data = await response.json();
      setData(data);
      setStatus('success');
      onSuccess(data);
    } catch (error) {
      setError(error);
      console.error(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }
  return {
    updateTodo, data, isLoading, error, isSuccess: status === 'success', isError: status === 'error'
  }
}
