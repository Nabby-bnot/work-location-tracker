import "dotenv/config";

import cors from "cors";
import express from "express";
import analyticsRoutes from "./routes/analytics.routes.js";
import authRoutes from "./routes/auth.routes.js";
import meRoutes from "./routes/me.routes.js";
import workLocationRoutes from "./routes/workLocations.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use(
  "/api/work-locations",
  (req, res, next) => {
    next();
  },
  workLocationRoutes,
);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/me", meRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
