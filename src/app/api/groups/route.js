import dbConnect from '@/app/lib/db';
import Group from '@/app/models/group';
import Product from '@/app/models/product';

export async function GET(req) {
  await dbConnect();
  const groups = await Group.find().populate('products');
  console.log('groups', groups);
  
  return new Response(JSON.stringify(groups), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const { groupName, productIds } = await req.json();
  
  const existingGroup = await Group.findOne({ groupName });
  if (existingGroup) {
    return new Response(JSON.stringify({ message: 'Group name already exists' }), { status: 400 });
  }

  const group = new Group({ groupName, products: productIds });
  await group.save();
  
  return new Response(JSON.stringify(group), { status: 201 });
}

export async function PUT(req) {
  await dbConnect();
  const { groupId, groupName, productIds } = await req.json();

  const group = await Group.findById(groupId);
  if (!group) {
    return new Response(JSON.stringify({ message: 'Group not found' }), { status: 404 });
  }

  group.groupName = groupName;
  group.products = productIds;
  await group.save();
  
  return new Response(JSON.stringify(group), { status: 200 });
}
