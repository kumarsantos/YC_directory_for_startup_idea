import { connectToDatabase } from "@/config/db";
import Authors from "@/models/author";
import Startups from "@/models/startup";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    //Extracting query params from url
    const parsedUrl = new URL(req.url);
    const params = new URLSearchParams(parsedUrl.search);
    let startupId = params.get("startupId");
    let searchKey = params.get("searchKey");
    let userId = params.get("userId");

    if (searchKey === "undefined") {
      searchKey = null;
    }
    if (startupId === "undefined") {
      startupId = null;
    }
    if (userId === "undefined") {
      userId = null;
    }

    let filter = {};
    if (startupId) {
      filter = { _id: startupId };
    } else if (searchKey) {
      filter = {
        slug: { $regex: new RegExp(searchKey, "i") },
        title: { $regex: new RegExp(searchKey, "i") },
      };
    } else if (userId) {
      filter = {
        author: userId,
      };
    }

    let startups = await Startups.find(filter);

    if (startups?.length <= 0) {
      return NextResponse.json(
        { msg: "", data: [], success: false },
        { status: 404 }
      );
    }
    startups = await Promise.all(
      startups?.map(async (item) => {
        const data: any = {};
        const authorId = item.author.toString();
        data["authorInfo"] = await Authors.findOne({ _id: authorId });
        data["startupInfo"] = item;
        return data;
      })
    );

    return NextResponse.json(
      { msg: "", data: startups, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Something went wrong", success: false, error },
      { status: 500 }
    );
  }
}
