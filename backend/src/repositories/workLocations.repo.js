import pool from "../db/index.js";

export async function getAllWorkLocations() {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM work_locations
    ORDER BY work_date DESC
    `,
  );
  return rows;
}

export async function getWorkLocationsByUser(userId) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM work_locations
    WHERE user_id = $1
    ORDER BY work_date DESC
    `,
    [userId],
  );
  return rows;
}

export async function createWorkLocation(userId, workDate, location) {
  const { rows } = await pool.query(
    `
    INSERT INTO work_locations (user_id, work_date, location)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, workDate, location],
  );
  return rows[0];
}

export async function updateWorkLocationById(userId, id, location) {
  const { rows } = await pool.query(
    `
    UPDATE work_locations
    SET location = $3,
        updated_at = NOW()
    WHERE id = $1
      AND user_id = $2
    RETURNING *
    `,
    [id, userId, location],
  );
  return rows[0];
}

export async function deleteWorkLocationById(userId, id) {
  const result = await pool.query(
    `
    DELETE FROM work_locations
    WHERE id = $1
      AND user_id = $2
    `,
    [id, userId],
  );
  return result.rowCount > 0;
}
