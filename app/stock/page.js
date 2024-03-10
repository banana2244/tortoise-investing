"use server";
import StockChart from "./stockChart";
import StockSummary from "./stockSummary";

import { getStockData, getAssetData } from "./stock";
import { Grid, TextField, Select, MenuItem, Button } from "@mui/material";
import { type } from "os";

export default async function Stock({ searchParams }) {
  let stock = searchParams.stock;
  let deposit = searchParams.deposit;
  let interval = searchParams.interval;
  let startYear = searchParams.startYear;
  console.log(stock, deposit, interval, startYear);
  if (!stock || !deposit || !interval || !startYear) {
    stock = "SPY";
    deposit = 100;
    interval = "monthly";
    startYear = 2014;
    console.log("Incomplete search params, using default values");
  }
  const { dates, stockPrices, error } = await getStockData(
    stock,
    startYear,
    interval
  );
  if (error != "null" && error != null) {
    return (
      <div>
        <p>An error occurred while obtaining stock data</p>
        <p>{error}</p>
      </div>
    );
  }

  const assetData = await getAssetData(stockPrices, deposit);

  //make array for the contributions based on the assetData.assets
  const contributions = assetData.assets.map((asset, index) => {
    return index * deposit;
  });

  const totalContributions = assetData.assets.length * deposit;
  const totalBalance = assetData.assets[assetData.assets.length - 1];
  const totalProfit = totalBalance - totalContributions;
  const percentProfit = (totalProfit / totalBalance) * 100;
  const stats = {
    totalProfit: Math.round(totalProfit * 100) / 100,
    percentProfit: Math.round(percentProfit * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalBalance: Math.round(totalBalance * 100) / 100,
  };

  return (
    <div className="w-full px-[10%] py-5 flex flex-col gap-10 items-stretch">
      <div className="text-xl w-full p-10 flex flex-col gap-2 justify-center shadow-md rounded-xl">
        <h2 className="w-full text-3xl py-2 font-bold">The DCA Advantage</h2>
        <hr className="w-full" />
        <p>
          The Dollar Cost Averaging is a simple investment strategy that is best
          employed on large stock indicies over a long period of time. It
          reduces{" "}
        </p>
      </div>

      <form action="/stock">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField label="Stock" name="stock" defaultValue={stock} />
          </Grid>
          <Grid item>
            <TextField
              label="Deposit"
              type="number"
              inputProps={{ min: 0 }}
              name="deposit"
              defaultValue={100}
            />
          </Grid>
          <Grid item>
            <Select name="interval" defaultValue={interval}>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="biweekly">Biweekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select name="startYear" defaultValue={startYear}>
              <MenuItem value={2024 - 10}>10 Years</MenuItem>
              <MenuItem value={2024 - 5}>5 Years</MenuItem>
              <MenuItem value={2024 - 2}>2 Years</MenuItem>
              <MenuItem value={2 - 1}>1 Year</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#1976D2",
                transition: "background-color 0.3s",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
        <StockChart stockPrices={stockPrices} dates={dates} stock={stock} />
        <StockChart
          stockPrices={assetData.assets}
          dates={dates}
          secondPrices={contributions}
          stock={stock}
        />
      </div>
      <div>
        <StockSummary stats={stats} />
      </div>
    </div>
  );
}
