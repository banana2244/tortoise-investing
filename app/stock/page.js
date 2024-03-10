import React from "react";
import { parseCsv } from "./csvUtils";
import StockChart from "./stockChart";

import { getStockData, getAssetData } from "./stock";

export default function Stock() {
  const { dates, stockPrices } = getStockData("SPY", 2015, "monthly");
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
