import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
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
    strict: "throw",
  }
);

export type User = InferSchemaType<typeof userSchema> & { _id: string };

export const UserModel = model("User", userSchema);