import { connectToDatabase } from "@/config/db";
import Authors from "@/models/author";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    //Extracting query params from url
    const parsedUrl = new URL(req.url);
    const params = new URLSearchParams(parsedUrl.search);
    const startupId = params.get("startupId");

    let filter = {};
    if (startupId) {
      filter = { _id: startupId };
    }
    const authors = await Authors.find(filter);

    console.log({ authors });

    if (authors?.length <= 0) {
      return NextResponse.json(
        { msg: "", data: [], success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { msg: "", data: authors, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Something went wrong", success: false, error },
      { status: 500 }
    );
  }
}
