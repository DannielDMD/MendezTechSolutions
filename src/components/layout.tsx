import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen pt-[83px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait" initial={true}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
