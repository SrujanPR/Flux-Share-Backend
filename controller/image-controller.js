import File from "../models/file.js";
import fs from "fs";
import path from "path";

export const uploadImage = async (request, response) => {
    const absolutePath = path.resolve(request.file.path);
    const fileObj = {
        path: absolutePath,
        name: request.file.originalname
    }
    try {
        const file = await File.create(fileObj);
        const protocol = request.protocol;
        const host = request.get('host');
        const baseUrl = `${protocol}://${host}`;
        response.status(200).json({ path: `${baseUrl}/file/${file._id}`})
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
}


export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);
        if (!file) {
            return response.status(404).json({ message: "File not found" });
        }
        if (!fs.existsSync(file.path)) {
            return response.status(404).json({ message: "File unavailable on server (storage cleared or moved)" });
        }
        file.downloadContent++;
        await file.save();
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ message: error.message });
    }
}

