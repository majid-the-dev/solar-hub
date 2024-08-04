"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import CheckoutUnauthenticated from "@/components/CheckoutUnauthenticated";
import { CartContext } from "@/utils/AppContext";
import { AiTwotoneInfoCircle } from "react-icons/ai";
import DeliveryOption from "@/components/DeliveryOption";
import PickupOption from "@/components/PickupOption";
import DeliveryInformation from "@/components/DeliveryInformation";
import PickupSchedule from "@/components/PickupSchedule";
import { formatPrice } from "@/lib/utils";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BiSolidTrash } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import CheckoutDisclaimer from "@/components/CheckoutDisclaimer";
import { states } from "@/public/data";

const CheckoutPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartProducts, removeCartProduct, clearCart } =
    useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const [option, setOption] = useState("delivery");

  const [deliveryFee, setDeliveryFee] = useState(0);

  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [pickupSchedule, setPickupSchedule] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFullName(session.user.fullName || "");
      setUserEmail(session.user.email || "");
      setPhoneNumber(session.user.phone || "");
      setStreetAddress(session.user.streetAddress || "");
      setCity(session.user.city || "");
      setState(session.user.state || "");
    }
  }, [status, session]);

  useEffect(() => {
    const initialQuantities = {};
    cartProducts.forEach((product) => {
      initialQuantities[product._id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartProducts]);

  useEffect(() => {
    calculateDeliveryFee()
  }, [
    fullName,
    phoneNumber,
    userEmail,
    streetAddress,
    city,
    state,
    pickupSchedule,
    pickupLocation,
    option,
    cartProducts
  ]);

  const handleQuantityChange = (productId, action) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (action === "increase") {
        newQuantities[productId] += 1;
      } else if (action === "decrease" && newQuantities[productId] > 1) {
        newQuantities[productId] -= 1;
      }
      return newQuantities;
    });
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      const price = product.discount ? product.discount : product.price;
      return total + price * quantity;
    }, 0);
  };

  const calculateDeliveryFee = () => {
    if (option === "pickup") {
      setDeliveryFee(0);
      return;
    }

    let fee = 0;
    const stateData = states.find(
      (s) => s.name.toLowerCase() === state.toLowerCase()
    );

    if (!stateData) {
      setErrorMessage("Invalid state selected for delivery!");
      return;
    };

    fee = stateData.delivery

    setDeliveryFee(fee);
  };

  const totalPrice = calculateTotalPrice();
  const grandTotal = totalPrice + deliveryFee;

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return <CheckoutUnauthenticated />;
  }

  return (
    <div>
      {cartProducts.length === 0 && (
        <div className="px-16 py-40">
          <div className="flex flex-col items-center justify-center">
            <AiTwotoneInfoCircle className="text-3xl" />
            <p className="text-[17px] md:text-xl text-center font-semibold mt-5">
              Ooops! Cart is Empty
            </p>
            <p className="text-xs text-gray-500 text-center font-light leading-5 mt-2">
              Before proceeding to checkout, you must add some products to your
              shopping cart!
            </p>
          </div>
        </div>
      )}

      {cartProducts.length > 0 && (
        <div className="px-6 py-14">
          <h1 className="text-2xl font-semibold">Checkout Order</h1>
          <div className="grid grid-cols-5 gap-8 mt-12">
            <div className="col-span-5 lg:col-span-2">
              <div className="flex flex-col gap-5">
                <DeliveryOption option={option} setOption={setOption} />
                <PickupOption option={option} setOption={setOption} />
              </div>

              {option === "delivery" && (
                <DeliveryInformation
                  fullName={fullName}
                  setFullName={setFullName}
                  email={userEmail}
                  setEmail={setUserEmail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  streetAddress={streetAddress}
                  setStreetAddress={setStreetAddress}
                  city={city}
                  setCity={setCity}
                  state={state}
                  setState={setState}
                  additionalInfo={additionalInfo}
                  setAdditionalInfo={setAdditionalInfo}
                />
              )}

              {option === "pickup" && (
                <PickupSchedule
                  pickupSchedule={pickupSchedule}
                  setPickupSchedule={setPickupSchedule}
                  setPickupLocation={setPickupLocation}
                />
              )}
            </div>

            <div className="col-span-5 lg:col-span-3">
              <div className="bg-white border border-gray-200 p-7">
                <div>
                  <h1 className="text-sm font-semibold">Order Summary</h1>
                  <div className="flex flex-col mt-6">
                    {cartProducts.map((product, index) => (
                      <div
                        key={product._id}
                        className="flex gap-3 border-b py-8"
                      >
                        <div className="relative w-20 h-20">
                          <Image
                            src={product.images[0]}
                            alt="product"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <p className="text-sm font-semibold">
                            {product.title}
                          </p>
                          {product.discount ? (
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-red-600 font-medium">
                                &#8358; {formatPrice(product.discount)}
                              </p>
                              <p className="text-xs text-gray-400 font-medium line-through">
                                &#8358; {formatPrice(product.price)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm font-medium">
                              &#8358; {formatPrice(product.price)}
                            </p>
                          )}
                          <div className="inline-flex items-center gap-4 mt-2">
                            <button
                              className="animation text-xs text-gray-400 hover:text-black"
                              onClick={() =>
                                handleQuantityChange(product._id, "decrease")
                              }
                            >
                              <FaMinus />
                            </button>
                            <span className="text-xs bg-gray-100 px-3 py-2">
                              {quantities[product._id] || 1}
                            </span>
                            <button
                              className="animation text-xs text-gray-400 hover:text-black"
                              onClick={() =>
                                handleQuantityChange(product._id, "increase")
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            onClick={() => removeCartProduct(index)}
                            className="inline-flex items-center gap-2 text-red-600 text-xs font-medium mt-3"
                          >
                            <FiTrash2 />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h1 className="text-sm font-semibold mt-10 mb-6">
                    Payment Summary
                  </h1>
                  <div className="flex flex-col gap-7">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Subtotal</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        &#8358; {formatPrice(calculateTotalPrice())}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">Delivery</p>
                      <p className="text-gray-500 text-sm font-semibold">
                        &#8358; {formatPrice(deliveryFee)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Total</p>
                      <p className="text-sm font-semibold">&#8358; {formatPrice(grandTotal)}</p>
                    </div>
                  </div>
                </div>

                <CheckoutDisclaimer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
