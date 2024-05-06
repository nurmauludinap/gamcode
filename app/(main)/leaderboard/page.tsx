import Image from "next/image";
import { redirect } from "next/navigation";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";

import { getTopTenUsers, getUserProgress } from "@/db/queries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Quests } from "@/components/quests";

const LeaderboardPage = async () => {
  const userProgressData = getUserProgress();
  const leaderboardData = getTopTenUsers();
  
  const [
    userProgress,
    leaderboard,
  ] = await Promise.all([
    userProgressData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const currentUserRank = leaderboard.findIndex(user => user.userId === userProgress.userId);

  return ( 
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
          level={userProgress.level}
        />
        <Quests points={userProgress.points}/>
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Lihat posisi kamu di antara siswa lainnya.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full"/>
          {leaderboard.map((userProgress, index
          ) => (
            <div 
            key={userProgress.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-peach relative">
                <span className="rounded-full bg-peach text-white w-8 h-8 flex items-center justify-center mr-2">
                  {index + 1}
                </span>
              </p>
              <Avatar
                className="border bg-darkenBlue h-12 w-12 ml-3 mr-5"
              >
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">
                {userProgress.points} XP
              </p>
            </div>
          ))}
          <Separator className="mt-4 mb-4 h-0.5 rounded-full"/>
          <p className="text-muted-foreground text-center text-lg mt-2 mb-1">
            Posisi kamu
          </p>
          <div 
            key={userProgress.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
            >
              <p className="font-bold text-peach relative">
                <span className="rounded-full bg-peach text-white w-8 h-8 flex items-center justify-center mr-2">
                {currentUserRank + 1}
                </span>
              </p>
              <Avatar
                className="border bg-darkenBlue h-12 w-12 ml-3 mr-5"
              >
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">
                {userProgress.points} XP
              </p>
            </div>
        </div>
      </FeedWrapper>
    </div>
   );
}
 
export default LeaderboardPage;