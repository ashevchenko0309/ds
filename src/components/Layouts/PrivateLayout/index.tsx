import { Outlet } from "react-router-dom";
import Header from "../../Header";

const PrivateLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
