import pool from "../db/index.js";

export async function getAllWorkLocations() {
  const { rows } = await pool.query(
    `SELECT * FROM work_locations ORDER BY work_date DESC`,
  );
  return rows;
}

export async function createWorkLocation(workDate, location) {
  const { rows } = await pool.query(
    `
    INSERT INTO work_locations (work_date, location)
    VALUES ($1, $2)
    RETURNING *
    `,
    [workDate, location],
  );
  return rows[0];
}

export async function updateWorkLocation(id, workDate, location) {
  const { rows } = await pool.query(
    `
    UPDATE work_locations
    SET work_date = $2,
        location = $3,
        updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [id, workDate, location],
  );
  return rows[0];
}

export async function deleteWorkLocation(id) {
  const result = await pool.query(`DELETE FROM work_locations WHERE id = $1`, [
    id,
  ]);
  return result.rowCount;
}
