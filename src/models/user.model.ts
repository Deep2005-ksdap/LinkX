import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  fullname: {
    firstname: string;
    lastname?: string;
  };
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        trim: true,
      },
      lastname: {
        type: String,
        trim: true,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
