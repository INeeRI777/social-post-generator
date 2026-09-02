import { NextRequest, NextResponse } from "next/server";
import { searchUnsplashPhotos } from "@/lib/unsplash";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keywords = searchParams.get("keywords")?.split(",") ?? [];

  if (keywords.length === 0) {
    return NextResponse.json({ success: false, error: "No keywords" }, { status: 400 });
  }

  try {
    const photos = await searchUnsplashPhotos(keywords);
    return NextResponse.json({ success: true, photos });
  } catch (error) {
    console.error("Photos error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
