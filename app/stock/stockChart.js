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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const Home = () => {
  const [showSecondDataset, setShowSecondDataset] = useState(false);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      ...(showSecondDataset
        ? [
            {
              label: "Dataset 2",
              data: labels.map(() =>
                faker.datatype.number({ min: -1000, max: 1000 })
              ),
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
      <div>
        <label>
          <input
            type="checkbox"
            checked={showSecondDataset}
            onChange={handleSecondDatasetChange}
          />
          Show Second Dataset
        </label>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Home;
