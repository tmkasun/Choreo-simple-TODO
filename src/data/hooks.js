import { useEffect, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = "eyJ4NXQiOiJNV1E1TldVd1lXWmlNbU16WlRJek16ZG1NekJoTVdNNFlqUXlNalZoTldNNE5qaGtNR1JtTnpGbE1HSTNaRGxtWW1Rek5tRXlNemhoWWpCaU5tWmhZdyIsImtpZCI6Ik1XUTVOV1V3WVdaaU1tTXpaVEl6TXpkbU16QmhNV000WWpReU1qVmhOV000Tmpoa01HUm1OekZsTUdJM1pEbG1ZbVF6Tm1FeU16aGhZakJpTm1aaFl3X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3M2NjYmZmYS04YjQyLTQxOTAtYjI5MC1lZjkxNGIxNTI2MDAiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlZNelBrUWluZmZlNW5WbDZOR0pNZF9HVzhxUWEiLCJuYmYiOjE2NjQyODg0NTksImF6cCI6IlZNelBrUWluZmZlNW5WbDZOR0pNZF9HVzhxUWEiLCJzY29wZSI6ImRlZmF1bHQiLCJvcmdhbml6YXRpb24iOnsidXVpZCI6ImI5NTUwY2Y2LWY3ZGEtNGEzNy05NWFhLWNkYWU1N2ZjZDU4YiJ9LCJpc3MiOiJodHRwczpcL1wvc3RzLmNob3Jlby5kZXY6NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjc0Mjg4NDU4LCJpYXQiOjE2NjQyODg0NTksImp0aSI6IjZiNTQ2ZTRiLWI2OTktNDY2MS04YWIwLWU2YWMwYzRmMGQ2OSJ9.IY07kCRizW4hyBG30XkJLG51XQpCU4zgj7LDOQpPT5JLuU_G1flU5paM4zf46gdGWexZcZ4fBPEdhARYXEEfrnLB6JWVROszaf6QZAkCLHK0JuisvVw4VqDX0eVJoiWukHCIzEuWfiifkWOSU_464AvM639YApkTCeINIKAPjvY5zMmPLiAZdEdEfMb_SGSFNtCBUbvqucN5InIojO_HRZs_5pyqk7M1m8PffCp-CApMBnrq_0X0CIYtw2aqMUh3uOD0oBhhGSq7cgNqMNYetgftRQERAMqmDaOFInZLy-1ctC2KRumWKMwPvqAMRAEWbnjBDotiVYRl3rEHS2N2-nnP-dYb0RVnsncWu0JB0Fqo1aIYq_pqyklNaK6CovF9KuolXCiyHWTK1YYDrQt-THaKRnY80Q0oy2XvSsGMDZTpVtlLKcVZRxcpFoVJ3GgRmtPWOKmanYApZZfQB2hKi7Q3wrohvoXRU6th2gsoKCK3hbxDrgE0SFIxE1yiqeyBREDRhhPvBx4NuhLZTok9VAhiZKb2YdIWTF0lx8Zr4rVEsYjuxhmMouBOyqMvJkJZYxfKEWkbWjtphlnTVlrhTxLSDZIiBNOvRstXlcgRW0ZLPfWjTKxWUtRdJ12vt_HTkeka4rFjyBZc3CU_Ag_MMQj8vw7pLkcHg47-9WQkENM"

export function useTodos() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const refetch = async (status = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, { headers: { Authorization: `bearer ${API_TOKEN}` } });
      const data = await response.json();
      if (status.stale !== false) {
        setData(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    let status = { stale: false };
    refetch(status);
    return () => { status.stale = true; }
  }, [])
  return { data, isLoading, error, refetch, setData };
}

export function useAddTodo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState();
  const addTodo = async (newTodo) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      setData(data);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }
  return {
    addTodo, data, isLoading, error, isSuccess: status === 'success', isError: status === 'error'
  }
}


export function useDeleteTodo() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState();
  const deleteTodo = async (todo, { onSuccess }) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      });
      const data = await response.json();
      setData(data);
      setStatus('success');
      onSuccess(todo);
    } catch (error) {
      setError(error);
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
  const updateTodo = async (updatedTodo, { onSuccess }) => {
    setIsLoading(true);
    setData(null);
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${updatedTodo.id}`, {
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(updatedTodo), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      setData(data);
      setStatus('success');
      onSuccess(data);
    } catch (error) {
      setError(error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  }
  return {
    updateTodo, data, isLoading, error, isSuccess: status === 'success', isError: status === 'error'
  }
}
