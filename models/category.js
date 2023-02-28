import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});
console.log(mongoose.models.Category);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
