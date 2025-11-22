import express from "express";
import router from "./routes/routes.js"; 
import cors from "cors";
import DBConnection from "./database/db.js";
import fs from "fs";
import path from "path";

const app = express();

// honor X-Forwarded-* headers when behind a proxy/CDN (Render)
app.set('trust proxy', true);

// Ensure uploads directory exists (for Multer)
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use("/", router);

const PORT = process.env.PORT || 8000;

DBConnection(); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

