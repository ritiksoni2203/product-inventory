import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerID: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  groupName: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  userRole: { type: String, enum: ['Regular', 'Premium'], required: true },
  purchaseLimit: { type: Number, required: true }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
