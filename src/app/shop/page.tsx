"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Products } from "../../../types/products";
//import Footer from "../components/Footer";

const Shop = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(200);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Products[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = (selectedCategory: string, price: number) => {
    let updatedProducts = products;
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    updatedProducts = updatedProducts.filter((product) => product.price <= price);
    setFilteredProducts(updatedProducts);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    filterProducts(selectedCategory, maxPrice);
  };

  const handlePriceChange = (value: number) => {
    setMaxPrice(value);
    filterProducts(category, value);
  };

  const handleClick = (product: Products) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[product.name] = cart[product.name]
      ? { ...cart[product.name], quantity: cart[product.name].quantity + 1 }
      : { ...product, quantity: 1 };
    localStorage.setItem("cart", JSON.stringify(cart));

    Swal.fire({
      title: "Success!",
      text: `${product.name} has been added to your cart.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "View Cart",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/cart";
      }
    });
  };

  return (
    <div>
      <div className="text-center py-10">
        <h2 className="font-bold text-2xl">Shop Our Fabulous Products</h2>
        <p className="text-purple-800">Happy Shopping Guys🚀🔥🎉 </p>
      </div>

      <div className="text-center py-8">
        
        <h1 className="text-2xl font-bold text-green-800">Categories</h1>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {["all", "tshirt", "short", "jeans", "hoodie", "shirt"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`py-2 px-4 rounded-lg font-medium transition ${category === cat ? "bg-purple text-white" : "bg-pink-200 hover:bg-pink-300"}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center py-6">
        <label className="font-bold">Max Price: </label>
        <input
          type="range"
          min="0"
          max="200"
          value={maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
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
                {product.discountPercent > 0 && (
                  <p className="text-red-500 text-sm">{product.discountPercent}% Off</p>
                )}
                <div className="mt-4 flex gap-2">
                  <Link href={`/product/${product.slugCurrent}`}>
                    <button className="bg-pink-700 text-white py-1 px-2 text-sm rounded hover:bg-pink-800">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleClick(product)}
                    className="bg-pink-700 text-white py-1 px-2 text-sm rounded hover:bg-pink-800"
                  >
                    Add to Cart
                  </button>
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

export default Shop;

