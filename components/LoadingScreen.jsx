import { LoaderIcon } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <LoaderIcon size={30} className="animate-spin text-darkGreen" />
    </div>
  );
};

export default LoadingScreen;
