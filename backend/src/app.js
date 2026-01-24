import cors from "cors";
import express from "express";
import workLocationRoutes from "./routes/workLocations.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(
  "/api/work-locations",
  (req, res, next) => {
    next();
  },
  workLocationRoutes,
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
