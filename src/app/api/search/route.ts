import { NextRequest, NextResponse } from "next/server";
import { hybridSearchService } from "@/lib/services/search/hybrid-search.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const results = await hybridSearchService.search(query);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
