import { redirect } from "next/navigation";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";

import { getUserProgress } from "@/db/queries";
import { Quests } from "@/components/quests";

import dynamic from "next/dynamic";
import List from "./list";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const Worksheet = dynamic(() => import("./[lkpdId]/live-worksheet"), { ssr: false });

const WorksheetPage = async () => {
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
            alt="LKPD"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Lembar Kerja Peserta Didik (LKPD)
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            LKPD merupakan lembar kerja dalam proses pembelajaran yang bertujuan mempercepat proses pencapaian materi. Berkumpul dan berdiskusilah bersama anggota kelompokmu dalam mengerjakan LKPD berikut pada setiap pertemuannya.
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

export default WorksheetPage;