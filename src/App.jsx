import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockDetailPage from "./pages/StockDetailPage";
import StockOverviewPage from "./pages/StockOverviewPage";
import PageNotFound from "./pages/NotFound404";
import { WatchListContextProvider } from "./context/WatchListContext";

function App() {
  return (
    <div className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />

            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
