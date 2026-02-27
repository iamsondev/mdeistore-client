import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ error: "Tag is required" }, { status: 400 });
  }

  revalidatePath(`/${tag}`);
  return NextResponse.json({ revalidated: true, tag });
}
