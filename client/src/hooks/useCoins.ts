import { useEffect, useState } from "react";
import { getCoins, type Coin } from "../api/coins";

export const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCoins = async () => {
    try {
      const data = await getCoins();
      setCoins(data);
    } catch (err) {
      setError("Failed to fetch coins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();

    const interval = setInterval(() => {
      fetchCoins();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error };
};
