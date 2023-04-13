const slugify = (str) => {
  str = str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .replace(/ /g, "-")
    .replace(/--+/g, "-");
  return str;
};

const generateSKU = (brand, category, subcategory, subSubcategory) => {
  const brandSlug = brand.replace(/\s+/g, "-").toLowerCase();
  const categorySlug = category.replace(/\s+/g, "-").toLowerCase();
  const subcategorySlug = subcategory.replace(/\s+/g, "-").toLowerCase();
  const subSubcategorySlug = subSubcategory.replace(/\s+/g, "-").toLowerCase();
  const randomString = Math.random().toString(36).substring(2, 6);
  const sku = `${brandSlug}-${categorySlug}-${subcategorySlug}-${subSubcategorySlug}-${randomString}`;
  return sku;
};

export { slugify, generateSKU };
