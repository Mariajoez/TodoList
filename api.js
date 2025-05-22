import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Make sure this matches your backend

export const getTodos = () => axios.get(`${BASE_URL}/todos`);
export const addTodo = (content) => axios.post(`${BASE_URL}/todos`, { content });
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/todos/${id}`);
export const updateTodo = (id, updates) => axios.put(`${BASE_URL}/todos/${id}`, updates);
export const summarizeAndSend = () => axios.post(`${BASE_URL}/summarize`);
