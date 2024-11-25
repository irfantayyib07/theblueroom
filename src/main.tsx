import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
    <TooltipProvider>
     <Routes>
      <Route path="/*" element={<App />} />
     </Routes>
    </TooltipProvider>
   </QueryClientProvider>
  </BrowserRouter>
 </StrictMode>,
);
