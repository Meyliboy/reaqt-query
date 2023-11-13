import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { ProductData } from "../types/coinsParams";

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
  const { data, isLoading } = useQuery("products", fetchProducts); /* for GET */

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

    console.log({ success: mutation.isSuccess });
    console.log({ loading: mutation.isLoading });
    console.log({ error: mutation.isError });

    event.currentTarget.reset();
  };

  return (
    <div className="w-full justify-center items-center flex flex-col gap-6">
      <div className="w-full flex justify-center">
        <table>
          <thead>
            <tr className="border">
              <th className="border">№</th>
              <th className="border">Brand</th>
              <th className="border">Name</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product) => (
              <tr key={product.id} className="border">
                <td className="border">{product.id}</td>
                <td className="border">{product.brand}</td>
                <td className="border">{product.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          required
          className="pl-2 py-2 rounded-md border border-black w-[510px]"
        />
        <button
          type="submit"
          className="block my-2 bg-sky-600 text-white py-1 px-5 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostProductReactQuery;
