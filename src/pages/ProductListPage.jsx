import React from 'react';
import CardProduct from '../components/Fragments/CardProduct';
import { useProducts } from '../hooks/useProducts';

const categoryItemCounts = {
  electronics: 6,
  jewelery: 4,
  "men's clothing": 4,
  "women's clothing": 6,
  '': 20,
};

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

const ProductListPage = () => {
  const { products, loading, error, changeCategory, selectedCategory } =
    useProducts();

  const handleCategoryChange = (event) => {
    changeCategory(event.target.value);
  };

  const getSkeletonCount = () => {
    return categoryItemCounts[selectedCategory] || categoryItemCounts[''];
  };

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Select Category:
        </label>
        <select
          id="category"
          className="select select-bordered"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: getSkeletonCount() }).map((_, index) => (
            <CardProduct key={index} loading={true} />
          ))
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <CardProduct key={product.id} product={product} loading={false} />
          ))
        ) : (
          <div className="col-span-full text-center">No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
