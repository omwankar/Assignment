import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
}

export default function ProductCard({ id, title, price, discountPercentage, rating, thumbnail }: ProductCardProps) {
  const discountedPrice = price * (1 - discountPercentage / 100)

  return (
    <Link href={`/products/${id}`} className="block">
      <div className="bg-amazon-dark rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
          <Image src={thumbnail || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

