import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/db';
import Customer from '@/app/models/customer';

export async function GET(req) {
  await dbConnect();
  const customers = await Customer.find().populate('groupName'); // Populate group details
  return new Response(JSON.stringify(customers), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const { customerName, customerID, password, groupName, userRole, purchaseLimit } = await req.json();

  const existingCustomer = await Customer.findOne({ customerID });
  if (existingCustomer) {
    return new Response(JSON.stringify({ message: 'Customer ID already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = new Customer({ customerName, customerID, password: hashedPassword, groupName, userRole, purchaseLimit });
  await customer.save();
  return new Response(JSON.stringify(customer), { status: 201 });
}
