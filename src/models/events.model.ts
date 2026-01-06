import mongoose, { Schema, Document } from "mongoose";

interface eventIF extends Document {
  shortID: string;
  timestamp: Date;
  userAgent: string;
  ipHash: string;
  referrer: string;
}

const eventSchema = new Schema<eventIF>({
  shortID: {
    type: String,
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: String,
  ipHash: String,
  referrer: String,
});

export const ClickEvent = mongoose.model<eventIF>("Event", eventSchema);
