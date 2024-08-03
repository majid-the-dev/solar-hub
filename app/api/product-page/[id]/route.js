import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";

export const GET = async (req, { params }) => {
    try {
      await mongooseConnect();
      const { id } = params;
  
      const productDoc = await Products.findById(id);
  
      if (!productDoc) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
        });
      };
  
      return new Response(JSON.stringify(productDoc), { status: 200 });
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
};