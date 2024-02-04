import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;

export async function POST(req) {
  try {
    const data = await req.json();

    const itemsPerPage = 100;
    const pageNum = data.pageNum;
    const skip = (pageNum - 1) * itemsPerPage;

    const client = await MongoClient.connect(uri);
    const db = client.db("test");
    const collection = db.collection("Books-Dataset");

    const books = await collection
      .find({})
      .skip(skip)
      .limit(itemsPerPage)
      .toArray();
    client.close();

    return NextResponse.json({ books }, { status: 200 });
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
