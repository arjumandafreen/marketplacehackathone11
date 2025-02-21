"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Swal from "sweetalert2";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import couples from "../components/images/carrot.png";
import img9 from "../components/images/banner.jpg";
import img10 from "../components/images/gogo.png";
import { Products } from "../../../types/products";


const Herosection = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

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
    <div className="relative w-full">
      <div className="relative w-full h-[50vh] sm:h-[716px] bg-cover">
        <Image src={img9} alt="Banner" fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start p-8 sm:p-12 text-white">
          <div className="w-full sm:w-[599px] text-center sm:text-left">
            <h5 className="font-bold text-[14px] sm:text-[16px]">SUMMER 2020</h5>
            <h1 className="font-bold text-[30px] sm:text-[58px]">NEW COLLECTION</h1>
            <h4 className="text-[14px] sm:text-[20px] sm:w-[376px]">
              We understand the behavior of large objects, but things at a smaller scale behave differently.
            </h4>
            <button className="w-[60%] sm:w-[170px] bg-[#2DC071] py-[12px] px-[30px] sm:px-[40px] rounded text-white">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-800">Featured Products</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-4 text-left">
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                    className="block"
                  />
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
      </section>
       {/* Other Sections */}
       <div className="w-full bg-[#23856D] py-10 lg:py-20">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 lg:px-12">
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-white">SUMMER 2024</h4>
            <h1 className="text-[32px] lg:text-[58px] font-bold text-white">Luma Elite Product</h1>
            <p className="text-white">Uncover the excellence of our products</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <h3 className="text-white">$16.48</h3>
              <button className="bg-[#2DC071] text-white px-6 py-3 rounded-md">ADD TO CART</button>
            </div>
          </div>
          <div className="flex-1">
            <Image src={img10} alt="Green Man" width={500} height={500} className="mx-auto lg:mx-0" />
          </div>
        </div>
      </div>

      <div className="w-full h-auto mt-[50px]">
        <div className="max-w-[1440px] flex flex-col lg:flex-row gap-[30px] px-4 lg:px-0">
          <div className="relative w-full lg:w-[707px] h-[400px] lg:h-[682px]">
            <Image src={couples} alt="couple" className="object-cover w-full h-full" />
          </div>
          <div className="w-full lg:w-[573px] flex flex-col gap-[20px] items-center lg:items-start text-center lg:text-left">
            <h5 className="text-[#BDBDBD]">SUMMER 2020</h5>
            <h2 className="lg:w-[375px] text-[#252B42]">Part of the Neural Universe</h2>
            <h4 className="lg:w-[375px] text-[#737373]">We know how large objects will act, but things on a small scale.</h4>
            <div className="flex flex-wrap justify-center lg:justify-start gap-[10px]">
              <button className="bg-[#2DC071] text-white py-[12px] px-[20px] rounded">BUY</button>
              <button className="border-[#2DC071] text-[#2DC071] border py-[12px] px-[20px] rounded">WATCH TRAILER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


 

export default Herosection;

    

  
    
  
    
 
      