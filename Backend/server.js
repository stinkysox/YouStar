import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/login", (req, res) => {
  res.json({ message: "welcome to login side" });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
