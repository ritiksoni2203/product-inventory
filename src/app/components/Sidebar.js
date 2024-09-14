'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    const navigateTo = (path) => {
        router.push(path);
    };

    const isActive = (path) => pathname === path; // Check if the current path matches

    return (
        <div className="sidebar h-screen p-4 w-64 bg-gray-100">
            <ul>
                <li>
                    <button
                        onClick={() => navigateTo('/dashboard')}
                        className={`block w-full text-left py-2 px-4 rounded ${isActive('/dashboard') ? 'bg-gray-300' : 'hover:bg-gray-300'
                            }`}
                    >
                        Dashboard
                    </button>
                </li>
                <li className='mt-2'>
                    <button
                        onClick={() => navigateTo('/groups')}
                        className={`block w-full text-left py-2 px-4 rounded ${isActive('/groups') ? 'bg-gray-300' : 'hover:bg-gray-300'
                            }`}
                    >
                        Groups
                    </button>
                </li>
                <li className='mt-2'>
                    <button
                        onClick={() => navigateTo('/customers')}
                        className={`block w-full text-left py-2 px-4 rounded ${isActive('/customers') ? 'bg-gray-300' : 'hover:bg-gray-300'
                            }`}
                    >
                        Customers
                    </button>
                </li>
            </ul>
        </div>
    );
}
