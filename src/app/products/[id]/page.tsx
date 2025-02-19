"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>; // `params` is a Promise in Next.js 14+
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params); // Unwrap the params Promise
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!resolvedParams?.id) return;

    fetch(`https://dummyjson.com/products/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [resolvedParams.id]);

  if (!product) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    alert("Added to cart"); // Replace with a toast notification if needed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" />
        Back to products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-64 md:h-96">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-green-500">{product.discountPercentage}% off</span>
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-600 text-white p-2 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="bg-gray-600 text-white p-2 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-600 transition"
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
