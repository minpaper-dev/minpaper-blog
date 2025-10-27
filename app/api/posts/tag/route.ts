import { NextResponse } from "next/server";
import { getAllPostsServer } from "@/lib/posts-server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    if (!tag) {
      return NextResponse.json(
        { error: "Tag parameter is required" },
        { status: 400 }
      );
    }

    const allPosts = getAllPostsServer();
    const filteredPosts = allPosts.filter((post) => post.tags.includes(tag));

    return NextResponse.json(filteredPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts by tag" },
      { status: 500 }
    );
  }
}
