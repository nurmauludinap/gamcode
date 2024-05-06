import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2g0g451Y4nWe26a0yDY2ZybFPXI",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}