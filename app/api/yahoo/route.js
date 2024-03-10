import { NextRequest } from "next/server";

export async function GET(req, { params }) {
  // return Response.json({
  //   message: "Hello from the Yahoo Finance API",
  //   params: req.nextUrl.searchParams.get("q"),
  //   hi: "hi",
  // });
  const ticker = req.nextUrl.searchParams.get("ticker");
  console.log("ticker", ticker);
  const apiUrl = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=728317800&period2=1710008217&interval=1wk&events=history&includeAdjustedClose=true`;

  try {
    const response = await fetch(apiUrl);
    const csvData = await response.text();
    return new Response(csvData, {
      headers: {
        "Content-Type": "text/csv",
      },
    });
  } catch (error) {
    console.error("Error fetching data from Yahoo Finance API:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
