import { fetchProduct } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Products
      </Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{product.rating.rate}</span>
            <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}