import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;

export async function GET(req) {
  try {
    console.log("Req received");

    const client = await MongoClient.connect(uri);
    const db = client.db("test");
    const collection = db.collection("Books-Dataset");

    const books = await collection.find({}).limit(100).toArray();
    client.close();

    console.log(books);
    return NextResponse.json({ message: "Req received" }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// ! For Post Requests
// export async function POST(req) {
//   try {
//     const data = await req.json();
//     console.log(data);
//     return NextResponse.json({ message: "Data Received" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }
