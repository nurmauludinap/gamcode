import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);


        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Computational Thinking",
                imageSrc: "/jp.svg",
            },
            {
                id: 2,
                title: "Algoritma",
                imageSrc: "/fr.svg",
            },
            {
                id: 3,
                title: "B. Pemrograman Prosedural",
                imageSrc: "/it.svg",
            },
            {
                id: 4,
                title: "B. Pemrograman C",
                imageSrc: "/hr.svg",
            },
        ]);

        await db.insert(schema.units).values([
            {
               id: 1,
               courseId: 1, // Computational Thinking
               title: "Unit 1",
               description: "Mengenal Computational Thinking",
               order: 1,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Unit 1 (Mengenal Computational Thinking)
                order: 1,
                title: "Apa itu Computational Thinking?",
            },
            {
                id: 2,
                unitId: 1, // Unit 1 (Mengenal Computational Thinking)
                order: 2,
                title: "Contoh Computational Thinking",
            },
            {
                id: 3,
                unitId: 1, // Unit 1 (Mengenal Computational Thinking)
                order: 3,
                title: "Contoh Computational Thinking",
            },
            {
                id: 4,
                unitId: 1, // Unit 1 (Mengenal Computational Thinking)
                order: 4,
                title: "Contoh Computational Thinking",
            },
            {
                id: 5,
                unitId: 1, // Unit 1 (Mengenal Computational Thinking)
                order: 5,
                title: "Contoh Computational Thinking",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Apa itu Computational Thinking
                type: "SELECT",
                order: 1,
                question: 'Computational Thinking berasal dari kata?',
            },
            {
                id: 2,
                lessonId: 1, // Apa itu Computational Thinking
                type: "ASSIST",
                order: 2,
                question: 'Abstraksi',
            },
            {
                id: 3,
                lessonId: 1, // Apa itu Computational Thinking
                type: "SELECT",
                order: 3,
                question: 'Berikut ini yang bukan merupakan tahapan CT adalah?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "Compute dan Think",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "Computer dan Goals",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "Logic dan Think",
                audioSrc: "/bling.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2, // Abstraksi
                correct: true,
                text: "Compute dan Think",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Computer dan Goals",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Logic dan Think",
                audioSrc: "/bling.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "Abstraksi",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: false,
                text: "Dekomposisi",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/robot.svg",
                correct: false,
                text: "Pengenalan Pola",
                audioSrc: "/bling.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: true,
                text: "Determinasi",
                audioSrc: "/bling.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2, // Apa itu Computational Thinking
                type: "SELECT",
                order: 1,
                question: 'Computational Thinking berasal dari kata?',
            },
            {
                id: 5,
                lessonId: 2, // Apa itu Computational Thinking
                type: "ASSIST",
                order: 2,
                question: 'Abstraksi',
            },
            {
                id: 6,
                lessonId: 2, // Apa itu Computational Thinking
                type: "SELECT",
                order: 3,
                question: 'Berikut ini yang bukan merupakan tahapan CT adalah?',
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
        
    }
};

main();