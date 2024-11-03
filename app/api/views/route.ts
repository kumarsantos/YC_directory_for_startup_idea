import { connectToDatabase } from "@/config/db";
import Startups from "@/models/startup";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();

    const startup = await Startups.findById(id);
    startup.views += 1;
    await startup.save();

    return NextResponse.json(
      { msg: "", data: startup?.views, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Something went wrong", success: false, error },
      { status: 500 }
    );
  }
}
