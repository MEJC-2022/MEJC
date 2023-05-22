import argon2 from 'argon2';
import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    strict: 'throw',
  },
);

userSchema.pre('save', async function (next) {
  try {
    this.password = await argon2.hash(this.password, {
      timeCost: 2,
      memoryCost: 1024,
    });
  } catch (err) {
    console.error(err);
  }
  next();
});

export type User = InferSchemaType<typeof userSchema> & { _id: string };

export const UserModel = model('User', userSchema);
