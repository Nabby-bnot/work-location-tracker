import { getMe } from "../services/me.service.js";

/**
 * GET /api/me
 */
export async function me(req, res) {
  try {
    const data = await getMe(req.user);
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
