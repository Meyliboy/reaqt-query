import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { ProductData } from "../types/coinsParams";
import LoadingComponent from "../utils/LoadingComponent";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  // Add more fields as needed
}

/* GET */
async function fetchProducts(): Promise<ProductData[]> {
  return (await axios.get("https://dummyjson.com/products?limit=10")).data
    .products;
}

/* POST */
async function createProduct(data: FormData) {
  return await axios.post("https://dummyjson.com/products/add", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

const PostProductReactQuery = () => {
  const { data, isLoading, isError } = useQuery(
    "products",
    fetchProducts
  ); /* for GET */

  /* for POST */
  const mutation = useMutation((newProduct: FormData) =>
    createProduct(newProduct)
  );

  /* for GET */
  if (isLoading) {
    return <h3>Idiot zagruzka</h3>;
  }

  if (!data) {
    return <h3>Net Dannix</h3>;
  }

  /* for POST */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields: FormData = {
      title: formData.get("title") as string,
      // Add more fields as needed
    };

    mutation.mutate(fields);
    event.currentTarget.reset();

    if (mutation.data?.status === 200) {
      toast.success("Successfully !!!");
    }

    if (mutation.isError) {
      toast.error("Connected error.");
    }
  };

  return (
    <div className="w-full h-screen bgColor flex justify-center items-center flex-col mt-10">
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
              <h1 className="text-center">React Query POST</h1>
            </div>
            <table className="w-[300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-2 w-[6%]">№</th>
                  <th
                    scope="col"
                    className="px-6 py-2 w-[150px] overflow-hidden"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Raiting
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-2">
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
                    <td className="px-6 py-2 w-[6%]">{coin.id}</td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[150px] overflow-hidden"
                    >
                      {coin.title}
                    </td>
                    <td className="px-6 py-2">{coin.rating}</td>
                    <td className="px-6 py-2">{coin.stock}</td>
                    <td className="px-6 py-2">${coin.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={onSubmit} className="mt-4">
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          className="pl-2 py-2 rounded-md w-[510px] text-sideText"
        />
        <button
          type="submit"
          className="block my-2 bg-sky-600 focus:bg-green-600 py-2 px-5 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostProductReactQuery;
