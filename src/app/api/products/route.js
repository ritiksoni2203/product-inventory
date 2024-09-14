import dbConnect from '@/app/lib/db';
import Group from '@/app/models/group';
import Product from '@/app/models/product';

export async function GET(req) {
  try {
    await dbConnect();

    const products = await Product.find({});

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
