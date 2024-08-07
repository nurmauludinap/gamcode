import { 
    getCourseProgress,
    getLessonPercentage,
    getUnits, 
    getUserProgress 
} from "@/db/queries";
import { lessons, units as unitsSchema } from "@/db/schema";

import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

import { Header } from "./header";
import { Unit } from "./unit";
import { Quests } from "@/components/quests";
import { startTransition } from "react";
import { userLevel } from "@/actions/user-progress";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();

    const [
        userProgress,
        courseProgress,
        lessonPercentage,
        units,
    ] = await Promise.all([
        userProgressData,
        courseProgressData,
        lessonPercentageData,
        unitsData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    startTransition(() => {
        userLevel();
    });

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
                <Quests
                    points={userProgress.points}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                                unit: typeof unitsSchema.$inferSelect
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};
 
export default LearnPage;