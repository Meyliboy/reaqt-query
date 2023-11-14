import { useEffect, useState } from "react";
import axios from "axios";
import { CoinData } from "../types/coinsParams";
import LoadingComponent from "../utils/LoadingComponent";

const Produscts = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCoins(): Promise<void> {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products?limit=10`
        );
        setCoins(data.products);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return (
    <div className="w-full h-screen bgColor flex justify-center items-center">
      <div>
        {loading && (
          <h2>
            <LoadingComponent />
          </h2>
        )}
        {error && <h2>Error fetching data.</h2>}
        {!loading && !error && coins.length === 0 && (
          <h2>No data available.</h2>
        )}
        {coins.length ? (
          <div>
            <h1>Simple GET</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Raiting
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-500 transition-all duration-500"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {coin.title}
                    </td>
                    <td className="px-6 py-4">{coin.rating}</td>
                    <td className="px-6 py-4">{coin.stock}</td>
                    <td className="px-6 py-4">${coin.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Produscts;
