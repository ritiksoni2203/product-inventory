import dbConnect from '@/app/lib/db';
import Customer from '@/app/models/customer';
import Group from '@/app/models/group';
import Product from '@/app/models/product';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId'); 

    const customer = await Customer.findOne({ customerID: customerId });

    if (!customer) {
      return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
    }

    const group = await Group.findOne({ _id: customer.groupName }).populate('products');

    if (!group) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    const products = await Product.find({ _id: { $in: group.products } });

    const responseData = {
        customer,
        products
    };


    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error fetching customer products:', error);
    return NextResponse.json({ message: 'Error fetching customer products' }, { status: 500 });
  }
}
