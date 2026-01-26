import { getUserById } from "../repositories/users.repo.js";

export async function getMe(user) {
  if (!user?.id) {
    throw new Error("Invalid user context");
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    throw new Error("User not found");
  }

  return dbUser;
}
