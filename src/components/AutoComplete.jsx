import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { watchListContext } from "../context/watchListContext";

const AutoComplete = () => {
  const { addStock } = useContext(watchListContext);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });

        setResults(res.data.result);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    search !== "" ? fetchData() : setResults([]);
  }, [search]);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;

    return (
      <ul
        style={{
          maxWidth: "100%",
          minWidth: "100%",
          minHeight: "100px",
          maxHeight: "400px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {loading ? (
          <div className="spinner center">
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
          </div>
        ) : (
          results.map((result) => {
            return (
              <li
                onClick={() => {
                  setSearch(""), addStock(result.symbol);
                }}
                key={result.symbol}
                className="dropdown-item"
              >
                {result.description} ({result.symbol})
              </li>
            );
          })
        )}
      </ul>
    );
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  );
};

export default AutoComplete;
