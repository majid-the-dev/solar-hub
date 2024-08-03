import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";

export const GET = async (req, { params }) => {
    try {
        await mongooseConnect();
        const { name } = params;
        const categoryName = decodeURIComponent(name).replace(/-/g, ' ');
        console.log(categoryName);
        const category = await Categories.findOne({ name: categoryName }).populate('parent');
        if (!category) {
            return new Response("Category not found", { status: 404 });
        };
        return new Response(JSON.stringify(category), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
        });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    };
};