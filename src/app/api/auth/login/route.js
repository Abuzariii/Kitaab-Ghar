import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await sql`SELECT * FROM users WHERE email = ${email}`;

    // * If no user found
    if (user.rows.length == 0) {
      return NextResponse.json(
        { message: "No user found with such email, please signup!!!" },
        { status: 404 }
      );
    }

    // * If password doesn't match
    const verified = await bcrypt.compare(password, user.rows[0].password);
    if (!verified) {
      return NextResponse.json(
        { message: "Incorrect password, please try again!!!" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Logged-in successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
