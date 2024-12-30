import Link from 'next/link';
import { Product } from '@/types/types';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="aspect-square relative mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 line-clamp-1">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{product.rating.rate}</span>
        <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
      </div>
      <Link 
        href={`/products/${product.id}`}
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}
