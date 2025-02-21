import { client } from "@/sanity/lib/client";
import { Products } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Products> {
  return client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      discountPercent,
      sizes,
      image,
      colors,
      category,
      "slugCurrent": slug.current
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const post = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          {post.image && (
            <Image
              src={urlFor(post.image).url()}
              alt={post.name}
              width={500} // Adjusted image size
              height={500}
              className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.name}</h2>

          <p className="text-xl text-gray-600 mb-4">{post.description}</p>

          <div className="flex items-center mb-4">
            <p className="text-2xl font-bold text-gray-800">
              ${post.price}
            </p>
            {post.discountPercent && (
              <span className="ml-4 text-xl text-red-500">
                {post.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Category */}
          <p className="text-lg text-gray-500 mb-4">
            Category: <span className="font-semibold text-gray-800">{post.category}</span>
          </p>

          {/* Sizes Section */}
          <div className="mt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                Available Sizes:
              </h3>
              <div className="flex gap-4 flex-wrap">
                {post.sizes.map((size: string) => (
                  <span
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Colors Section */}
            {post.colors && post.colors.length > 0 && (
              <div className="mt-4 mb-6">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  Available Colors:
                </h3>
                <div className="flex gap-4 flex-wrap">
                  {post.colors.map((color: string) => (
                    <span
                      key={color}
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor: color,
                        border: "1px solid #ddd",
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            )}

               {/* Add to Cart Button */}
             <div className="flex items-center gap-4 mt-6">
              <Link href="/shop">
                <button className="w-full md:w-auto px-6 py-3 bg-red-800 text-white rounded-lg shadow-lg hover:bg-green-400 transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2">
                 For Add to cart Visit shop page <FaShoppingCart />
                </button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
