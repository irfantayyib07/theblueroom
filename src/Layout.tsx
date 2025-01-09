import { Outlet } from "react-router-dom";

function RootLayout() {
 return (
  <main className="w-full flex-stretch flex flex-col">
   {/* <header className="px-6 w-full h-24 bg-blue-800 text-white flex justify-center items-center">
    The Blue Room Booking Form with Timetics and Woocommerce
   </header> */}
   <section className="p-6">
    <Outlet />
   </section>
   <footer className="pb-6 flex gap-2 justify-center items-center text-[15px] mt-auto">
    Powered by <img src="/images/otbb-logo.png" className="w-44" />
   </footer>
  </main>
 );
}

export default RootLayout;
