import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";
import { Categories } from "@/models/Categories";

// Helper function to recursively fetch all subcategory IDs
const getAllSubcategoryIds = async (categoryId) => {
  const subcategories = await Categories.find({ parent: categoryId }).exec();
  let allSubcategoryIds = subcategories.map((category) => category._id);

  for (let subcategory of subcategories) {
    const subSubcategoryIds = await getAllSubcategoryIds(subcategory._id);
    allSubcategoryIds = allSubcategoryIds.concat(subSubcategoryIds);
  }

  return allSubcategoryIds;
};

export const GET = async (req, { params }) => {
  try {
    await mongooseConnect();
    const { name } = params;

    // Decode the category name
    const decodedName = decodeURIComponent(name).replace(/-/g, " ");

    // Find the main category by name
    const mainCategory = await Categories.findOne({ name: decodedName }).exec();
    if (!mainCategory) {
      return new Response("Category not found", { status: 404 });
    }

    // Get all subcategory IDs including the main category
    const allCategoryIds = await getAllSubcategoryIds(mainCategory._id);
    allCategoryIds.push(mainCategory._id); // Include the main category ID

    // Pagination parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    // Fetch products for the given category and all its subcategories with pagination
    const products = await Products.find({ category: { $in: allCategoryIds } })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Products.countDocuments({
      category: { $in: allCategoryIds },
    });
    const totalPages = Math.ceil(totalProducts / limit);

    const response = {
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
