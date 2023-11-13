import { useEffect, useState } from "react";
import axios from "axios";
import { CryptoCurrency } from "../types/coinsParams";

const Produscts = () => {
  const [coins, setCoins] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCoins(): Promise<void> {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
        );
        setCoins(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return (
    <div>
      <h1 className="text-center">simple</h1>
      <div className="w-full flex justify-center items-center">
        <table className="border p-3 w-[400px]">
          <thead className="w-full">
            <tr className="p-2 w-full">
              <th className="p-2"></th>
              <th className="p-2 border">symbol</th>
              <th className="p-2 border">name</th>
              <th className="p-2 border">current_price</th>
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
                <td className="border p-2">
                  <img width={30} src={coin.image} alt="img" />
                </td>
                <td className="border p-2">{coin.symbol}</td>
                <td className="border p-2">{coin.name}</td>
                <td className="border p-2">{coin.current_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produscts;
