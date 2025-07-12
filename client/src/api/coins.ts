import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface Coin {
  name: string;
  symbol: string;
  priceUsd: number;
  marketCap: number;
  change24h: number;
  lastUpdated: string;
}

export const getCoins = async (): Promise<Coin[]> => {
  const response = await axios.get(`${API_BASE_URL}/coins`);
  return response.data;
};

export const saveHistory = async (): Promise<void> => {
  await axios.post(`${API_BASE_URL}/history`);
};
