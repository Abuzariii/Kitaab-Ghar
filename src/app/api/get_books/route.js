import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
const { ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;

// * Function to connect to MongoDB
async function connect() {
  const client = await MongoClient.connect(uri);
  const db = client.db("test");
  const collection = db.collection("Books-Dataset");

  return { client, collection };
}

export async function POST(req) {
  try {
    const data = await req.json();

    const pageNum = data.pageNum;
    const itemsPerPage = 50;
    const skip = (pageNum - 1) * itemsPerPage;

    const { client, collection } = await connect();

    // ! Get a single book
    if (data.id) {
      const book = await collection.findOne({ _id: new ObjectId(data.id) });
      client.close();

      return NextResponse.json({ book }, { status: 200 });
    }
    // ! Search by Year
    if (data.year) {
      const books = await collection
        .find({ "Year-Of-Publication": data.year })
        .skip(skip)
        .limit(itemsPerPage)
        .toArray();
      client.close();

      return NextResponse.json({ books }, { status: 200 });
    }
    // ! Search by Author
    if (data.author) {
      const books = await collection
        .find({ "Book-Author": data.author })
        .skip(skip)
        .limit(itemsPerPage)
        .toArray();
      client.close();

      return NextResponse.json({ books }, { status: 200 });
    }
    // ! Search by Publisher
    if (data.publisher) {
      const books = await collection
        .find({ Publisher: data.publisher })
        .skip(skip)
        .limit(itemsPerPage)
        .toArray();
      client.close();

      return NextResponse.json({ books }, { status: 200 });
    }
    // ! Get all Books
    else {
      const books = await collection
        .find({})
        .skip(skip)
        .limit(itemsPerPage)
        .toArray();
      client.close();

      return NextResponse.json({ books }, { status: 200 });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
