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


    const courses = await db
    .insert(schema.courses)
    .values([
      {id: 1, title: "Array dan String", imageSrc: "/algoritma.svg"},
    ]);

    const units = await db
    .insert(schema.units)
    .values([
      {
        id: 1,
        courseId: 1,
        title: "Bagian 1",
        description: "Konsep Dasar Array",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Bagian 2",
        description: "Penggunaan Array dalam Program",
        order: 2,
      },
      {
        id: 3,
        courseId: 1,
        title: "Bagian 3",
        description: "Konsep Dasar Karakter dan String",
        order: 3,
      },
      {
        id: 4,
        courseId: 1,
        title: "Bagian 4",
        description: "Penggunaan Karakter dan String dalam Program",
        order: 4,
      },
    ]);

    const lessons = await db
    .insert(schema.lessons)
    .values([
      // Lesson untuk Unit 1 (3 bintang)
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Konsep Dasar Array",
      },
      {
        id: 2,
        unitId: 1, 
        order: 2,
        title: "Array 1 dimensi",
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "Array 2 dimensi",
      },
      
      // Lesson untuk Unit 2 (2 bintang)
      {
        id: 4,
        unitId: 2,
        order: 1,
        title: "Analisis Array",
      },
      {
        id: 5,
        unitId: 2, 
        order: 2,
        title: "Analisis Program Array",
      },
    ]);

    /* Soal untuk lesson 1 Unit 1 */
    const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        id: 1,
        lessonId: 1, // Apa itu Computational Thinking
        type: "SELECT",
        order: 1,
        question: 'Apa itu Array?',
      },
      {
        id: 2,
        lessonId: 1, // Apa itu Computational Thinking
        type: "SELECT",
        order: 2,
        question: 'Berikut ini yang bukan merupakan penggunaan Array alam kehidupan sehari-hari adalah..',
      },
      {
        id: 3,
        lessonId: 1, // Apa itu Computational Thinking
        type: "ASSIST",
        order: 3,
        question: 'Apakah gambar berikut merupakan Array?',
      },
    ]);
    
    /* Pilihan Ganda */
    // Pilihan No. 1
    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 1,
        correct: true,
        text: "Tipe data",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Variabel",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Konstanta",
        audioSrc: "/bling.mp3",
      },
    ]);

    // Pilihan No. 2
    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 2,
        correct: true,
        text: "Antrian bioskop",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Perpustakaan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Planet",
        audioSrc: "/bling.mp3",
      },
    ]);

    // Pilihan No. 3
    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 3,
        imageSrc: "/man.svg",
        correct: false,
        text: "Benar",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: true,
        text: "Tidak",
        audioSrc: "/bling.mp3",
      },
    ]);

    /* Soal untuk lesson 2 unit 1 */
    await db.insert(schema.challenges).values([
        {
          id: 4,
          lessonId: 2, // Apa itu Computational Thinking
          type: "SELECT",
          order: 2,
          question: 'Array dalam programBahasa pemrograman memiliki suatu alat untuk menyimpan himpunan data ke dalam satu nama variabel yang diberikan indeks. Salah satunya disebut sebagai larik atau array. Pada praktiknya, program digunakan untuk mengolah data yang berukuran besar dan membutuhkan waktu yang sangat lama jika dikerjakan manual oleh manusia. Misalnya kita perlu menghitung statistika deskriptif (seperti rata rata, nilai minimal, nilai maksimal, standar deviasi, dan sebagainya) dari data seluruh penduduk Indonesia. Walaupun masalahnya sederhana, namun dikarenakan jumlah data yang diolah sangat banyak dan berukuran besar mengakibatkan waktu pengerjaan pun menjadi sangat lama bagi manusia untuk menyelesaikannya. Bahkan ada kemungkinan data berukuran besar tersebut tidak dapat diolah menggunakan aplikasi pengolah data (spreadsheet) yang tidak dirancang untuk mengolah data sebesar itu. Untuk solusinya kalian dapat menggunakan program khusus untuk mengolah data berukuran besar atau membuat program sendiri yang mampu menyimpan dan mengolah data berukuran besar. Kita pun sampai pada pertanyaan besar: “bagaimana caranya membuat program yang mampu menyimpan dan mengolah data berukuran besar?”.',
        },
        {
          id: 5,
          lessonId: 2, // Apa itu Computational Thinking
          type: "ASSIST",
          order: 3,
          question: 'Abstraksi',
        },
        {
          id: 6,
          lessonId: 2, // Apa itu Computational Thinking
          type: "SELECT",
          order: 1,
          question: 'Array dalam programBahasa pemrograman memiliki suatu alat untuk menyimpan himpunan data ke dalam satu nama variabel yang diberikan indeks. Salah satunya disebut sebagai larik atau array.',
        },
    ]);

    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 5,
        correct: true,
        text: "Antrian bioskop",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Perpustakaan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: true,
        text: "Planet",
        audioSrc: "/bling.mp3",
      },
    ]);

    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 4,
        correct: true,
        text: "Lanjut",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Tidak",
        audioSrc: "/bling.mp3",
      },
    ]);

    await db
    .insert(schema.challengeOptions)
    .values([
      {
        challengeId: 6,
        correct: true,
        text: "Antrian bioskop",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Perpustakaan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: true,
        text: "Planet",
        audioSrc: "/bling.mp3",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();