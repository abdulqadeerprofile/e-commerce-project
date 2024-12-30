'use client';

import { useState } from 'react';
import { Product, CartItem } from '@/types/types';

export default function AddToCartButton({ product }: { product: Product }): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (): void => {
    setIsLoading(true);
    try {
      const savedCart = localStorage.getItem('cart');
      const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItem = cart.find(item => item.id === product.id);
      let updatedCart: CartItem[];

      if (existingItem) {
        updatedCart = cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      window.dispatchEvent(new Event('cartUpdated'));
      
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add product to cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={isLoading}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
