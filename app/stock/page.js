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
  const percentProfit = (totalBalance / totalContributions) * 100 - 100;
  const stats = {
    totalProfit: Math.round(totalProfit * 100) / 100,
    percentProfit: Math.round(percentProfit * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalBalance: Math.round(totalBalance * 100) / 100,
    startYear,
    deposit,
    stock,
    interval,
  };

  return (
    <div className="w-full">
      <div className="w-full px-[10%] py-8 pb-24 flex flex-col gap-10 items-stretch bg-offwhite">
        <div className="text-xl w-full p-10 flex flex-col gap-2 justify-center shadow-md rounded-xl greeny dark:bg-emerald-700">
          <h2 className="w-full text-3xl font-bold">The DCA Advantage</h2>
          <hr className="w-full py-2 border-green-700 dark:border-emerald-500" />
          <p>
            The Dollar Cost Averaging is a simple investment strategy. It works
            by investing a small amount of money every so often. This lets you
            average the cost of the stock and reduce the effect of volatility on
            your account. This strategy is most effective when employed on large
            indicies that track a wide range of companies, such as the S&P 500.
            It does not guarantee that you will not incur losses over a long
            period of time, but it helps to reduce the risk of individual
            investments over long periods of time by spreading them out and
            averaging them.
          </p>
        </div>

        <div className="w-full flex flex-col items-center justify-evenly p-10 shadow-lg rounded-xl dark:bg-stone-800 dark:shadow-stone-700 dark:shadow-inner">
          <h2 className="w-full text-3xl font-bold py-2">Select Simulation</h2>
          <hr className="w-full py-2 border-stone-300" />
          <form action="/stock" className="w-full">
            <div className="grid grid-cols-5 gap-4 items-stretch justify-center">
              <div className="flex flex-col">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Stock
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  defaultValue={stock}
                  className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-700 dark:text-white dark:border-gray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                />
              </div>
              <div>
                <label
                  htmlFor="deposit"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Deposit
                </label>
                <input
                  type="number"
                  id="deposit"
                  name="deposit"
                  min="0"
                  defaultValue={100}
                  className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-700 dark:text-white dark:border-gray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                />
              </div>
              <div>
                <label
                  htmlFor="interval"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Interval
                </label>
                <select
                  id="interval"
                  name="interval"
                  defaultValue={interval}
                  className="mt-1 px-3 py-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-700 dark:text-white dark:border-gray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="startYear"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Start Year
                </label>
                <select
                  id="startYear"
                  name="startYear"
                  defaultValue={startYear}
                  className="mt-1 px-3 py-2 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-700 dark:text-white dark:border-gray-600 dark:focus:ring-emerald-600 dark:focus:border-emerald-600"
                >
                  <option value={2024 - 10}>10 Years</option>
                  <option value={2024 - 5}>5 Years</option>
                  <option value={2024 - 2}>2 Years</option>
                  <option value={2024 - 1}>1 Year</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>

          <h2 className="w-full text-3xl font-bold py-2 pt-6">
            DCA Vs Savings Account
          </h2>
          <hr className="w-full py-2 border-stone-300" />
          <StockChart
            stockPrices={assetData.assets}
            dates={dates}
            secondPrices={contributions}
            stock={stock}
          />

          <h2 className="w-full text-3xl font-bold py-2 pt-6">{stock} Value</h2>
          <hr className="w-full py-2 border-stone-300" />
          <StockChart stockPrices={stockPrices} dates={dates} stock={stock} />
        </div>
        <div>
          <StockSummary stats={stats} />
        </div>
      </div>
      <footer className="w-full dark:bg-stone-800 dark:shadow-stone-700 shadow-inner py-10 px-[10%]">
        <h2 className="w-full text-3xl font-bold py-2 pt-6">Disclaimer</h2>
        <hr className="w-full border-stone-300" />
        <h3 className="w-full py-2 pt-4 font-bold">Not Investment Advice</h3>
        <p>
          We (the website owners) do not claim to be financial experts. The
          contents of this website are strictly for informative purposes only,
          and should not be considered financial advice. You alone assume the
          sole responsibility in evaluating the merits and risks associated with
          the use of the Content on this Site before making any decisions based
          on the Content of this Site. In exchange for access to this Site, you
          agree that you will not hold Tortoise Investing, its affiliates, or
          any third party service provider liable for any possible claim for
          damages arising from any dicision you have made based on information
          made available to you through this Site.
        </p>
        <h3 className="w-full py-2 pt-4 font-bold">Investing Risks</h3>
        <p>
          There is always an inherent risk when investing into securities.
          Investing into stocks, bonds, mutual funds, and money market funds
          involve risk of loss. A security or firm's past investment performance
          is not a guarantee or predictor of future investment performance.
        </p>
      </footer>
    </div>
  );
}
