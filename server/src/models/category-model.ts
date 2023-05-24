import { InferSchemaType, Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Category = InferSchemaType<typeof categorySchema>;

export const CategoryModel = model<Category>('Category', categorySchema);
