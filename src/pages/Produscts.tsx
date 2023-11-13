import { useEffect, useState } from "react";
import axios from "axios";
import CryptoCurrency from "../types/coinsParams";

const Produscts = () => {
  const [coins, setCoins] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCoins(): Promise<void> {
      try {
        const { data } = await axios.get(
          `https://api.coincap.io/v2/assets?limit=10`
        );
        setCoins(data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <table className="border border-red-600 p-3 w-[200px]">
        <thead className="border w-full">
          <tr className="border p-2 w-full">
            <th className="border p-2">symbol</th>
            <th className="border p-2">name</th>
            <th className="border p-2">supply</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Error fetching data.
              </td>
            </tr>
          )}
          {!loading && !error && coins.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No data available.
              </td>
            </tr>
          )}
          {coins.map((coin) => (
            <tr key={coin.id} className="border">
              <td className="border p-2">{coin.symbol}</td>
              <td className="border p-2">{coin.name}</td>
              <td className="border p-2">{coin.supply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produscts;
