'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchCustomers() {
            const res = await fetch('/api/customers');
            const data = await res.json();
            setCustomers(data);
        }
        fetchCustomers();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Customers List</h1>
                <div className='flex gap-3'>
                    <Link href="/login">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                            Login
                        </button>
                    </Link>
                    <Link href="/customers/add">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-bold">Add Customer</button>
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Customer ID</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Customer Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Group Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">User Role</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Purchase Limit</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                                    No Customers available
                                </td>
                            </tr>
                        ) : (customers.map((customer) => (
                            <tr key={customer._id} className="hover:bg-gray-50">
                                <td className="py-2 px-6">{customer.customerID}</td>
                                <td className="py-2 px-6">{customer.customerName}</td>
                                <td className="py-2 px-6">{customer.groupName?.groupName}</td>
                                <td className="py-2 px-6">{customer.userRole}</td>
                                <td className="py-2 px-6">${customer.purchaseLimit}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
