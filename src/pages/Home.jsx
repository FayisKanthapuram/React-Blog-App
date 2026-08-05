import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;
