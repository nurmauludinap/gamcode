import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2g0g451Y4nWe26a0yDY2ZybFPXI", // Dina Clarity 
  "user_2lpXwK7raKRcH44ZXAhFH6KJnbF", // gamcode_admin1
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}