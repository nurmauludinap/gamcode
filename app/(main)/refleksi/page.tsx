import { redirect } from "next/navigation";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";

import { getUserProgress } from "@/db/queries";
import { Quests } from "@/components/quests";

import List from "./list";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const RefleksiPage = async () => {
  const userProgressData = getUserProgress();
  
  const [
    userProgress,
  ] = await Promise.all([
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

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
            src="/learn.svg"
            alt="Refleksi"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Refleksi Peserta Didik
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Refleksi peserta didik bertujuan untuk mengetahui kelebihan dan kekurangan yang dialami oleh siswa selama pembelajaran berlangsung. Hal ini dijadikan sebagai acuan oleh guru untuk memperbaiki pembelajaran selanjutnya.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full"/>
          
        </div>
        <div className="w-full flex flex-col">
          <List/>
        </div>
      </FeedWrapper>
    </div>
   );
}

export default RefleksiPage;