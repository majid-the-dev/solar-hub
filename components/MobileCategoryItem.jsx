"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMinus, FiPlus } from "react-icons/fi";

const MobileCategoryItem = ({ category, closeSidebar }) => {
  const [showCategories, setShowCategories] = useState(false);

  const categoryName = encodeURIComponent(category.name.replace(/ /g, "-"));

  if (category?.children?.length > 0) {
    return (
      <div>
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${encodeURIComponent(category.name.replace(/ /g, "-"))}`}
            className="text-[13px] font-normal outline-none pl-4"
            onClick={closeSidebar}
          >
            {category.name}
          </Link>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="text-[15px] outline-none"
          >
            {showCategories ? <FiMinus /> : <FiPlus />}
          </button>
        </div>
        {showCategories && (
          <div className="flex flex-col gap-6 mt-6">
            {category?.children?.map((child) => (
              <MobileCategoryItem
                key={child._id}
                category={child}
                closeSidebar={closeSidebar}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link
        onClick={closeSidebar}
        href={`/products/${encodeURIComponent(category.name.replace(/ /g, "-"))}`}
        key={category._id}
        className="text-[13px] font-normal outline-none pl-4"
      >
        {category.name}
      </Link>
    );
  }
};

export default MobileCategoryItem;
