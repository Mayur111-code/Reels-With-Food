const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadFile(buffer, fileName, mimeType) {
    try {
        const base64Data = buffer.toString("base64");
        const fileUri = `data:${mimeType};base64,${base64Data}`;

        const result = await cloudinary.uploader.upload(fileUri, {
            resource_type: "video",
            public_id: fileName
        });

        return { url: result.secure_url };

    } catch (error) {
        console.log("CLOUDINARY ERROR:", error);
        throw error;
    }
}

module.exports = { uploadFile };
