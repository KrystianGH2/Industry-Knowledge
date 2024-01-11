import safetyConcern from "@/app/(models)/safetyNetwork";
import dbConnectUserReports from "@/app/utils/dbReport";

export default async function handler(req, res) {
  try {
    await dbConnectUserReports();

    const userReports = await safetyConcern.find({});
    res.status(200).json({ userReports });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
