import {
  getAllAnalytics,
  getUserAnalytics,
} from "../repositories/analytics.repo.js";

const ALL_STATUSES = ["WFO", "WFH", "LEAVE", "HOLIDAY"];

function normalize(rows) {
  const result = {};

  // initialize all statuses to 0
  for (const status of ALL_STATUSES) {
    result[status] = 0;
  }

  // fill actual counts
  for (const row of rows) {
    result[row.location] = row.count;
  }

  return result;
}

/**
 * Analytics for logged-in user
 */
export async function getMyAnalytics(user) {
  if (!user?.id) {
    throw new Error("Invalid user context");
  }

  const rows = await getUserAnalytics(user.id);
  return normalize(rows);
}

/**
 * Analytics for all users (manager only)
 */
export async function getGlobalAnalytics(user) {
  if (!user?.role) {
    throw new Error("Invalid user context");
  }

  if (user.role !== "MANAGER") {
    throw new Error("Forbidden");
  }

  const rows = await getAllAnalytics();
  return normalize(rows);
}
