import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/db';
import Customer from '@/app/models/customer';

export async function POST(req) {
    await dbConnect();
    const { customerID, password } = await req.json();

    const customer = await Customer.findOne({ customerID });
    if (!customer) {
        return new Response(JSON.stringify({ message: 'Invalid ID or password' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return new Response(JSON.stringify({ message: 'Invalid ID or password' }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: 'Login successful', id: customerID }), { status: 200 });
}
