import { NextResponse } from "next/server";
import { getAllTagsServer } from "@/lib/posts-server";

export async function GET() {
  try {
    const tags = getAllTagsServer();
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
