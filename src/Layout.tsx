import { Outlet } from "react-router-dom";

function RootLayout() {
 return (
  <main className="w-full">
   <header className="px-6 w-full h-24 bg-blue-800 text-white flex justify-center items-center">
    The Blue Room Booking Form with Timetics and Woocommerce
   </header>
   <section className="p-6">
    <Outlet />
   </section>
  </main>
 );
}

export default RootLayout;
