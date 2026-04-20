import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import { ToastContainer } from "./UIComponents.jsx";
import { useApp } from "../context/AppContext.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { user } = useApp();

  return (
    <div
      className="
      min-h-screen flex flex-col
      bg-gray-50 dark:bg-gray-950
      text-gray-800 dark:text-gray-100
    "
    >
      <Navbar />

      <div className="flex flex-1 w-full">
        {user && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        <main className="flex-1 relative">
          <div
            className="
            absolute inset-0 -z-10
            bg-gradient-to-br 
            from-indigo-50/50 via-transparent to-transparent
            dark:from-indigo-900/10
          "
          />

          <div
            className={`
              w-full max-w-[1400px]
              mx-auto

              px-6 sm:px-10 lg:px-16 xl:px-20
              ${user ? "lg:pl-10" : ""}

              py-14 sm:py-16 lg:py-20
              flex flex-col gap-12
            `}
          >
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />

      <ToastContainer />
    </div>
  );
}
