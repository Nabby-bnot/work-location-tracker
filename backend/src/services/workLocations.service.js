import {
  createWorkLocation,
  deleteWorkLocation,
  getAllWorkLocations,
  updateWorkLocation,
} from "../repositories/workLocations.repo.js";

const VALID_LOCATIONS = ["WFO", "WFH"];

export async function listWorkLocations() {
  return getAllWorkLocations();
}

export async function addWorkLocation(workDate, location) {
  if (!workDate || !location) {
    throw new Error("workDate and location are required");
  }

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return createWorkLocation(workDate, location);
}

export async function editWorkLocation(id, workDate, location) {
  if (!id) {
    throw new Error("id is required");
  }

  if (!VALID_LOCATIONS.includes(location)) {
    throw new Error("Invalid location value");
  }

  return updateWorkLocation(id, workDate, location);
}

export async function removeWorkLocation(id) {
  if (!id) {
    throw new Error("id is required");
  }

  return deleteWorkLocation(id);
}
