import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB();

const database = client.db("KindRed");
const events = database.collection("events");
const joinedEvents = database.collection("joinedEvents");

app.get("/", (req, res) => {
  res.send("Wellcome to KindRed API");
});

app.get("/api/events", async (req, res) => {
  const result = await events.find({}).sort({ eventDate: 1 }).toArray();
  res.send(result);
});

app.get("/api/events/email/:email", async (req, res) => {
  const { email } = req.params;
  const result = await events.find({ email }).sort({ eventDate: 1 }).toArray();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Surver running at ${port} port`);
});
