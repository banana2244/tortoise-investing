import fs from "fs";
import Papa from "papaparse";

/*
 * Load raw csv data
 * Data formatted as
 * Date, Open, High, Low, Close, Adj Close, Volume
 */
function loadCsv(ticker) {
  const filePath = "data/" + ticker + ".csv";
  const file = fs.readFileSync(filePath, "utf-8");
  const data = Papa.parse(file, { header: true }).data;
  return data;
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
 * RETURN {data['Date', 'Close'], Error}
 */
export function getStockData(
  ticker = "SPY",
  startYear = 2010,
  intervalName = "weekly"
) {
  const intervals = {
    weekly: 0,
    biweekly: 2,
    monthly: 4,
  };

  if (!intervalName in intervals) {
    return {
      data: null,
      error: `Invalid interval name: ${intervalName}\nExpected: ${Object.keys(
        intervals
      )}`,
    };
  }

  const interval = intervals[intervalName];

  const raw_data = loadCsv(ticker);

  const filtered_data = raw_data
    .filter((row, i) => i % interval === 0)
    .filter((row) => parseDate(row["Date"]).year >= startYear)
    .map((row) => ({
      date: parseDate(row["Date"]),
      close: Number(row["Close"]),
    }));

  return filtered_data;
}

/*
 *  Params
 *  stock_data - stock datapoints, each data point will be invested on for the investAmount
 *  investAmount - the amount of usd to invest into the stock at each data point
 * Returns total assets for each interval
 */
export function getAssetData(stock_data, investAmount) {
  const runningShares = 0;
  const accountBalances = [];

  const assetList = stock_data.map((data) => {
    stockPrice = data.close;
    numShares = investAmount / stockPrice;
    runningShares += stockToBuy;

    currentAssets = runningShares * stockPrice;
    return currentAssets;
  });
}
