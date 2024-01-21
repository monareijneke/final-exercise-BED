import categoryData from "../../data/categories.json" assert { type: "json" };

const updateCategoryById = (id, updatedCategory) => {
  const categoryIndex = categoryData.categories.findIndex(
    category => category.id === id
  );

  if (categoryIndex === -1) {
    return null;
  }
  const { name } = updatedCategory;

  categoryData.categories[categoryIndex] = {
    ...categoryData.categories[categoryIndex],
    name: name || categoryData.categories[categoryIndex].name,
  };
  return categoryData.categories[categoryIndex];
};

export default updateCategoryById;
