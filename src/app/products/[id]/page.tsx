"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [params.id])

  if (!product) {
    return <div>Loading...</div>
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
    alert("Added to cart") // You can replace this with a toast notification
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="flex items-center mb-4">
        <ArrowLeft className="mr-2" />
        Back to products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-64 md:h-96">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
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
          <div className="flex items-center mb-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-600 p-2 rounded-full">
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="bg-gray-600 p-2 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center">
            <ShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

