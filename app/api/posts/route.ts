import { NextResponse } from "next/server";
import { getAllPostsServer } from "@/lib/posts-server";

export async function GET() {
  try {
    const posts = getAllPostsServer();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
