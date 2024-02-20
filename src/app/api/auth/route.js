import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    return NextResponse.json({ message: "Authenticated" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
