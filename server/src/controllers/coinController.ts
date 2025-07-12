import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Coin } from "../models/Coin";
import { History } from "../models/History";

export const getCoins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    await Coin.deleteMany({});
    const coins = data.map((coin: any) => ({
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      lastUpdated: new Date(coin.last_updated),
    }));
    await Coin.insertMany(coins);

    res.json(coins);
  } catch (err) {
    next(err);
  }
};

export const saveHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coins = await Coin.find();
    if (!coins.length) {
      return res.status(400).json({ message: "No coins to save." });
    }

    const historyDocs = coins.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      priceUsd: coin.priceUsd,
      marketCap: coin.marketCap,
      change24h: coin.change24h,
      lastUpdated: new Date(),
    }));

    await History.insertMany(historyDocs);

    res.json({ message: "History saved successfully." });
  } catch (err) {
    next(err);
  }
};
