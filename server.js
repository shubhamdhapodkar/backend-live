const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect MongoDB (change URI if you use local Mongo)
mongoose.connect("mongodb://127.0.0.1:27017/medicinDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ✅ Schema
const MedicineSchema = new mongoose.Schema({
    mname: String,
    mrp: String,
});

const Medicine = mongoose.model("Medicine", MedicineSchema);

// ✅ CRUD APIs

// Get all
app.get("/api/medicines", async (req, res) => {
    const meds = await Medicine.find();
    res.json(meds);
});

// Create
app.post("/api/medicines", async (req, res) => {
    const med = new Medicine(req.body);
    await med.save();
    res.json(med);
});

// Update
app.put("/api/medicines/:id", async (req, res) => {
    const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(med);
});

// Delete
app.delete("/api/medicines/:id", async (req, res) => {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
