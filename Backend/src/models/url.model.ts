import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUrl extends Document {
  fullUrl: string;
  shortID: string;
  owner?: Types.ObjectId | null;
  createdAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    fullUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model<IUrl>("Url", urlSchema);
