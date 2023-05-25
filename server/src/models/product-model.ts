import { InferSchemaType, Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    image: { type: Schema.Types.ObjectId, ref: 'files' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    isArchived: { type: Boolean },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model<Product>('Product', productSchema);
