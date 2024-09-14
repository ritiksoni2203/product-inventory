'use client';

import { useState, useEffect } from 'react';

export default function ProductCart() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [purchaseLimit, setPurchaseLimit] = useState(0);
    const [userRole, setUserRole] = useState('');
    const [exceedsLimit, setExceedsLimit] = useState(false);

    const customerId = localStorage.getItem('id');

    useEffect(() => {
        async function fetchData() {
            const productRes = await fetch(`/api/customer-products?customerId=${customerId}`);
            const productsData = await productRes.json();
            setProducts(productsData.products);

            setPurchaseLimit(productsData.customer.purchaseLimit);
            setUserRole(productsData.customer.userRole);
        }
        fetchData();
    }, [customerId]);

    const handleProductSelect = (productId, price) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], selected: !prev[productId]?.selected, price },
        }));
    };

    const handleQuantityChange = (productId, quantity) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productId]: { ...prev[productId], quantity: parseInt(quantity) || 0 },
        }));
    };

    const calculateTotalPrice = () => {
        let total = 0;
        Object.keys(selectedProducts).forEach((productId) => {
            if (selectedProducts[productId]?.selected) {
                const productPrice = selectedProducts[productId].price;
                const quantity = selectedProducts[productId].quantity || 1;
                let productTotal = productPrice * quantity;

                if (quantity > 3) {
                    productTotal *= 0.95;
                }

                total += productTotal;
            }
        });

        if (userRole === 'Regular') {
            total *= 0.90;
        } else if (userRole === 'Premium') {
            total *= 0.80;
        }

        setTotalPrice(total);

        setExceedsLimit(total > purchaseLimit);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Product Cart</h1>
            <table className="table-auto w-full mb-6">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Select</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Product Name</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Price</th>
                        <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Quantity</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                                No Products available
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-6 py-2">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleProductSelect(product._id, product.price)}
                                        checked={selectedProducts[product._id]?.selected || false}
                                    />
                                </td>
                                <td className="px-6 py-2">{product.productName}</td>
                                <td className="px-6 py-2">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={selectedProducts[product._id]?.quantity || 1}
                                        onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                        className="border px-2 py-1 rounded-md"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <button
                onClick={calculateTotalPrice}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                Calculate Price
            </button>

            {totalPrice > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
                    {exceedsLimit && (
                        <p className="text-red-600 font-semibold">
                            You are not allowed to proceed with this order!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
