const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: [
            {
                type: String,
            },
        ],
        salary: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        experienceLevel: {
            type: Number,
            required: true,
        },
        position: {
            type: Number,
            required: true,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "company",
            required: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "signup",
            required: true,
        },
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "application",
            },
        ],
    },
    { timestamps: true }
);

const Job = mongoose.model("job", jobSchema);

module.exports = { Job };
