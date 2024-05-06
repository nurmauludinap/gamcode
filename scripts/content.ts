import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Computational Thinking", imageSrc: "/ct.svg" },
        { title: "Algoritma", imageSrc: "/algoritma.svg" },
        { title: "Bahasa Pemrograman", imageSrc: "/bahasa_pemrograman.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Bagian 1",
            description: `Dasar ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Bagian 2",
            description: `Tahapan dan Contoh ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Definisi", order: 1 },
            { unitId: unit.id, title: "Dekomposisi", order: 2 },
            { unitId: unit.id, title: "Pengenalan Pola", order: 3 },
            { unitId: unit.id, title: "Abstraksi", order: 4 },
            // { unitId: unit.id, title: "Algoritma", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Komputasi memiliki makna?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang bukan merupakan tujuan dari Computational Thinking dalam melatih otak adalah...',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Bahasa Indonesia dari Computational Thinking adalah...',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Komputasi memiliki makna?',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Yang bukan merupakan tujuan dari Computational Thinking dalam melatih otak adalah...',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Bahasa Indonesia dari Computational Thinking adalah...',
                order: 6,
              },
              // {
              //   lessonId: lesson.id,
              //   type: "ASSIST",
              //   question: '"the man"',
              //   order: 4,
              // },
              // {
              //   lessonId: lesson.id,
              //   type: "SELECT",
              //   question: 'Which one of these is "the zombie"?',
              //   order: 5,
              // },
              // {
              //   lessonId: lesson.id,
              //   type: "SELECT",
              //   question: 'Which one of these is "the robot"?',
              //   order: 6,
              // },
              // {
              //   lessonId: lesson.id,
              //   type: "SELECT",
              //   question: 'Which one of these is "the girl"?',
              //   order: 7,
              // },
              // {
              //   lessonId: lesson.id,
              //   type: "ASSIST",
              //   question: '"the zombie"',
              //   order: 8,
              // },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Media Online",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Pemecahan Masalah",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Penimbun Masalah",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Internet Sistem",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Logis",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Terstruktur",
                  audioSrc: "/bling.mp",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Melatih untuk bisa berpikir secara Kaku dan Manja",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Kreatif",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Berpikir komputasi",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Komputer jaringan",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "CCTV",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Perumitan Masalah",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Media Online",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Pemecahan Masalah",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Penimbun Masalah",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Internet Sistem",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Logis",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Terstruktur",
                  audioSrc: "/bling.mp",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Melatih untuk bisa berpikir secara Kaku dan Manja",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Melatih untuk bisa berpikir secara Kreatif",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "Berpikir komputasi",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Komputer jaringan",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "CCTV",
                  audioSrc: "/bling.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "Perumitan Masalah",
                  audioSrc: "/bling.mp3",
                },
              ]);
            }; 
          };
        };
      };
    };
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();