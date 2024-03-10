"use server";
import StockChart from "./stockChart";

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
    return index * 100;
  });
  return (
    <div className=" p-5">
      <form action="/stock">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField label="Stock" name="stock" />
          </Grid>
          <Grid item>
            <TextField
              label="Deposit"
              type="number"
              inputProps={{ min: 0 }}
              name="deposit"
            />
          </Grid>
          <Grid item>
            <Select name="interval">
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="biweekly">Biweekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select name="startYear">
              <MenuItem value={2024 - 10}>10 Years</MenuItem>
              <MenuItem value={2024 - 5}>5 Years</MenuItem>
              <MenuItem value={2024 - 2}>2 Years</MenuItem>
              <MenuItem value={2 - 1}>1 Year</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="">
        <StockChart stockPrices={stockPrices} dates={dates} />
        <StockChart
          stockPrices={assetData.assets}
          dates={dates}
          secondPrices={contributions}
        />
      </div>
    </div>
  );
}
