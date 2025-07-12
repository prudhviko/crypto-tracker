import cron from "node-cron";
import axios from "axios";
import { History } from "../models/History";

export const startCronJob = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running cron job to save history...");
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );

      const historyDocs = data.map((coin: any) => ({
        name: coin.name,
        symbol: coin.symbol,
        priceUsd: coin.current_price,
        marketCap: coin.market_cap,
        change24h: coin.price_change_percentage_24h,
        lastUpdated: new Date(coin.last_updated),
      }));

      await History.insertMany(historyDocs);
      console.log("History saved.");
    } catch (err) {
      console.error("Cron job failed:", err);
    }
  });
};
