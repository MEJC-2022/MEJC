import { InferSchemaType, Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { _id: false },
);

const orderItemSchema = new Schema(
  {
    id: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isArchived: { type: Boolean },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    deliveryAddress: { type: addressSchema, required: true },
    orderItems: { type: [orderItemSchema], required: true },
    isShipped: { type: Boolean, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>('Order', orderSchema);
