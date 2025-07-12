import React from "react";
import { useCoins } from "../hooks/useCoins";
import CryptoTable from "../components/CryptoTable";
import Loader from "../components/Loader";

const Dashboard: React.FC = () => {
  const { coins, loading, error } = useCoins();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && <CryptoTable coins={coins} />}

      <p className="mt-4 text-sm text-gray-500">
        Auto-refreshes every 30 minutes.
      </p>
    </div>
  );
};

export default Dashboard;
