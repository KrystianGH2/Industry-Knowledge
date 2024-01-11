import User from "@/app/(models)/User";
import dbConnectUsers from "../../app/utils/db";

export default async function handler(req, res) {
  try {
    await dbConnectUsers();

    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
