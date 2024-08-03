"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { BsCloudUpload } from "react-icons/bs";
import { Loader2, LoaderIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const NewProductModal = ({ onProductCreated }) => {
  const [categories, setCategories] = useState([]);
  const [fetchCategories, setFetchCategories] = useState(false);
  const [modal, setModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDiscountValid, setIsDiscountValid] = useState(true);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [freeDelivery, setFreeDelivery] = useState("");
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setFetchCategories(true);
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCategories(result);
      }
    } catch (error) {
      console.error("Could not fetch categories", error);
    } finally {
      setFetchCategories(false);
    }
  };

  const uploadImages = async (e) => {
    const files = e.target?.files;

    if (files?.length > 0) {
      setUploading(true);
      const data = new FormData();
      data.append("file", files[0]);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await response.json();

        console.log(result);

        if (response.ok) {
          console.log("Image uploaded:", result); // Log the link to verify
          setImages((prevImages) => [...prevImages, result]); // Assuming result.link contains the image URL
          toast.success("Image uploaded successfully!");
        } else {
          console.error("Upload failed", result);
          toast.error("Something went wrong!");
        }
      } catch (error) {
        console.error("Error uploading image", error);
        toast.error("Something went wrong!");
        // Handle error appropriately here, maybe show a toast notification
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddProperty = () => {
    setProperties((prevProperties) => [
      ...prevProperties,
      { id: Date.now(), name: "", description: "" },
    ]);
  };

  const handleRemoveProperty = (id) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== id)
    );
  };

  const handlePropertyChange = (id, field, value) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === id ? { ...property, [field]: value } : property
      )
    );
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          brand,
          category,
          condition,
          description,
          price,
          discount,
          availability,
          freeDelivery,
          properties,
          images,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setModal(false);
        setProperties([]);
        setImages([]);
        if (onProductCreated) {
          onProductCreated();
        }
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="animation bg-black text-white text-xs flex items-center gap-2 rounded-lg px-4 py-3 hover:opacity-80"
      >
        <span>
          <AiOutlinePlusCircle className="text-[16px]" />
        </span>
        New Product
      </button>

      {modal && (
        <div
          onClick={() => setModal(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999999999] px-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-3xl rounded-lg p-7 h-full max-h-[80vh] overflow-y-scroll"
          >
            <h1 className="text-[18px] font-medium">New Product</h1>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              {/* Product Title */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">Product Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm font-medium border border-input rounded-lg px-3 py-2 outline-none focus:border-default"
                />
              </div>

              {/* Product Brand */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">Product Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="text-sm font-medium border border-input rounded-lg px-3 py-2 outline-none focus:border-default"
                />
              </div>

              {/* Product Category */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Category
                </label>
                <Select
                  name="category"
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="text-sm font-medium">
                    <SelectValue placeholder="Select product category" />
                  </SelectTrigger>
                  <SelectContent>
                    {fetchCategories && (
                      <div className="flex items-center justify-center py-5">
                        <Loader2 size={20} className="animate-spin" />
                      </div>
                    )}
                    {categories?.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Condition */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Condition
                </label>
                <Select
                  name="condition"
                  value={condition}
                  onValueChange={(value) => setCondition(value)}
                >
                  <SelectTrigger className="text-sm font-medium">
                    <SelectValue placeholder="Select product condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brand New">Brand New</SelectItem>
                    <SelectItem value="Pre Owned">Pre Owned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Description */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Description{" "}
                </label>
                <textarea
                  name="description"
                  rows="3"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-sm font-medium border border-input rounded-lg px-3 py-2 outline-none focus:border-default"
                ></textarea>
              </div>

              {/* Product Price */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">Product Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-sm font-medium border border-input rounded-lg px-3 py-2 outline-none focus:border-default"
                />
              </div>

              {/* Discount Price */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">Discount Price </label>
                <input
                  type="number"
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="text-sm font-medium border border-input rounded-lg px-3 py-2 outline-none focus:border-default"
                />
                <p className="flex gap-2 bg-red-50 text-xs text-red-500 rounded-lg px-2 py-3">
                  <BsFillInfoCircleFill className="mt-0.5" />
                  Discount price must be less than actual price
                </p>
              </div>

              {/* Product Availability */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Availability{" "}
                </label>
                <Select
                  name="availability"
                  value={availability}
                  onValueChange={(value) => setAvailability(value)}
                >
                  <SelectTrigger className="text-sm font-medium">
                    <SelectValue placeholder="Select product availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Free Delivery */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">Free Delivery </label>
                <Select
                  name="freeDelivery"
                  value={freeDelivery}
                  onValueChange={(value) => setFreeDelivery(value)}
                >
                  <SelectTrigger className="text-sm font-medium">
                    <SelectValue placeholder="Select delivery option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Properties */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Properties{" "}
                </label>
                <div className="space-y-4">
                  {properties.map((item, index) => (
                    <div
                      key={item.id}
                      className="w-full flex items-center gap-4"
                    >
                      <input
                        type="text"
                        placeholder="Property Name"
                        value={item.name}
                        onChange={(e) =>
                          handlePropertyChange(item.id, "name", e.target.value)
                        }
                        className="w-full text-sm font-medium border border-input rounded-lg px-3 py-2 placeholder:text-xs placeholder:font-normal outline-none focus:border-default"
                      />
                      <input
                        type="text"
                        placeholder="Property Description"
                        value={item.description}
                        onChange={(e) =>
                          handlePropertyChange(
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full text-sm font-medium border border-input rounded-lg px-3 py-2 placeholder:text-xs placeholder:font-normal outline-none focus:border-default"
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveProperty(item.id)}
                        className="bg-transparent text-red-500 rounded-full p-2 inline hover:bg-transparent"
                      >
                        <FiTrash2 />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddProperty}
                    className="flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-normal border border-dashed border-gray-300 hover:bg-gray-100"
                  >
                    <FaPlus className="text-[11px]" />
                    Add Property
                  </Button>
                </div>
              </div>

              {/* Product Photos */}
              <div className="flex flex-col gap-3">
                <label className="text-xs text-gray-500">
                  Product Photos{" "}
                  {uploading && (
                    <p className="flex items-center text-green-600">
                      <Loader2 size={15} className="animate-spin" />
                      Uploading...
                    </p>
                  )}
                </label>

                <div className="flex items-center flex-wrap gap-4">
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <div className="w-36 h-36 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-lg border border-dashed border-gray-200">
                            <img
                              src={img}
                              alt="Product Image"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <label className="w-36 h-36 bg-gray-100 flex flex-col gap-1 items-center justify-center text-xs text-gray-500 rounded-lg border border-dashed border-gray-200 cursor-pointer">
                    <BsCloudUpload />
                    upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={uploadImages}
                    />
                  </label>
                </div>
                <p className="flex gap-2 bg-red-50 text-xs text-red-500 rounded-lg px-2 py-3">
                  <BsFillInfoCircleFill className="mt-0.5" />
                  First image uploaded will be selected as product avatar
                </p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-black hover:bg-black/80 py-6 mt-5 disabled:bg-black/80"
                >
                  {loading ? (
                    <LoaderIcon size={17} className="animate-spin text-white" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <AiOutlinePlusCircle className="text-[16px]" />
                      Add Product
                    </span>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setModal(false);
                  }}
                  className="text-xs text-red-600 mt-2"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProductModal;
