"use client";

/*
 * Expected Params
 * totalProfit
 * percentProfit
 * totalContributions
 * totalBalance
 */
export default function StockSummary({ stats }) {
  let moneyColor =
    stats.percentProfit > 0
      ? "text-green-700 dark:text-green-400"
      : "text-red-700 dark:text-red-400";
  let moneySummary =
    stats.percentProfit > 0 ? "missed out on" : "dodged a loss of";
  let moneyStatus = stats.percentProfit > 0 ? "increased" : "decreased";

  return (
    <div className="text-2xl w-full pt-4 flex justify-center items-center">
      <div className="flex flex-col w-full p-10 shadow-lg rounded-xl dark:bg-stone-800 dark:shadow-stone-700 dark:shadow-inner ">
        <h2 className="w-full text-4xl py-2 font-bold">Fast Stats</h2>
        <hr className="w-full py-2 border-stone-300" />
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="font-normal">Total Profit</th>
              <th className="font-normal">Percent Gain</th>
              <th className="font-normal">Total Balance</th>
              <th className="font-normal">Total Contribution</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-light">
              <td className={moneyColor}>${stats.totalProfit}</td>
              <td className={moneyColor}>{stats.percentProfit}%</td>
              <td>${stats.totalBalance}</td>
              <td>${stats.totalContributions}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="w-full text-4xl py-2 font-bold pt-6">Summary</h2>
        <hr className="w-full py-2 border-stone-300" />
        <p className="py-4">
          Starting in {stats.startYear}, you began investing ${stats.deposit} on
          a {stats.interval} basis. You invested a total of $
          {stats.totalContributions} into {stats.stock}. Had you placed your
          money into a savings account instead, you would've {moneySummary}{" "}
          <span className={moneyColor}>${Math.abs(stats.totalProfit)}</span>.
          This means that by simply following the DCA strategy for {stats.stock}
          , you would've {moneyStatus} your money by{" "}
          <span className={moneyColor}>{Math.abs(stats.percentProfit)}%</span>
        </p>
      </div>
    </div>
  );
}
