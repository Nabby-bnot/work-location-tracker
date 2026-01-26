import pool from "../db/index.js";

/**
 * Analytics for a single user
 */
export async function getUserAnalytics(userId) {
  const { rows } = await pool.query(
    `
    SELECT location, COUNT(*)::int AS count
    FROM work_locations
    WHERE user_id = $1
    GROUP BY location
    `,
    [userId],
  );

  return rows;
}

/**
 * Analytics across all users (manager)
 */
export async function getAllAnalytics() {
  const { rows } = await pool.query(
    `
    SELECT location, COUNT(*)::int AS count
    FROM work_locations
    GROUP BY location
    `,
  );

  return rows;
}
