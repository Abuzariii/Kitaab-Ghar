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
    const id = v4();
    const hash = genHash(password);

    await sql`INSERT INTO users (id, fullName, username, email, password) VALUES (${id}, ${fullName}, ${username}, ${email}, ${hash});`;
    return NextResponse.json({ message: "Data Created successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
