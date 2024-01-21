import categoryData from "../../data/categories.json" assert { type: "json" };

const getCategoryById = id => {
  return categoryData.categories.find(category => category.id === id);
};

export default getCategoryById;
