"use client";

/*
 * Expected Params
 * totalProfit
 * percentProfit
 * totalContributions
 * totalBalance
 */
export default function StockSummary({ stats }) {
  return (
    <div className="text-2xl w-full pt-4 flex justify-center items-center">
      <div className="flex flex-col w-full p-10 shadow-md rounded-xl">
        <h2 className="w-full text-4xl py-2 font-bold">Fast Stats</h2>
        <hr className="w-full" />
        <table className="w-full">
          <tr className="text-left">
            <th className="font-normal">Total Profit</th>
            <th className="font-normal">Percent Gain</th>
            <th className="font-normal">Total Balance</th>
            <th className="font-normal">Total Contribution</th>
          </tr>

          <tr className="font-light">
            <td
              className={`${
                stats.totalProfit > 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              ${stats.totalProfit}
            </td>
            <td
              className={`${
                stats.percentProfit > 0 ? "text-green-600" : "text-red-700"
              }`}
            >
              {stats.percentProfit}%
            </td>
            <td>${stats.totalBalance}</td>
            <td>${stats.totalContributions}</td>
          </tr>
        </table>

        <h2 className="w-full text-4xl py-2 font-bold pt-6">Summary</h2>
        <hr className="w-full" />
      </div>
    </div>
  );
}
