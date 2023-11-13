import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { CoinData } from "../types/coinsParams";
import { useState } from "react";

// Define the type for the error returned by fetchCoins
interface FetchCoinsError {
  message: string;
}

// Define the type for the loading state
// type LoadingState = boolean;

// Define the type for the error state
// type ErrorState = FetchCoinsError | null;

// Define the type for the useQuery hook result
type UseQueryResultWithTypes = UseQueryResult<
  CoinData[],
  FetchCoinsError | null
>;

async function fetchCoins(skip: number = 0): Promise<CoinData[]> {
  /* skip => o'tkazib yuborish: 10ni o'tkazish */
  const { data } = await axios.get(
    `https://dummyjson.com/products?skip=${skip}&limit=10`
  );
  return data.products;
}

const GetProductWithReactQuery = () => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isError }: UseQueryResultWithTypes = useQuery(
    ["coins", page] /* query params */,
    () => fetchCoins(page) /* Fetch data */,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    } /* ma'lumot galincha aldingisi yo'qolmidi */
  );

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <table className="border p-3 w-[800px]">
          <thead className="w-full">
            <tr className="p-2 w-full">
              <th className="p-2">№</th>
              <th className="p-2 border">symbol</th>
              <th className="p-2 border">name</th>
              <th className="p-2 border">price</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <p>Loading ...</p>}
            {isError && <p>Error pri polucheniya dannix</p>}
            {!data && <p>Empty dataBase</p>}
            {data?.map((coin) => (
              <tr key={coin.id} className="border">
                <td className="p-3">{coin.id}</td>
                <td className="border p-2">{coin.brand}</td>
                <td className="border p-2">{coin.title}</td>
                <td className="border p-2">${coin.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-evenly mt-2">
        <button
          className="px-5 py-1 rounded-md bg-red-300 active:bg-red-500 focus:bg-red-500"
          onClick={() => setPage((p) => p - 10)}
          disabled={!page}
        >
          ← ortga
        </button>
        <button
          className="px-5 py-1 rounded-md bg-sky-300 active:bg-sky-500 focus:bg-sky-500"
          onClick={() => setPage((p) => p + 10)}
        >
          keyingi →
        </button>
      </div>
    </div>
  );
};

export default GetProductWithReactQuery;
