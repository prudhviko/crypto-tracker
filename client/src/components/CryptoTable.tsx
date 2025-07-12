import React from "react";
import type { Coin } from "../api/coins";

interface Props {
  coins: Coin[];
}

const CryptoTable: React.FC<Props> = ({ coins }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Price (USD)</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">24h % Change</th>
            <th className="px-4 py-2 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr className="border-t">
              <td className="px-4 py-2">{coin.name}</td>
              <td className="px-4 py-2 uppercase">{coin.symbol}</td>
              <td className="px-4 py-2">${coin.priceUsd.toLocaleString()}</td>
              <td className="px-4 py-2">${coin.marketCap.toLocaleString()}</td>
              <td
                className={`px-4 py-2 ${
                  coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.change24h.toFixed(2)}%
              </td>
              <td className="px-4 py-2">
                {new Date(coin.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
