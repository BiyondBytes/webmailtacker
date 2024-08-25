import { NextResponse, NextRequest } from "next/server";
export async function GET() {
    const envdata = process.env.DATABASE_URL;
    console.log("helloworld", envdata)
    return NextResponse.json({ success: true, message: "tracker created successful", data: { token: envdata } }, { status: 200 });
}
