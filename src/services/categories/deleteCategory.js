import categoryData from "../../data/categories.json" assert { type: "json" };

const deleteCategoryById = id => {
  const categoryIndex = categoryData.categories.findIndex(
    category => category.id === id
  );
  if (categoryIndex === -1) {
    return null;
  }
  const deletedCategory = categoryData.categories.splice(categoryIndex, 1);
  return deletedCategory;
};

export default deleteCategoryById;
