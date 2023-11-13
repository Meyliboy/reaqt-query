import { BrowserRouter, Route, Routes } from "react-router-dom";
import GetProductWithReactQuery from "./pages/GetProduct";
import NavigationBar from "./components/NavigationBar";
import Produscts from "./pages/Produscts";
import PostProductReactQuery from "./pages/PostProductReactQuery";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<Produscts />} />
        <Route path="/get-products" element={<GetProductWithReactQuery />} />
        <Route path="/post-products" element={<PostProductReactQuery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
