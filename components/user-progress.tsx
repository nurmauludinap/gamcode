import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";
import { POINTS_PER_LEVEL } from "@/constants";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    level: number;
};

export const UserProgress = ({ 
    activeCourse, 
    points, 
    hearts,
    hasActiveSubscription,
    level, 
}: Props) => {
    const calculatedLevel = Math.floor(points / POINTS_PER_LEVEL);
    
    if (calculatedLevel === 1) {
        level = 1;
    }

    if (calculatedLevel > level) {
        level = calculatedLevel;
    } 

    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
           <Link href="/courses">
            <Button variant="ghost">
                <Image
                src={activeCourse.imageSrc}
                alt={activeCourse.title}
                className="rounded-md"
                width={32}
                height={32}
                />
            </Button>
           </Link>
           <Link href="/shop">
                <Button variant="ghost" className="text-blue">
                    <Image 
                    src="/points.svg"
                    height={28}
                    width={28}
                    alt="Points"
                    className="mr-2"
                    />
                    {points}
                </Button>
           </Link>
           <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image 
                    src="/heart.svg"
                    height={28}
                    width={28}
                    alt="Hearts"
                    className="mr-2"
                    />
                    {hasActiveSubscription ? <InfinityIcon className="h-4 w-4"/> : hearts}
                </Button>
           </Link>
           <Button variant="ghost" className="text-yellow-500">
                <Image 
                src="/level.png"
                height={28}
                width={28}
                alt="Level"
                className="mr-2"
                 />
                 Level {level}
            </Button>
        </div>
    );
};