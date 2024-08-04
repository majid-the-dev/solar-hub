import { FaTruckLoading } from "react-icons/fa";

const DeliveryOption = ({ option, setOption }) => {
  return (
    <div
      onClick={() => setOption("delivery")}
      className={`${
        option === "delivery"
          ? "bg-darkGreen/5 border-darkGreen/30"
          : "bg-white border-gray-200"
      } animation flex flex-col gap-2 border p-6 hover:bg-darkGreen/5 hover:shadow cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <FaTruckLoading className="text-xl" />
        <span className="text-[15px] font-semibold">Delivery</span>
      </div>
      <span className="text-xs text-gray-500 text-left font-normal leading-5 mt-2">
        Opt for our delivery service and have your order brought directly to
        your doorstep. Track your order in real-time and stay updated on its
        progress from our store to your front door.
      </span>
    </div>
  );
};

export default DeliveryOption;
