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
  axios.post(`${API_URL}/virtual-machine`, vmData);
export const createUser = (userData) =>
  axios.post(`${API_URL}/users`, userData);
export const createUnit = (unitData) => axios.post(`${API_URL}/unit`, unitData);
export const createStorage = (storageData) =>
  axios.post(`${API_URL}/storage`, storageData);
export const createOS = (osData) => axios.post(`${API_URL}/os`, osData);
export const createDisk = (diskData) => axios.post(`${API_URL}/disk`, diskData);

export const getCloudProviders = () => axios.get(`${API_URL}/cloud-provider`);
export const getDataCenters = () => axios.get(`${API_URL}/data-center`);
export const getCloudPools = () => axios.get(`${API_URL}/cloud-pool`);
export const getUnits = () => axios.get(`${API_URL}/unit`);
export const getOperatingSystems = () => axios.get(`${API_URL}/os`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getDisks = () => axios.get(`${API_URL}/disks`);
export const getStorage = () => axios.get(`${API_URL}/storage`);
export const getVirtualMachines = () => axios.get(`${API_URL}/virtual-machine`);
