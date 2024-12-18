const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
    cloud_name: "dkbzasxal",
    api_key: "767296491471398",
    api_secret: "lRANyG82ohR8PsVC3Z255lt3YE0",
});

module.exports = cloudinary;
