import { Schema, model, Document } from "mongoose";

export interface ICoin extends Document {
  name: string;
  symbol: string;
  priceUsd: number;
  marketCap: number;
  change24h: number;
  lastUpdated: Date;
}

const CoinSchema = new Schema<ICoin>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [1, "Name must be at least 1 character"],
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      uppercase: true,
      trim: true,
      minlength: [1, "Symbol must be at least 1 character"],
    },
    priceUsd: {
      type: Number,
      required: [true, "Price (USD) is required"],
      min: [0, "Price cannot be negative"],
    },
    marketCap: {
      type: Number,
      required: [true, "Market cap is required"],
      min: [0, "Market cap cannot be negative"],
    },
    change24h: {
      type: Number,
      required: [true, "24h % Change is required"],
    },
    lastUpdated: {
      type: Date,
      required: [true, "Last updated is required"],
    },
  },
  { timestamps: true }
);

export const Coin = model<ICoin>("Coin", CoinSchema);
