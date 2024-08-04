import { FaStore } from "react-icons/fa";

const PickupOption = ({ option, setOption }) => {
  return (
    <div
      onClick={() => setOption("pickup")}
      className={`${
        option === "pickup"
          ? "bg-darkGreen/5 border-darkGreen/30"
          : "bg-white border-gray-200"
      } animation flex flex-col gap-2 border p-6 hover:bg-darkGreen/5 hover:shadow cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <FaStore className="text-xl" />
        <span className="text-[15px] font-semibold">Pickup</span>
      </div>
      <span className="text-xs text-gray-500 text-left font-normal leading-5 mt-2">
        Choose pickup to collect your order at a time that suits you best from
        our designated pickup location. Our in-store team will have everything
        prepared, ensuring a quick and hassle-free experience when you arrive.
      </span>
    </div>
  );
};

export default PickupOption;
