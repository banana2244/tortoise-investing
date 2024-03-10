"use server";
import fs from "fs";
import Papa from "papaparse";

/*
 * Load raw csv data
 * Data formatted as
 * Date, Open, High, Low, Close, Adj Close, Volume
 *
 * Returns
 * data
 * error
 */
async function loadCsv(ticker) {
  // If we don't have the file, get it from yahoo
  const request = await fetch(
    `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=728317800&period2=1710008217&interval=1wk&events=history&includeAdjustedClose=true`
  );

  if (!request.ok) {
    console.error(
      "ERROR: Failed to obtain csv data from yahoo\n",
      request.statusText
    );
    return {
      data: null,
      error: request.statusText,
    };
  }

  const response = await request.text();
  const data = await Papa.parse(response, { header: true }).data;
  return { data: data, error: null };
}

/*
 * Converts YYYY-MM-DD format to json object ["year", "month", "day"]
 */
function parseDate(raw) {
  const values = raw.split("-");

  try {
    return {
      year: Number(values[0]),
      month: Number(values[1]),
      day: Number(values[2]),
    };
  } catch (error) {
    console.error(`ERROR: Received invalid date: ${raw}\n`, error);
    return { year: 0, month: 0, day: 0 };
  }
}

/*
 * Returns stock data starting at the specified year, with datapoints
 * that have a spacing of interval days between them
 * RETURN {dates[], stockPrices[], error}
 */
export async function getStockData(
  ticker = "SPY",
  startYear = 2010,
  intervalName = "weekly"
) {
  const intervals = {
    weekly: 1,
    biweekly: 2,
    monthly: 4,
  };

  if (!intervalName in intervals) {
    return {
      dates: null,
      stockPrices: null,
      error: `Invalid interval name: ${intervalName}\nExpected: ${Object.keys(
        intervals
      )}`,
    };
  }

  const interval = intervals[intervalName];

  const { data, error } = await loadCsv(ticker);
  if (error != null) {
    return { dates: null, stockPrices: null, error: error };
  }

  const dates = [];
  const stockPrices = [];

  data
    .filter((row, i) => i % interval === 0)
    .filter((row) => parseDate(row["Date"]).year >= startYear)
    .forEach((row) => {
      dates.push(parseDate(row["Date"]));
      stockPrices.push(Number(row["Close"]));
    });

  return {
    dates: dates,
    stockPrices: stockPrices,
    error: null,
  };
}

/*
 *
 *  Params
 *  stock_data - stock datapoints, each data point will be invested on for the investAmount
 *  investAmount - the amount of usd to invest into the stock at each data point
 *
 *  Returns
 *  total assets for each interval
 *  total shares bought
 */
export async function getAssetData(stockPrices, investAmount) {
  let runningShares = 0;

  const assetList = stockPrices.map((stockPrice) => {
    const numShares = investAmount / stockPrice;
    runningShares += numShares;

    const currentAssets = runningShares * stockPrice;
    return Math.round(100 * currentAssets) / 100;
  });

  return {
    assets: assetList,
    totalShares: runningShares,
  };
}

// export function limitDataPoints(data, maxDataPoints) {
//   totalDataPoints = data.length;
// }
