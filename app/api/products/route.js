import { mongooseConnect } from "@/lib/mongoose";
import { Products } from "@/models/Products";
import mongoose from "mongoose";

export const POST = async (req) => {
    await mongooseConnect();
    const {title, brand, category, condition, description, price, discount, availability, freeDelivery, properties, images} = await req.json();
    const productDoc = await Products.create({ title, brand, category, condition, description, price, discount: discount || null, availability, freeDelivery, properties, images });
    return Response.json(productDoc);
};

export const GET = async () => {
    try {
        await mongooseConnect();
        const products = await Products.find().populate({ path: 'category', strictPopulate: false });
        return new Response(JSON.stringify(products), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};

export const DELETE = async (req) => {
    await mongooseConnect();
    const { id } = await req.json();
    await Products.findByIdAndDelete(id);
    return new Response('Product deleted successfully', { status: 200 });
};

export const PUT = async (req) => {
    await mongooseConnect();
    const { id, title, brand, category, condition, description, price, discount, availability, freeDelivery, properties, images } = await req.json();
    
    // Correctly instantiate ObjectId with 'new'
    const categoryObjectId = new mongoose.Types.ObjectId(category);

    try {
        const productDoc = await Products.findByIdAndUpdate(
            id,
            { title, brand, category: categoryObjectId, condition, description, price, discount, availability, freeDelivery, properties, images },
            { new: true } // Ensure the updated document is returned
        ).populate({ path: 'category', strictPopulate: false });

        return new Response(JSON.stringify(productDoc), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
};
