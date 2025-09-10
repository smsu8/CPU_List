import axios from 'axios';

// Wenn dein Backend auf 8080 läuft:
const API_BASE = 'http://localhost:8080/api';

export const getCpus    = () => axios.get(`${API_BASE}/cpus`);
export const getCpuById = (id) => axios.get(`${API_BASE}/cpus/${id}`);
export const createCpu  = (cpu) => axios.post(`${API_BASE}/cpus`, cpu);
export const updateCpu  = (id, cpu) => axios.put(`${API_BASE}/cpus/${id}`, cpu);
export const deleteCpu  = (id) => axios.delete(`${API_BASE}/cpus/${id}`);
export const getSockets = () => axios.get(`${API_BASE}/sockets`);
