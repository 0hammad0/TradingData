import PropTypes from "prop-types";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import Button from "./Button";

const StockChart = (props) => {
  const { chartData, symbol } = props;
  const { day, week, year } = chartData;

  const [formatOption, setFormatOption] = useState(["24h", "7d", "1y"]);
  const [dateFormat, setDateFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color = determineTimeFormat()
    ? determineTimeFormat()[determineTimeFormat().length - 1].y -
        determineTimeFormat()[0].y >
      0
      ? "#26C281"
      : "#ed3419"
    : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: { format: "MMM dd HH:MM" },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      {formatOption.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Button
              setDateFormat={setDateFormat}
              item={item}
              dateFormat={dateFormat}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StockChart;

StockChart.chartData = {
  chartData: PropTypes.array,
  symbol: PropTypes.string,
  day: PropTypes.array,
  week: PropTypes.array,
  year: PropTypes.array,
};
