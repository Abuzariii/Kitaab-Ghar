import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    console.log(data);

    return NextResponse.json({ message: "Thank you" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
