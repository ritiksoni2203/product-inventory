import mongoose from 'mongoose';
import Product from './product';

const GroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.models.Group || mongoose.model('Group', GroupSchema);
