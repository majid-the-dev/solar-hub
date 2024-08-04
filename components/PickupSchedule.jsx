import { storesData } from "@/public/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PickupSchedule = ({
  pickupSchedule,
  setPickupSchedule,
  setPickupLocation,
}) => {
  return (
    <div className="flex flex-col bg-white border border-gray-200 p-7 mt-8">
      <h1 className="text-sm font-semibold">Pickup Schedule</h1>
      <label className="text-xs text-gray-400 font-normal mt-6">
        Select your pickup date (Mon-Sat availability)
      </label>
      <input
        type="date"
        value={pickupSchedule}
        onChange={(e) => setPickupSchedule(e.target.value)}
        className="w-full bg-gray-100 text-sm rounded-lg p-3 mt-3 outline-none"
      />

      <label className="text-xs text-gray-400 font-normal mt-6">
        Select your pickup location (Mon-Sat availability)
      </label>
      <span className="mt-3">
        <Select onValueChange={(value) => setPickupLocation(value)}>
          <SelectTrigger className="text-sm focus:outline-none">
            <SelectValue placeholder="Select store location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {storesData.map((store) => (
                <SelectItem value={store.name} key={store.name}>
                  {store.name} - {store.address}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default PickupSchedule;
