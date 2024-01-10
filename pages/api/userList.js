import User from "@/app/(models)/User";
import dbConnect from "../../app/utils/db";

export default async function handler(req, res) {
  try {
    console.log("Connecting to the database...");
    await dbConnect();
    if (dbConnect.status === "OK") {
      console.log("Connected to database");
    }

    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
