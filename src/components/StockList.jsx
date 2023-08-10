import React, { useState, useEffect, useContext } from "react";
import UpArrow from "../Icons/UpArrow";
import DownArrow from "../Icons/DownArrow";
import finnHub from "../apis/finnHub";
import { watchListContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";

export default function StockList() {
  const { watchList, deleteStock } = useContext(watchListContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Promise.all(
          watchList.map(async (item) => {
            return finnHub.get(`/quote`, {
              params: {
                symbol: item,
              },
            });
          })
        );

        const data = res.map((res) => {
          return {
            data: res.data,
            symbol: res.config.params.symbol,
          };
        });

        setStock(data);
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    };

    fetchData();
  }, [watchList]);

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const renderIcon = (change) => {
    return change > 0 ? <UpArrow /> : <DownArrow />;
  };

  const handleNavigate = (symbol) => {
    navigate(`/detail/${symbol}`);
  };

  if (loading)
    return (
      <>
        <div className="loading">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      </>
    );

  return (
    <>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Change</th>
            <th scope="col">Change%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stock, index) => {
            return (
              <React.Fragment key={index}>
                <tr
                  style={{ cursor: "pointer" }}
                  className="table-row"
                  onClick={() => handleNavigate(stock.symbol)}
                >
                  <th scope="col">{stock.symbol}</th>
                  <th>{stock.data.c}</th>
                  <th className={`text-${changeColor(stock.data.d)}`}>
                    {stock.data.d} {renderIcon(stock.data.d)}
                  </th>
                  <th className={`text-${changeColor(stock.data.dp)}`}>
                    {stock.data.dp} {renderIcon(stock.data.dp)}
                  </th>
                  <th>{stock.data.h}</th>
                  <th>{stock.data.l}</th>
                  <th>{stock.data.o}</th>
                  <th>
                    {stock.data.pc}
                    {"  "}
                    <button
                      className="btn btn-danger btn-sm ml-5 d-inline-block delete-button"
                      onClick={() => deleteStock(stock.symbol)}
                    >
                      remove
                    </button>
                  </th>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
