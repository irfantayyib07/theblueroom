import React from "react";
import { Loader2 } from "lucide-react";

interface OverlayLoaderProps {
 message?: string;
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ message = "Loading..." }) => {
 return (
  <div className="fixed inset-0 z-[9999] w-full h-full flex items-center justify-center bg-white/90">
   <div className="flex flex-col items-center justify-center space-y-4">
    <Loader2 className="animate-spin text-blue-500" size={64} strokeWidth={3} />
    <p className="text-gray-700 text-lg font-medium tracking-wide">{message}</p>
   </div>
  </div>
 );
};

export default OverlayLoader;
