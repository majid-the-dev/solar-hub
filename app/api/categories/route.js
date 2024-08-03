import { mongooseConnect } from "@/lib/mongoose";
import { Categories } from "@/models/Categories";

export const POST = async (req) => {
  await mongooseConnect();
  const { name, parent } = await req.json();
  const CategoryDoc = await Categories.create({ name, parent: parent || null });
  return Response.json(CategoryDoc);
};

export const GET = async () => {
  await mongooseConnect();
  const categoryDoc = await Categories.find().populate("parent");
  return Response.json(categoryDoc);
};

export const PUT = async (req) => {
  await mongooseConnect();
  const { id, name, parent } = await req.json();
  const categoryDoc = await Categories.findByIdAndUpdate(id, {
    name,
    parent: parent || null,
  });
  return Response.json(categoryDoc);
};

export const DELETE = async (req) => {
  await mongooseConnect();
  const { id } = await req.json();
  await Categories.findByIdAndDelete(id);
  await Categories.updateMany({ parent: id }, { $set: { parent: null } });
  return new Response("Category deleted successfully", { status: 200 });
};
