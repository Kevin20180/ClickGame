import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CLIENT_PUBLIC_DIR = path.resolve(__dirname, "../client/public");
const DEFAULT_PUBLIC_FILES_PATH = {
    "index.html": path.resolve(CLIENT_PUBLIC_DIR, "./index.html")
}

const app = express();

app.all("/*", (req, res, next) => {
    console.log(`Requisição HTTP ${req.method} em ${req.url}`);
    next();
})

app.use(express.static(CLIENT_PUBLIC_DIR));

app.get("/", (req, res) => {
    res.sendFile(DEFAULT_PUBLIC_FILES_PATH["index.html"]);
})

app.get("/*", (req, res) => {
    res.status(404).end("Error 404 Not Found.");
})

app.listen(8080, () => {
    console.log("Servidor escutando em", 8080);
})