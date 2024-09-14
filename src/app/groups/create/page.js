'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateGroup() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleProductSelect = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, productIds: selectedProducts })
    });

    if (res.ok) {
      router.push('/groups');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Group</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select Products</h3>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={product._id}
                  value={product._id}
                  onChange={() => handleProductSelect(product._id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={product._id} className="ml-2 text-sm text-gray-700">
                  {product.productName} - ${product.price}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Group
        </button>
      </form>
    </div>
  );
}
