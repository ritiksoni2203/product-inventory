'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [password, setPassword] = useState('');
  const [groupName, setGroupName] = useState('');
  const [userRole, setUserRole] = useState('Regular');
  const [purchaseLimit, setPurchaseLimit] = useState(1000);

  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch('/api/groups');
      const data = await res.json();
      setGroups(data);
      if (data.length > 0) {
        setGroupName(data[0]._id);
      }
    }
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerID:customerId, customerName, password, groupName, userRole, purchaseLimit })
    });

    if (res.ok) {
      router.push('/customers');
    }
    else {
        console.log(res);
        
        alert(res.message)
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Customer</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="customerId" className="block text-sm font-medium">Customer ID</label>
          <input type="text" id="customerId" value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium">Customer Name</label>
          <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium">Group</label>
          <select id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full border px-3 py-2 rounded-md">
            {groups.map((group) => (
              <option key={group._id} value={group._id}>{group.groupName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="userRole" className="block text-sm font-medium">User Role</label>
          <select id="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)} className="w-full border px-3 py-2 rounded-md">
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="purchaseLimit" className="block text-sm font-medium">Purchase Limit</label>
          <input type="number" id="purchaseLimit" value={purchaseLimit} onChange={(e) => setPurchaseLimit(e.target.value)} className="w-full border px-3 py-2 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Save</button>
      </form>
    </div>
  );
}
