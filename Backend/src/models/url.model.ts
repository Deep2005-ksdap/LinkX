import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  fullUrl: string;
  shortID: string;
  clicks: number;
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
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model<IUrl>("Url", urlSchema);
