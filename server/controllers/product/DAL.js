const productModel = require("../../models/product/ProductSchema");
const cloudinary = require("../../utils/cludinary");

const findAllProducts = async () => {
  try {
    const products = await productModel
      .find()
      // .populate(["storeId", "subCategory"]);
    return products;
  } catch (error) {
    throw error;
  }
};

const findProductById = async (id) => {
  try {
    const product = await productModel
      .findById(id)
      // .populate(["storeId", "subCategory"]);
    return product;
  } catch (error) {
    throw error;
  }
};

const createOneProduct = async (obj) => {
  try {
    const product = new productModel(obj);
    await product.save();
    return "Created";
  } catch (error) {
    throw error;
  }
};

const updateOneProduct = async (id, obj) => {
  try {
    await productModel.findByIdAndUpdate(id, obj);
    return "Updated";
  } catch (error) {
    throw error;
  }
};

const deleteOneProduct = async (id) => {
  try {
    await productModel.findByIdAndDelete(id);
    return "Deleted";
  } catch (error) {
    throw error;
  }
};
const cloudinaryUpLoud = async (image,folderPata)=> {
  const results = await cloudinary.uploader.upload(image, {
    folder: folderPata,
  });
  return results
}
module.exports = {
  findAllProducts,
  findProductById,
  deleteOneProduct,
  updateOneProduct,
  createOneProduct,
  cloudinaryUpLoud
};
