import express from "express";
import router from "./routes/routes.js"; 
import cors from "cors";
import DBConnection from "./database/db.js";

const app = express();

// honor X-Forwarded-* headers when behind a proxy/CDN (Render)
app.set('trust proxy', true);

app.use(cors());
app.use("/", router);

const PORT = 8000;

DBConnection(); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

