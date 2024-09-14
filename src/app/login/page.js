'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomerLogin() {
    const router = useRouter();
    const [customerId, setCustomerId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customerID: customerId, password })
        });
        const data = await res.json()

        localStorage.setItem('id', data.id)

        if (res.ok) {
              router.push('/dashboard');
        } else {
            alert('Invalid login credentials');
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Customer Login</h1>
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="customerId" className="block text-sm font-medium">Customer ID</label>
                    <input type="text" id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Login</button>
            </form>
        </div>
    );
}
