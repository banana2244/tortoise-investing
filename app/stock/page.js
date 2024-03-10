import React from "react";
import StockChart from "./stockChart";

import { getStockData, getAssetData } from "./stock";

export default async function Stock() {
  const { dates, stockPrices, error } = await getStockData(
    "SOXL",
    2015,
    "monthly"
  );

  console.log("\n\nGot stock data with error?: ", error);
  console.log("\n\nSTOCK DATA", stockPrices);

  if (error != "null" && error != null) {
    return (
      <div>
        <p>An error occurred while obtaining stock data</p>
        <p>{error}</p>
      </div>
    );
  }

  const assetData = getAssetData(stockPrices, 100);

  //make array for the contributions based on the assetData.assets
  const contributions = assetData.assets.map((asset, index) => {
    return index * 100;
  });
  return (
    <div className="">
      <StockChart stockPrices={stockPrices} dates={dates} />
      <StockChart
        stockPrices={assetData.assets}
        dates={dates}
        secondPrices={contributions}
      />
    </div>
  );
}
