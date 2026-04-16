import { NextRequest, NextResponse } from "next/server";
import { analyzeDeckAction } from "@/app/analyze/actions";

export async function POST(req: NextRequest) {
    const text = await req.text();
    
    // Create a mock FormData
    const formData = new FormData();
    formData.append("deck", text);

    const data = await analyzeDeckAction(null, formData);
    return NextResponse.json(data);
}
