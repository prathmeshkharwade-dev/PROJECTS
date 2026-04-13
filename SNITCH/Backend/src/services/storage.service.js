import { config } from "../config/config.js";

export async function uploadFile({ buffer, fileName, folder = "snitch" }) {
    const formData = new FormData();
    formData.append("file", buffer.toString("base64"));
    formData.append("fileName", fileName);
    formData.append("folder", folder);

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(config.IMAGEKIT_PRIVATE_KEY + ":").toString("base64")}`,
        },
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Image upload failed");
    }

    return result;
}