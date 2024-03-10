"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required scales and elements
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

/*
 * Returns stock data starting at the specified year, with datapoints
 * that have a spacing of interval days between the
 */
export function getStockData(ticker, year, interval) {}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      type: "category",
    },
    y: {
      type: "linear",
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

const StockChart = ({ stockPrices, dates, secondPrices }) => {
  const [showSecondDataset, setShowSecondDataset] = useState(false);

  // Format the labels based on the dates
  const labels = dates.map((date, index) => {
    const { year, month } = date;
    const prevDate = index > 0 ? dates[index - 1] : null;

    if (prevDate && prevDate.year === year) {
      // If the year is the same as the previous date, display only the month
      return new Date(year, month - 1).toLocaleString("default", {
        month: "short",
      });
    } else {
      // If the year is different from the previous date, display the year and month
      return new Date(year, month - 1).toLocaleString("default", {
        year: "numeric",
        month: "short",
      });
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock Prices",
        data: stockPrices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      ...(secondPrices && showSecondDataset
        ? [
            {
              label: "Contributions",
              data: secondPrices,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ]
        : []),
    ],
  };

  const handleSecondDatasetChange = (event) => {
    setShowSecondDataset(event.target.checked);
  };

  return (
    <div>
      {secondPrices && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={showSecondDataset}
              onChange={handleSecondDatasetChange}
            />
            Show Contributions
          </label>
        </div>
      )}
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;
