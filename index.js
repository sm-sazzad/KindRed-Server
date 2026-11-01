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

// homepage event show
app.get("/api/featured", async (req, res) => {
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const result = await events
    .find({ eventDate: { $gte: today } })
    .sort({ eventDate: 1 })
    .limit(6)
    .toArray();

  res.send(result);
});

app.get("/api/events/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const result = await events.find({ categoryId }).toArray();
  res.send(result);
});

app.get("/api/events/:id", async (req, res) => {
  const id = req.params.id;
  const result = await events.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

//get joined event
app.get("/api/joined", async (req, res) => {
  const result = await joinedEvents.find({}).toArray();
  res.send(result);
});

//get joined event by id and email
app.get("/api/joined/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;
  const query = {
    $or: [{ eventId: id }, { _id: id }],
    ...(email ? { email } : {}),
  };
  const result = await joinedEvents.findOne(query);
  res.send({ isJoined: !!result });
});

//post joined event
app.post("/api/joined", async (req, res) => {
  const newJoined = req.body;
  // Ensure we don't save event's _id as document's _id so multiple users can join the same event
  if (newJoined._id) {
    if (!newJoined.eventId) {
      newJoined.eventId = newJoined._id;
    }
    delete newJoined._id;
  }
  const result = await joinedEvents.insertOne(newJoined);
  res.send(result);
  console.log(result);
});

// delete joined event by id and email
app.delete("/api/joined/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;
  const query = {
    $or: [{ eventId: id }, { _id: id }],
    ...(email ? { email } : {}),
  };
  const result = await joinedEvents.deleteOne(query);
  res.send(result);
  console.log(result);
});

app.post("/api/events", async (req, res) => {
  const newEvent = req.body;
  const result = await events.insertOne(newEvent);
  res.send(result);
});

app.patch("/api/events/:id", async (req, res) => {
  const updatedData = req.body;
  const filter = { _id: new ObjectId(req.params.id) };
  const updatedDoc = {
    $set: {
      ...updatedData,
    },
  };
  const result = await events.updateOne(filter, updatedDoc);
  res.send(result);
});

app.delete("/api/events/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await events.deleteOne(query);
  res.send(result);
  console.log(result);
});

app.listen(port, () => {
  console.log(`Surver running at ${port} port`);
});
