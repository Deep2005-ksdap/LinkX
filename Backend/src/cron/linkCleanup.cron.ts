import cron from "node-cron";
import { Url } from "../models/url.model";

const deleteExpiredLink = async () => {
  try {
    const days = 7;

    // date.now -> gives miliseconds
    const expiryDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const result = await Url.deleteMany({
      owner: null,
      createdAt: { $lt: expiryDate }, // less than
    });
    console.log("Cron Job: Deleted links ->", result.deletedCount);
  } catch (error) {
    console.error("Cron Job Error:");
  }
};

cron.schedule("0 0 * * *", () => {
  deleteExpiredLink();
});
