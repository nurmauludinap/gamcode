import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
}

export const Card = ({ 
    title, 
    id, 
    imageSrc, 
    onClick, 
}: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 m-6 min-h-[217px] min-w-[200px]"
            )}
        >    
            <div className="min-[24px] w-full flex items-center justify-end">
            </div>
            <Image
                src={imageSrc}
                alt={title}
                height={100}
                width={150}
                className="rounded-lg drop-shadow-md object-cover"
            />
            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
            </p>
        </div>
    );
};