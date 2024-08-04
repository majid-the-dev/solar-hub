import { BiBarChartSquare } from "react-icons/bi";
import { IoMdArrowDropright } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

const TotalSalesCard = () => {
  return (
    <div className="w-full bg-gray-50/50 border border-gray-200/55 rounded-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-500">
            <BiBarChartSquare />
          </span>
          <p className="text-xs font-medium">Total Sales</p>
        </div>
        <button>
          <BsThreeDots className="text-sm text-gray-500" />
        </button>
      </div>
      <div className="px-4 py-5">
        <p className="text-[24px] font-semibold">&#8358; 0</p>
      </div>
      <div className="w-full flex items-center justify-between bg-gray-200/40 rounded-b-lg px-4 py-3 mt-5">
        <p className="text-xs text-gray-500">0 total orders</p>
        <span className="text-[18px] text-gray-500">
          <IoMdArrowDropright />
        </span>
      </div>
    </div>
  );
};

export default TotalSalesCard;
