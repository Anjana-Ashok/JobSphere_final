// company.model.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    logo: { type: String }, // Cloudinary URL
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

const Company = mongoose.model("company", companySchema);

module.exports = { Company };
