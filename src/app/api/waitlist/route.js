import { MongoClient } from "mongodb";

const clientPromise = (async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment");
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client;
})();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, email } = body || {};
    if (!name || !phone || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("waitlist");
    const result = await collection.insertOne({
      name,
      phone,
      email,
      createdAt: new Date(),
    });
    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
