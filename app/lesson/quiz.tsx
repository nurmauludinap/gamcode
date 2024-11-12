"use client"

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Confetti from "react-confetti";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import React from "react"; 

type Props = {
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any; 
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const { width, height } = useWindowSize();

    const router = useRouter();

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [
        correctAudio,
        _c,
        correctControls,
    ] = useAudio({ src: "/correct.mp3" });
    const [
        incorrectAudio,
        _i,
        incorrectControls,
    ] = useAudio({ src: "/incorrect.wav" });
    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [selectedOption, setSelectedOption] = useState<number | number[]>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const currentChallenge = challenges[activeIndex];
    const options = currentChallenge?.challengeOptions ?? [];

    const onNext = () => {
        // setActiveIndex((current) => current + 1);
        // Update progress if no options are present
        if (!options.length) {
            startTransition(() => {
                upsertChallengeProgress(currentChallenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }
                        setPercentage((prev) => prev + 100 / challenges.length);
                        onNextChallenge();
                    })
                    .catch(() => toast.error("Something went wrong. Please try again."));
            });
        } else {
            onNextChallenge();
        }
    };

    const onNextChallenge = () => {
        setActiveIndex((current) => current + 1);
        setStatus("none");
        setSelectedOption(undefined);
    };

    const onSelect = (id: number | number[]) => {
        if (status !== "none") return;
        setSelectedOption(id);
    };

    const onContinue = () => {
        // if (!selectedOption || (Array.isArray(selectedOption) && selectedOption.length === 0)) return;

        if (!challengeOptions) {
            onNext();
            setStatus("none");
        }

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        // const correctOptionIds = options.filter((option) => option.correct).map((option) => option.id);

        // if (Array.isArray(selectedOption)) {
        // const isCorrect = selectedOption.every((id) => correctOptionIds.includes(id)) &&
        //     selectedOption.length === correctOptionIds.length;
        
        // if (isCorrect) {
        //     startTransition(() => {
        //     upsertChallengeProgress(currentChallenge.id)
        //         .then((response) => {
        //         if (response?.error === "hearts") {
        //             openHeartsModal();
        //             return;
        //         }
        //         correctControls.play();
        //         setStatus("correct");
        //         setPercentage((prev) => prev + 100 / challenges.length);

        //         if (initialPercentage === 100) {
        //             setHearts((prev) => Math.min(prev + 1, 5));
        //         }
        //         })
        //         .catch(() => toast.error("Something went wrong. Please try again."))
        //     });
        // } else {
        //     startTransition(() => {
        //     reduceHearts(currentChallenge.id)
        //         .then((response) => {
        //         if (response?.error === "hearts") {
        //             openHeartsModal();
        //             return;
        //         }
                
        //         incorrectControls.play();
        //         setStatus("wrong");

        //         if (!response?.error) {
        //             setHearts((prev) => Math.max(prev - 1, 0));
        //         }
        //         })
        //         .catch(() => toast.error("Something went wrong. Please try again."))
        //     });
        // }
        // } else {
        //     if (correctOptionIds.length === 1 && correctOptionIds[0] === selectedOption) {
        //         // Handle correct answer scenario
        //         startTransition(() => {
        //         upsertChallengeProgress(currentChallenge.id)
        //             .then((response) => {
        //             if (response?.error === "hearts") {
        //                 openHeartsModal();
        //                 return;
        //             }
        //             correctControls.play();
        //             setStatus("correct");
        //             setPercentage((prev) => prev + 100 / challenges.length);

        //             if (initialPercentage === 100) {
        //                 setHearts((prev) => Math.min(prev + 1, 5));
        //             }
        //             })
        //             .catch(() => toast.error("Something went wrong. Please try again."))
        //         });
        //     } else {
        //         // Handle wrong answer scenario
        //         startTransition(() => {
        //         reduceHearts(currentChallenge.id)
        //             .then((response) => {
        //             if (response?.error === "hearts") {
        //                 openHeartsModal();
        //                 return;
        //             }
                    
        //             incorrectControls.play();
        //             setStatus("wrong");

        //             if (!response?.error) {
        //                 setHearts((prev) => Math.max(prev - 1, 0));
        //             }
        //             })
        //             .catch(() => toast.error("Something went wrong. Please try again."))
        //         });
        //     }
        // }

        if (!selectedOption || (Array.isArray(selectedOption) && selectedOption.length === 0)) {
            onNext();
            return;
        }

        const correctOptionIds = options.filter((option) => option.correct).map((option) => option.id);

        if (Array.isArray(selectedOption)) {
            const isCorrect = selectedOption.every((id) => correctOptionIds.includes(id)) &&
                selectedOption.length === correctOptionIds.length;

            if (isCorrect) {
                handleCorrectAnswer();
            } else {
                handleWrongAnswer();
            }
        } else {
            if (correctOptionIds.length === 1 && correctOptionIds[0] === selectedOption) {
                handleCorrectAnswer();
            } else {
                handleWrongAnswer();
            }
        }
    };

    const handleCorrectAnswer = () => {
        startTransition(() => {
            upsertChallengeProgress(currentChallenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."));
        });
    };

    const handleWrongAnswer = () => {
        startTransition(() => {
            reduceHearts(currentChallenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    incorrectControls.play();
                    setStatus("wrong");

                    if (!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."));
        });
    };


    if (!currentChallenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br/> Kamu telah menyelesaikan materi ini.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={initialPercentage === 100 ? 0 : challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = currentChallenge.type === "ASSIST" 
    ? "Perhatikan pernyataan berikut ini. Pilih True jika benar, False jika salah."
    : currentChallenge.question;

    const descriptions = (currentChallenge.descriptions as string[]) ?? [];
    const imageSrcs = (currentChallenge.imageSrcs as string[]) ?? [];
    const links = (currentChallenge.links as string[]) ?? [];
    const codeSources = (currentChallenge.codeSources as string[]) ?? [];

    // Create a combined array with alternating items
    const combinedItems = [];
    const maxLength = Math.max(descriptions.length, imageSrcs.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < descriptions.length) {
            combinedItems.push({ type: 'description', content: descriptions[i] });
        }
        if (imageSrcs[i]) { // Check if the specific imageSrcs[i] is not null or undefined
            combinedItems.push({ type: 'image', content: imageSrcs[i] });
        }
        if (links[i]) { // Check if the specific imageSrcs[i] is not null or undefined
            combinedItems.push({ type: 'link', content: links[i] });
        }
        if (codeSources[i]) { // Check if the specific imageSrcs[i] is not null or undefined
            combinedItems.push({ type: 'code_source', content: codeSources[i] });
        }
    }

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
           />
           <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[800px] w-full px-6 lg:px-0 flex flex-col gap-y-4">
                        <h1 className="text-3xl mt-3 mb-1">
                            {currentChallenge.title}
                        </h1>
                        {combinedItems.map((item, index) => {
                            if (item.type === 'description') {
                                return (
                                    <h1 key={index} className="text-neutral-700 text-justify">
                                        {item.content}
                                    </h1>
                                );
                            } else if (item.type === 'image') {
                                return (
                                    <Image 
                                        key={index}
                                        src={item.content}
                                        alt={`Gambar ${index + 1}`}
                                        height={400}
                                        width={400}
                                        className="items-center"
                                    />
                                );
                            } else if (item.type === 'link') {    
                                return(
                                    <div 
                                    key={index} 
                                    style={{ position: 'relative', width: '100%', height: 0, paddingTop: '56.25%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}
                                >
                                    <iframe 
                                        loading="lazy" 
                                        style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                                        src={item.content} 
                                        allowFullScreen 
                                        allow="fullscreen"
                                    ></iframe>
                                </div>
                                )   
                            } else if (item.type === 'code_source') {    
                                return(
                                    <iframe
                                        key={index}
                                        height="300px"  
                                        src={item.content} 
                                        width="100%"
                                    ></iframe>
                                )   
                            }
                            return null;
                        })}
                        <h1 className="mt-8 text-justify font-medium">
                            {title}    
                        </h1>
                        <div>
                            {/* {currentChallenge.type === "ASSIST" && (
                                <QuestionBubble question={currentChallenge.question}/>
                            )} */}
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                                type={currentChallenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || (!selectedOption && options.length > 0)}
                status={!options.length ? "material" : status}
                onCheck={onContinue}
            />  
        </>
    );
}