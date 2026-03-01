import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const file = formData.get("image");
    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    try {
      // Parse form data
      const eventData = {
        title: formData.get("title"),
        description: formData.get("description"),
        overview: formData.get("overview"),
        venue: formData.get("venue"),
        location: formData.get("location"),
        date: formData.get("date"),
        time: formData.get("time"),
        mode: formData.get("mode"),
        audience: formData.get("audience"),
        organizer: formData.get("organizer"),
        agenda: JSON.parse(formData.get("agenda")),
        tags: JSON.parse(formData.get("tags")),
      };

      // Upload image to Cloudinary
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "DevEvent" },
            (error, results) => {
              if (error) return reject(error);
              resolve(results);
            },
          )
          .end(buffer);
      });

      eventData.image = uploadResult.secure_url;

      const createdEvent = await Event.create(eventData);

      return NextResponse.json(
        { message: "Event created successfully", event: createdEvent },
        { status: 201 },
      );
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid data format", error: e.message },
        { status: 400 },
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Event fetching failed", error: error.message },
      { status: 500 },
    );
  }
}
