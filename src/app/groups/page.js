'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GroupList() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchGroups() {
            const res = await fetch('/api/groups');
            const data = await res.json();
            console.log('data', data);
            
            setGroups(data);
        }
        fetchGroups();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Product Group List</h1>
                <div className='flex gap-3'>
                    <Link href="/login">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                            Login
                        </button>
                    </Link>
                    <Link href="/groups/create">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
                            Create New Group
                        </button>
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Group Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Product Count</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {groups.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                                    No groups available
                                </td>
                            </tr>
                        ) : (
                            groups.map((group) => (
                                <tr key={group._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 text-gray-700">{group.groupName}</td>
                                    <td className="py-4 px-6 text-gray-700">{group.products.length}</td>
                                    <td className="py-4 px-6">
                                        <Link href={`/groups/update/${group._id}`}>
                                            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-sm font-medium">
                                                Update Group
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
