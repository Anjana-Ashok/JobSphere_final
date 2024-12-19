const { Job } = require("../model/job.model");

// Admin: Post a Job
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Student: Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Student: Get Job by ID
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Admin: Get Jobs Created by Admin
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updates = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        const job = await Job.findById(jobId);

        // if (!job) {
        //     return res.status(404).json({
        //         message: "Job not found.",
        //         success: false
        //     });
        // }

        if (String(job.created_by) !== String(req.id)) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false
            });
        }

        // Update fields
        if (updates.title) job.title = updates.title;
        if (updates.description) job.description = updates.description;
        if (updates.requirements) job.requirements = updates.requirements.split(",");
        if (updates.salary) job.salary = Number(updates.salary);
        if (updates.location) job.location = updates.location;
        if (updates.jobType) job.jobType = updates.jobType;
        if (updates.experience) job.experienceLevel = updates.experience;
        if (updates.position) job.position = updates.position;

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
// Export functions using module.exports
module.exports = {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,updateJob
};
