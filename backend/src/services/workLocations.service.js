import {
  createWorkLocation,
  deleteWorkLocationById,
  getAllWorkLocations,
  getWorkLocationsByUser,
  updateWorkLocationById,
} from "../repositories/workLocations.repo.js";

const VALID_LOCATIONS = ["WFO", "WFH", "LEAVE", "HOLIDAY"];

export async function listWorkLocations(user) {
  if (!user || !user.id || !user.role) {
    throw new Error("Invalid user context");
  }

  if (user.role === "MANAGER") {
    return getAllWorkLocations();
  }

  return getWorkLocationsByUser(user.id);
}

export async function addWorkLocation(userId, workDate, location) {
  if (!userId) throw new Error("userId is required");
  if (!workDate || !location)
    throw new Error("workDate and location are required");

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return createWorkLocation(userId, workDate, location);
}

export async function editWorkLocation(userId, id, location) {
  if (!userId) throw new Error("userId is required");
  if (!id) throw new Error("id is required");

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return updateWorkLocationById(userId, id, location);
}

export async function removeWorkLocation(userId, id) {
  if (!userId) throw new Error("userId is required");
  if (!id) throw new Error("id is required");

  return deleteWorkLocationById(userId, id);
}
