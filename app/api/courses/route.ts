import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/db/schema";

export const GET = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  // Get query parameters for pagination (page and limit)
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  // Fetch the paginated courses from the database
  const data = await db.query.courses.findMany({
    limit,
    offset,
  });

  // Custom query to count the total number of courses
  const totalCountResult = await db.query.courses.findMany({
    columns: { id: true },
  });
  const totalCount = totalCountResult.length;

  // Set the Content-Range header
  const contentRange = `courses ${offset}-${offset + data.length - 1}/${totalCount}`;
  
  // Prepare the response
  const response = NextResponse.json(data);
  response.headers.set("Content-Range", contentRange);
  response.headers.set("Access-Control-Expose-Headers", "Content-Range");

  return response;

  // Kode lama
  // const data = await db.query.courses.findMany();
  // return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(courses).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};