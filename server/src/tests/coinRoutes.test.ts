import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import { Coin } from "../models/Coin";
import { History } from "../models/History";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Coin.deleteMany();
  await History.deleteMany();
});

describe("GET /api/coins", () => {
  it("should fetch coins and store them in the database", async () => {
    const res = await request(app).get("/api/coins");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(10);

    const dbCoins = await Coin.find();
    expect(dbCoins.length).toBe(10);

    const coin = dbCoins[0];
    expect(coin).toHaveProperty("name");
    expect(coin).toHaveProperty("symbol");
    expect(coin.priceUsd).toBeGreaterThanOrEqual(0);
    expect(coin.marketCap).toBeGreaterThanOrEqual(0);
    expect(coin.lastUpdated).toBeInstanceOf(Date);
  });
});

describe("POST /api/history", () => {
  it("should save coin snapshot into History collection", async () => {
    await request(app).get("/api/coins");

    const res = await request(app).post("/api/history");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "History saved successfully." });

    const histories = await History.find();
    expect(histories.length).toBe(10);

    const doc = histories[0];
    expect(doc).toHaveProperty("name");
    expect(doc).toHaveProperty("symbol");
    expect(doc.priceUsd).toBeGreaterThanOrEqual(0);
  });

  it("should fail if no coins exist", async () => {
    const res = await request(app).post("/api/history");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "No coins to save." });
  });
});
