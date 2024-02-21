import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

function genHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export async function POST(req) {
  try {
    const { fullName, username, email, password } = await req.json();

    // * If user is already signed up
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.rows.length !== 0) {
      return NextResponse.json(
        { message: "User already exists, please log in!!!" },
        { status: 302 }
      );
    } else {
      const id = v4();
      const hash = genHash(password);

      await sql`INSERT INTO users (id, fullName, username, email, password) VALUES (${id}, ${fullName}, ${username}, ${email}, ${hash});`;
      return NextResponse.json(
        { message: "User Created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
