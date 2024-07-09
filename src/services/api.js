import axios from "axios";

// 環境変数からAPIキーを取得
const API_KEY = process.env.REACT_APP_API_KEY || "your-api-key-here"; // 必要に応じてデフォルト値を設定

// Axiosインスタンスの作成
const apiClient = axios.create({
  baseURL: "http://" + process.env.REACT_APP_URL + "/api", // サーバーのベースURL
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY, // APIキーをヘッダーに追加
  },
});

// ユーザー登録とログイン
export const registerUser = (userData) => apiClient.post("/register", userData);
export const loginUser = (userData) => apiClient.post("/login", userData);

// クラウドプロバイダー関連
export const createCloudProvider = (providerData) =>
  apiClient.post("/cloud-provider", providerData);
export const getCloudProviders = () => apiClient.get("/cloud-provider");
export const updateCloudProvider = (id, data) =>
  apiClient.put(`/cloud-provider/${id}`, data);
export const deleteCloudProvider = (id) =>
  apiClient.delete(`/cloud-provider/${id}`);

// データセンター関連
export const createDataCenter = (dataCenterData) =>
  apiClient.post("/data-center", dataCenterData);
export const getDataCenters = () => apiClient.get("/data-center");
export const updateDataCenter = (id, data) =>
  apiClient.put(`/data-center/${id}`, data);
export const deleteDataCenter = (id) => apiClient.delete(`/data-center/${id}`);

// クラウドプール関連
export const createCloudPool = (cloudPoolData) =>
  apiClient.post("/cloud-pool", cloudPoolData);
export const getCloudPools = () => apiClient.get("/cloud-pool");
export const updateCloudPool = (id, data) =>
  apiClient.put(`/cloud-pool/${id}`, data);
export const deleteCloudPool = (id) => apiClient.delete(`/cloud-pool/${id}`);

// 仮想マシン関連
export const createVirtualMachine = (vmData) =>
  apiClient.post("/virtual-machines", vmData);
export const getVirtualMachines = () => apiClient.get("/virtual-machines");
export const updateVirtualMachine = (id, data) =>
  apiClient.put(`/virtual-machines/${id}`, data);
export const deleteVirtualMachine = (id) =>
  apiClient.delete(`/virtual-machines/${id}`);

// ユーザー関連
export const createUser = (userData) => apiClient.post("/users", userData);
export const getUsers = () => apiClient.get("/users");
export const updateUser = (id, userData) =>
  apiClient.put(`/users/${id}`, userData);
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);

// 単位関連
export const createUnit = (unitData) => apiClient.post("/units", unitData);
export const getUnits = () => apiClient.get("/units");
export const updateUnit = (id, userData) =>
  apiClient.put(`/units/${id}`, userData);
export const deleteUnit = (id) => apiClient.delete(`/units/${id}`);

// ストレージ関連
export const createStorage = (storageData) =>
  apiClient.post("/storage", storageData);
export const getStorage = () => apiClient.get("/storage");
export const updateStorage = (id, data) =>
  apiClient.put(`/storage/${id}`, data);
export const deleteStorage = (id) => apiClient.delete(`/storage/${id}`);

// OS関連
export const createOS = (osData) => apiClient.post("/os", osData);
export const getOperatingSystems = () => apiClient.get("/os");
export const updateOS = (id, data) => apiClient.put(`/os/${id}`, data);
export const deleteOS = (id) => apiClient.delete(`/os/${id}`);

// ディスク関連
export const createDisk = (diskData) => apiClient.post("/disks", diskData);
export const getDisks = () => apiClient.get("/disks");
export const updateDisk = (id, data) => apiClient.put(`/disks/${id}`, data);
export const deleteDisk = (id) => apiClient.delete(`/disks/${id}`);
