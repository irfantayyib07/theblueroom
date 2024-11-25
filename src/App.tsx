import { Route, Routes } from "react-router-dom";
import RootLayout from "./Layout";
import BookingPage from "./pages/BookingPage/Page";

function App() {
 return (
  <>
   <Routes>
    <Route path="" element={<RootLayout />}>
     <Route path="/" element={<BookingPage />} />
    </Route>
   </Routes>
  </>
 );
}

export default App;
