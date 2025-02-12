// @ts-check
const express = require("express");
const mongoose = require("mongoose");

/** @type {string} */
const DATABASE_URL = process.env.DATABASE_URL;
/** @type {string} */
const DATABASE_NAME = process.env.MONGO_INITDB_DATABASE;
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

mongoose
  .connect(DATABASE_URL, {
    autoIndex: true,
    autoCreate: true,
    dbName: DATABASE_NAME,
  })
  .then(() => console.log(`Connected to MongoDB: ${DATABASE_URL}`))
  .catch((error) => console.error("Could not connect to MongoDB", error));

const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: String,
  description: String,
});
const Item = mongoose.model("Item", ItemSchema);

app.get("/items", async (_req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/items", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, console.log.bind(`Server is listening on port ${PORT}`));
