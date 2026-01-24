import {
  addWorkLocation,
  editWorkLocation,
  listWorkLocations,
  removeWorkLocation,
} from "../services/workLocations.service.js";

export async function getWorkLocations(req, res) {
  try {
    const data = await listWorkLocations();
    res.json(data);
  } catch (err) {
    console.error("GET /work-locations failed:", err);
    res.status(500).json({ error: "Failed to fetch work locations" });
  }
}

export async function createWorkLocation(req, res) {
  try {
    const { workDate, location } = req.body;
    const record = await addWorkLocation(workDate, location);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateWorkLocation(req, res) {
  try {
    const { id } = req.params;
    const { workDate, location } = req.body;

    const record = await editWorkLocation(id, workDate, location);
    if (!record) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteWorkLocation(req, res) {
  const { id } = req.params;
  const deleted = await removeWorkLocation(id);

  if (!deleted) {
    return res.status(404).json({ error: "Not found" });
  }

  res.status(204).send();
}
