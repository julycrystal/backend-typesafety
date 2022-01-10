import { prisma } from "../../prisma";

export const getTweetForUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: userId,
    },
    select: {
      content: true,
      dislikes: true,
      date: true,
    },
  });

  return tweets.map((tweet) => {
    return {
      ...tweet,
      date: tweet.date.toUTCString(),
      user,
    };
  });
};
