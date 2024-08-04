import { states } from "@/public/data";

const DeliveryInformation = ({
  fullName,
  setFullName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  streetAddress,
  setStreetAddress,
  city,
  setCity,
  state,
  setState,
  additionalInfo,
  setAdditionalInfo,
}) => {
  return (
    <>
      <div className="flex flex-col gap-6 bg-white border border-gray-200 p-7 mt-8">
        <h1 className="text-sm font-semibold">Delivery Information</h1>
        <div className="flex flex-col items-center gap-5 mt-2">
          <div className="flex flex-col gap-3 w-full">
            <label className="text-xs text-gray-400 font-normal">
              First Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-xs text-gray-400 font-normal">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-xs text-gray-400 font-normal">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-xs text-gray-400 font-normal">
            Street Address
          </label>
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-xs text-gray-400 font-normal">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-xs text-gray-400 font-normal">
            State/Region
          </label>
          <select
            value={state} // Set the value of the select to the current state
            onChange={(e) => setState(e.target.value)} // Update the state when a new state is selected
            className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none"
          >
            <option value={""}>Select a state or region</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col bg-white border border-gray-200 p-7 mt-8">
        <h1 className="text-sm font-semibold">Additional Information</h1>
        <label className="text-xs text-gray-400 font-normal mt-1.5">
          Notes about your order e.g. special delivery instructions
        </label>
        <textarea
          rows="5"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="bg-gray-100 text-sm rounded-lg px-3 py-3 outline-none mt-7"
        ></textarea>
      </div>
    </>
  );
};

export default DeliveryInformation;
