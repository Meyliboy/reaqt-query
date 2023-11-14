import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { CoinData } from "../types/coinsParams";
import { useState } from "react";
import LoadingComponent from "../utils/LoadingComponent";

interface FetchCoinsError {
  message: string;
}

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
    } /* ma'lumot galincha aldingisi yo'qolmidi ( animation )*/
  );

  return (
    <div className="w-full h-screen bgColor flex justify-center items-center flex-col">
      <div>
        {isLoading && (
          <h2>
            <LoadingComponent />
          </h2>
        )}
        {isError && <h2>Error fetching data.</h2>}
        {!isLoading && !isError && data?.length === 0 && (
          <h2>No data available.</h2>
        )}
        {data?.length ? (
          <div>
            <div className=" w-full flex justify-between">
              <h1 className="text-center">React Query GET</h1>
              <span>Total items: 100</span>
              <span>Skip: {page}</span>
            </div>
            <table className="w-[300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 w-[6%]">№</th>
                  <th
                    scope="col"
                    className="px-6 py-3 w-[150px] overflow-hidden"
                  >
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
                {data?.map((coin) => (
                  <tr
                    key={coin.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-500 transition-all duration-500"
                  >
                    <td className="px-6 py-4 w-[6%]">{coin.id}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[150px] overflow-hidden"
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
      {data?.length && (
        <div className="inline-flex mt-4">
          <button
            className="bg-gray-300 hover:bg-sideText text-gray-800 hover:text-white focus:bg-sideText focus:text-white font-bold py-2 px-4 rounded-l"
            onClick={() => setPage((p) => p - 10)}
            disabled={!page}
          >
            ← Prev
          </button>
          <button
            disabled={page === 90}
            className="bg-gray-300 hover:bg-sideText hover:text-white text-gray-800 focus:bg-sideText focus:text-white font-bold py-2 px-4 rounded-r"
            onClick={() => setPage((p) => p + 10)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default GetProductWithReactQuery;
