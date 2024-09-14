import dbConnect from '@/app/lib/db';
import ProductGroup from '@/app/models/product';
import Group from '@/app/models/group';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
    await dbConnect();
    const { id } = params;
    
    const groups = await Group.findById(id);
    return new Response(JSON.stringify(groups), { status: 200 });
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id } = params;

        const updatedGroup = await ProductGroup.findByIdAndUpdate(
            id,
            {
                groupName: body.groupName,
                products: body.products,
            },
            { new: true }
        );

        return new Response(JSON.stringify(updatedGroup), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error updating product group' }), {
            status: 500,
        });
    }
}
