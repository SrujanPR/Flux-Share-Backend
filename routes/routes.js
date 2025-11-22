import express from "express";
import { uploadImage, downloadImage } from "../controller/image-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

// Root page (for Render landing)
router.get('/', (req, res) => {
  res
    .status(200)
    .send('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Flux Share API</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:24px;background:#0b1220;color:#e5e7eb} code{background:#111827;padding:2px 6px;border-radius:6px}</style></head><body><h1>Flux Share API</h1><p>Status: OK</p><p>Endpoints:</p><ul><li><code>POST /upload</code></li><li><code>GET /file/:fileId</code></li><li><code>GET /health</code></li></ul></body></html>');
});

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.post("/upload", upload.single('file'), uploadImage);
router.get("/file/:fileId", downloadImage);

export default router;
