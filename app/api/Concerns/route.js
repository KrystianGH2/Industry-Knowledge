import { NextResponse } from "next/server";
import safetyConcern from "@/app/(models)/safetyNetwork";

export async function POST(req) {
  try {
     const requestData = await req.json();
    console.log("Received data:", requestData);

    const { title, description, location, username } = requestData;

    // Confirm data exists
    if (
      !title ||
      !description ||
      !location ||
      !location.latitude ||
      !location.longitude ||
      !username
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    } else {
      console.log(username);
    }

    // Save data to the database
    const newSafetyConcern = new safetyConcern({
      username,
      title,
      description,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude], // saves the coordinates in an array
      },
    });

    await newSafetyConcern.save();

    // Other processing or validation logic here

    // Example: Save data to a database or perform other actions

    return NextResponse.json({ message: "Report Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error Failed Creating Data", error },
      { status: 500 }
    );
  }
}
