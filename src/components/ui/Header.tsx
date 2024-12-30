'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types/types';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const cartItems: CartItem[] = JSON.parse(cart);
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setItemCount(count);
      }
    };

    // Initial count
    updateCartCount();

    // Update count when storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            E-Shop
          </Link>
          
          <Link 
            href="/cart" 
            className="relative flex items-center gap-2 hover:text-blue-500"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
