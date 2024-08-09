import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    //validating form fields
    if (!name) {
      return res.status(400).json({
        error: "Name is required!",
      });
    }

    const existingCategory = await Category.findOne({ name });

    //check for uniqueness
    if (existingCategory) {
      return res.status(400).json({
        error: "Already exists",
      });
    }

    const newCategory = new Category({ name });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    //validating fields
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const category = await Category.findOne({ _id: categoryId });

    //existence in database
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    //exixtence in database
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const removedCategory = await Category.deleteOne({ _id: categoryId });
    res.json(removedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
