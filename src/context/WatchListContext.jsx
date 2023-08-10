import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const watchListContext = createContext();

const LOCAL_STORAGE_TOKEN = "stocks";

export const WatchListContextProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN))
  );

  const addStock = (symbol) => {
    if (watchList.indexOf(symbol) === -1) {
      setWatchList([...watchList, symbol]);

      localStorage.setItem(
        LOCAL_STORAGE_TOKEN,
        JSON.stringify([...watchList, symbol])
      );
    }
  };

  const deleteStock = (symbol) => {
    const newStock = watchList.filter((stock) => stock !== symbol);
    setWatchList(newStock);

    localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(newStock));
  };

  return (
    <watchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {children}
    </watchListContext.Provider>
  );
};

WatchListContextProvider.propTypes = {
  children: PropTypes.node,
};
