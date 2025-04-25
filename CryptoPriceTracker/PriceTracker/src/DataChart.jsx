import React from "react";
import sampleData from "./sampleData";
import "./App.css";
import { CiStar } from "react-icons/ci";
import { FaSortUp, FaSortDown } from "react-icons/fa6";

const DataChart = () => {
  return (
    <div className="w-screen h-screen overflow-x-auto p-4">
      {/* Header Row */}
      <div className="grid grid-cols-[0.1fr_1fr_4fr_2fr_2fr_2fr_2fr_3fr_3fr_3fr_3fr] font-semibold p-4 rounded shadow bg-gray-100">
        <div></div>
        <div>#</div>
        <div className="text-start">Name</div>
        <div className="text-end">Price</div>
        <div className="text-end">1h%</div>
        <div className="text-end">24h%</div>
        <div className="text-end">7d%</div>
        <div className="text-end">Market Cap</div>
        <div className="text-end">Volume (24h)</div>
        <div className="text-end">Circulating Supply</div>
        <div className="text-end">Last 7 Days</div>
      </div>

      {/* Data Rows */}
      {sampleData.map((coin, index) => (
        <div
          key={coin.id}
          className="grid grid-cols-[0.1fr_1fr_4fr_2fr_2fr_2fr_2fr_3fr_3fr_3fr_3fr] text-sm text-center items-center py-3 border-b hover:bg-gray-50 transition"
        >
          <div className=" items-end">
            <CiStar />
          </div>
          <div>{index + 1}</div>

          <div className="flex items-center gap-2">
            <img src={coin.logo} alt={coin.name} className="w-5 h-5" />
            <span className="font-medium">{coin.name}</span>
            <span className="text-gray-500 text-xs">({coin.symbol})</span>
          </div>

          <div className="text-end font-medium">
            ${coin.price.toLocaleString()}
          </div>

          <div
            className={`${
              coin.change1h >= 0 ? "text-green-500" : "text-red-500"
            } text-end font-medium`}
          >
            <span className="inline-flex items-center">
              {coin.change1h >= 0 ? <FaSortUp /> : <FaSortDown />}
            </span>
            {coin.change1h}%
          </div>

          <div
            className={`${
              coin.change24h >= 0 ? "text-green-500" : "text-red-500"
            } text-end font-medium`}
          >
            <span className="inline-flex items-center">
              {coin.change24h >= 0 ? <FaSortUp /> : <FaSortDown />}
            </span>
            {coin.change24h}%
          </div>

          <div
            className={`text-end font-medium ${
              coin.change7d >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="inline-flex items-center">
              {coin.change7d >= 0 ? <FaSortUp /> : <FaSortDown />}
            </span>
            {coin.change7d}%
          </div>

          <div className="text-end font-semibold">
            ${coin.marketCap.toLocaleString()}
          </div>
          <div className="text-end font-semibold">
            ${coin.volume24h.toLocaleString()}
          </div>
          <div className="text-end font-semibold">
            {coin.circulatingSupply.toLocaleString()} {coin.symbol}
          </div>

          <div className="flex justify-end mr-4">
            <img
              src={coin.chartUrl}
              alt={`${coin.name} 7D chart`}
              className="h-8"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataChart;
