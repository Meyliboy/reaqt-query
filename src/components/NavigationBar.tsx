import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="w-full flex justify-center items-center gap-4 my-4">
      <NavLink to={"/home"} className={"border py-1 px-4 rounded-md"}>
        Home
      </NavLink>
      <NavLink to={"/get-products"} className={"border py-1 px-4 rounded-md"}>
        Get Products
      </NavLink>
      <NavLink to={"/post-products"} className={"border py-1 px-4 rounded-md"}>
        Post Products
      </NavLink>
    </div>
  );
};

export default NavigationBar;
