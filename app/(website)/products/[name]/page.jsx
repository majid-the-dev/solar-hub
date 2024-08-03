"use client";

import LoadingScreen from "@/components/LoadingScreen";
import ProductCard from "@/components/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { MdOutlineSort } from "react-icons/md";

const Page = () => {
  const { name } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortModal, setSortModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortOption, setSortOption] = useState("unsorted");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (name) {
      const fetchCategoryAndProducts = async () => {
        setLoading(true);
        
        try {
          const categoryResponse = await fetch(`/api/category/${name}`);
          const categoryData = await categoryResponse.json();
          setCategory(categoryData);

          const productsResponse = await fetch(
            `/api/product/${name}?page=${currentPage}&limit=12`
          );
          const { products, totalPages } = await productsResponse.json();

          if (Array.isArray(products)) {
            setProducts(products);
          } else {
            console.error("Products is not an array", products);
            setProducts([]);
          }

          setTotalPages(totalPages);

          const uniqueBrands = [
            ...new Set(products.map((product) => product.brand)),
          ];
          setBrands(uniqueBrands);
        } catch (error) {
          console.error("Failed to fetch category or products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryAndProducts();
    }
  }, [name, currentPage]);

  useEffect(() => {
    const currentSelectedBrands = searchParams.getAll("brand") || [];
    const currentHasDiscount = searchParams.get("discount") === "true";
    const currentSortOption = searchParams.get("sort") || "unsorted";

    setSelectedBrands(currentSelectedBrands);
    setHasDiscount(currentHasDiscount);
    setSortOption(currentSortOption);
  }, [searchParams]);

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();

    if (newFilters.selectedBrands.length) {
      newFilters.selectedBrands.forEach((brand) => {
        params.append("brand", brand);
      });
    }

    if (newFilters.hasDiscount) {
      params.set("discount", "true");
    }

    if (newFilters.sortOption && newFilters.sortOption !== "unsorted") {
      params.set("sort", newFilters.sortOption);
    }

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateFilters({
      selectedBrands: newSelectedBrands,
      hasDiscount,
      sortOption,
    });
  };

  const handleDiscountChange = () => {
    updateFilters({ selectedBrands, hasDiscount: !hasDiscount, sortOption });
  };

  const handleSortChange = (option) => {
    updateFilters({ selectedBrands, hasDiscount, sortOption: option });
  };

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesBrand = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;
      const matchesDiscount = hasDiscount ? product.discount > 0 : true;
      return matchesBrand && matchesDiscount;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > 1) {
      router.push(`/products/${name}?page=${newPage}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/products/${name}`, undefined, { shallow: true });
    }
  };

  const openSortModal = () => {
    setAnimationClass("animate__animated animate__fadeInRight");
    setSortModal(true);
  };

  const closeSortModal = () => {
    setAnimationClass("animate__animated animate__fadeOutRight");
    setTimeout(() => {
      setSortModal(false);
    }, 650);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="relative h-[45vh] w-full bg-darkGreen flex flex-col items-center justify-center overflow-x-hidden">
            <Image
              src={"/assets/hero-bg.jpg"}
              layout="fill"
              objectFit="cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-darkGreen"></div>
            <h1 className="text-white text-3xl md:text-5xl text-center font-bold uppercase md:leading-[60px] z-50 px-5 md:px-0">
              {name.replace("-", " ")}
            </h1>
          </div>
          <div className="mx-auto w-full max-w-7xl relative px-5 pb-36">
            <div className="flex items-center justify-between mt-14">
              <button
                onClick={openSortModal}
                className={`flex items-center gap-2 text-sm bg-gray-100 rounded px-4 py-2 ${filteredAndSortedProducts.length === 0 && 'hidden'}`}
              >
                <MdOutlineSort className="text-lg" />
                Filter
              </button>
              {sortModal && (
                <div
                  onClick={closeSortModal}
                  className="bg-darkGreen/90 fixed inset-0 z-[99999]"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className={`relative bg-white w-1/2 md:w-1/4 h-full float-end p-4 overflow-y-scroll ${animationClass}`}
                  >
                    <h1 className="text-lg font-semibold">Filter Products</h1>
                    {/* Relevance */}
                    <div className="flex flex-col gap-6 mt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="accent-black"
                          checked={sortOption === "unsorted"}
                          onChange={() => handleSortChange("unsorted")}
                        />
                        <span className="text-xs font-normal">Default</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="accent-black"
                          checked={sortOption === "price-asc"}
                          onChange={() => handleSortChange("price-asc")}
                        />
                        <span className="text-xs font-normal">
                          Price, low to high
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="accent-black"
                          checked={sortOption === "price-desc"}
                          onChange={() => handleSortChange("price-desc")}
                        />
                        <span className="text-xs font-normal">
                          Price, high to low
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="accent-black"
                          checked={sortOption === "date-asc"}
                          onChange={() => handleSortChange("date-asc")}
                        />
                        <span className="text-xs font-normal">
                          Date, old to new
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="accent-black"
                          checked={sortOption === "date-desc"}
                          onChange={() => handleSortChange("date-desc")}
                        />
                        <span className="text-xs font-normal">
                          Date, new to old
                        </span>
                      </label>
                    </div>
                    {/* Brands */}
                    <h1 className="text-lg font-semibold mt-8">Brands</h1>
                    <div className="flex flex-col gap-6 mt-5">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="accent-black"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                          />
                          <span className="text-xs font-normal">{brand}</span>
                        </label>
                      ))}
                    </div>
                    {/* Discounts */}
                    <h1 className="text-lg font-semibold mt-8">Discounts</h1>
                    <div className="flex flex-col gap-6 mt-5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-black"
                          checked={hasDiscount}
                          onChange={handleDiscountChange}
                        />
                        <span className="text-xs font-normal">Discounts</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {filteredAndSortedProducts?.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12 pt-16 pb-24">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      link={`/product/${product._id}`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex justify-center mt-24">
                  <button
                    className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 mr-5 disabled:bg-black/60 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <FaAnglesLeft />
                    Previous
                  </button>
                  <button
                    className="bg-black text-white flex items-center gap-4 text-xs font-medium px-6 py-3 disabled:bg-black/60 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                    <FaAnglesRight />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-96 flex flex-col items-center justify-center">
                <p className="bg-gray-100 text-gray-400 text-xl rounded-full p-3">
                  <CgTrashEmpty />
                </p>
                <p className="text-sm font-light mt-4">
                  No products found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
