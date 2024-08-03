import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Categories"
    }
});

export const Categories = models?.Categories || model("Categories", CategorySchema);