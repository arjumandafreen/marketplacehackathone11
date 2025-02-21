"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { Products } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";

import img1 from "../components/images/card1.png";
import img2 from "../components/images/card2.png";
import img3 from "../components/images/card3.png";
import img4 from "../components/images/pic41.png";
import img5 from "../components/images/pic42.png";

type StaticImageData = any;

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: string;
  image?: { _ref: string; _type: "image" } | StaticImageData;
  discountPercent?: number;
  slugCurrent?: string;
}

const staticProducts: Product[] = [
  { _id: "1", name: "Product 1", price: 10.99, image: img1 },
  { _id: "2", name: "Product 2", price: 20.99, image: img2 },
  { _id: "3", name: "Product 3", price: 30.99, image: img3 },
  { _id: "4", name: "Product 4", price: 40.99, image: img4 },
  { _id: "5", name: "Product 5", price: 50.99, image: img5 },
];

const categories = ["all", "tshirt", "short", "jeans", "hoodie", "shirt"];

const ProductComponent = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Products[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(staticProducts as Products[]);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (category === "all" || product.category?.toLowerCase() === category.toLowerCase()) &&
        product.price <= maxPrice
    );
  }, [products, category, maxPrice]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Shop</h1>

      <h2 className="text-xl font-bold text-center mb-4">Featured Products</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {staticProducts.map((product) => (
          <div key={product._id} className="w-60 h-80 bg-white shadow-lg rounded-lg p-4">
            <Image src={product.image} alt={product.name} width={200} height={200} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-center mt-10">All Products</h2>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`py-2 px-4 rounded-lg font-medium transition ${
              category === cat ? "bg-purple text-white" : "bg-pink-200 hover:bg-pink-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="text-center py-6">
        <label className="font-bold">Max Price: </label>
        <input
          type="range"
          min="0"
          max="200"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="ml-4"
        />
        <span className="ml-2">${maxPrice}</span>
      </div>

      <div className="p-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 text-left">
                {product.image && (
                  <Image src={urlFor(product.image).url()} alt={product.name} width={200} height={200} priority className="block" />
                )}
                <h2 className="text-lg font-semibold text-gray-800 mt-2">{product.name}</h2>
                <p className="text-green-600 font-bold">${product.price}</p>
                {product.discountPercent > 0 && <p className="text-red-500 text-sm">{product.discountPercent}% Off</p>}
                <div className="mt-4">
                  <Link href={`/product/${product.slugCurrent}`}>
                    <button className="bg-green-800 text-white py-1 px-2 text-sm rounded hover:bg-pink-800">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductComponent  ;


 