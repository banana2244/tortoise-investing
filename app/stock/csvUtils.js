import fs from "fs";
const DATA_FOLDER = "";

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
 * Returns stock data starting at the specified year, with datapoints
 * that have a spacing of interval days between them
 */
export function getStockData(ticker, year, interval) {
  const raw_data = loadCsv(ticker);

  const filtered_data = [];
  raw_data.forEach((raw) => {
    if (true /*meets conditions*/) {
      filtered_data.push({
        Date: raw["Date"],
        Close: raw["Close"],
      });
    }
  });

  return filtered_data;
}
