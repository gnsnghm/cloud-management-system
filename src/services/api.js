import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const registerUser = (userData) =>
  axios.post(`${API_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);

export const createCloudProvider = (providerData) =>
  axios.post(`${API_URL}/cloud-provider`, providerData);
export const createDataCenter = (dataCenterData) =>
  axios.post(`${API_URL}/data-center`, dataCenterData);
export const createCloudPool = (cloudPoolData) =>
  axios.post(`${API_URL}/cloud-pool`, cloudPoolData);
export const createVirtualMachine = (vmData) =>
  axios.post(`${API_URL}/virtual-machines`, vmData);
export const createUser = (userData) =>
  axios.post(`${API_URL}/users`, userData);
export const createUnit = (unitData) =>
  axios.post(`${API_URL}/units`, unitData);
export const createStorage = (storageData) =>
  axios.post(`${API_URL}/storage`, storageData);
export const createOS = (osData) => axios.post(`${API_URL}/os`, osData);
export const createDisk = (diskData) =>
  axios.post(`${API_URL}/disks`, diskData);

export const getCloudProviders = () => axios.get(`${API_URL}/cloud-provider`);
export const getDataCenters = () => axios.get(`${API_URL}/data-center`);
export const getCloudPools = () => axios.get(`${API_URL}/cloud-pool`);
export const getUnits = () => axios.get(`${API_URL}/units`);
export const getOperatingSystems = () => axios.get(`${API_URL}/os`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getDisks = () => axios.get(`${API_URL}/disks`);
export const getStorage = () => axios.get(`${API_URL}/storage`);
export const getVirtualMachines = () =>
  axios.get(`${API_URL}/virtual-machines`);

export const updateCloudProvider = (id, data) =>
  axios.put(`${API_URL}/cloud-provider/${id}`, data);
export const deleteCloudProvider = (id) =>
  axios.delete(`${API_URL}/cloud-provider/${id}`);

export const updateDataCenter = (id, data) =>
  axios.put(`${API_URL}/data-center/${id}`, data);
export const deleteDataCenter = (id) =>
  axios.delete(`${API_URL}/data-center/${id}`);

export const updateCloudPool = (id, data) =>
  axios.put(`${API_URL}/cloud-pool/${id}`, data);
export const deleteCloudPool = (id) =>
  axios.delete(`${API_URL}/cloud-pool/${id}`);

export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
export const updateUser = (id, userData) =>
  axios.put(`${API_URL}/users/${id}`, userData);

export const deleteUnit = (id) => axios.delete(`${API_URL}/units/${id}`);
export const updateUnit = (id, userData) =>
  axios.put(`${API_URL}/units/${id}`, userData);

export const updateOS = (id, data) => axios.put(`${API_URL}/os/${id}`, data);
export const deleteOS = (id) => axios.delete(`${API_URL}/os/${id}`);

export const updateStorage = (id, data) =>
  axios.put(`${API_URL}/storage/${id}`, data);
export const deleteStorage = (id) => axios.delete(`${API_URL}/storage/${id}`);

export const updateVirtualMachine = (id, data) =>
  axios.put(`${API_URL}/virtual-machines/${id}`, data);
export const deleteVirtualMachine = (id) =>
  axios.delete(`${API_URL}/virtual-machines/${id}`);

export const updateDisk = (id, data) =>
  axios.put(`${API_URL}/disks/${id}`, data);
export const deleteDisk = (id) => axios.delete(`${API_URL}/disks/${id}`);
