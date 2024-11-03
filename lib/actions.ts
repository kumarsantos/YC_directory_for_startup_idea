"use server";

import { auth } from "@/auth";
import Authors from "@/models/author";
import Startups from "@/models/startup";
import { parseServerActionResponse } from "@/utils/helper";
import slugify from "slugify";

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not Signed In",
      status: "ERROR",
    });
  }

  const { title, description, category, imageUrl } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );
  const slug = slugify(title as string, { lower: true, strict: true });
  const author = await Authors.findOne({ email: session?.user?.email });
  try {
    const startup = {
      title,
      description,
      category,
      imageUrl,
      slug,
      pitch,
      author: author?._id,
    };
    const result = await Startups.create(startup);
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
