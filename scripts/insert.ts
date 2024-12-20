import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Inserting database");

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
      {id: 1, title: "Array dan String", imageSrc: "/bahasa_pemrograman.svg"},
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
        lessonId: 1,
        type: "SELECT",
        order: 1,
        descriptions:[null, "Pada contoh kode di atas, kita menggunakan perintah cout secara berulang untuk mencetak semua isi array (line 16 sampai 20). Berikut lebih jelasnya.", "Kalau isi array-nya ada ribuan, apa kamu akan sanggup menulis ini berulang-ulang? Tentu saja tidak! Karena itu, kita bisa memanfaatkan perulangan untuk mencetaknya.","Hal ini jauh lebih sederhana dibandingkan harus menulis satu persatu. Berikut ini outputnya:", "Kalau kamu lupa dengan perulangan, maka berikut ini adalah format dasar struktur perulangan for:"],
        imageSrcs:["/array_materi_10.png", "", "/array_materi_3.png"],
        question: `Saat mencetak isi array dengan perulangan, i < 5 dari program di atas merupakan...`,
      },
      // {
      //   id: 2,
      //   lessonId: 1,
      //   type: "SELECT",
      //   order: 2,
      //   description1: 'Apa itu Array? Bahasa pemrograman memiliki suatu alat untuk menyimpan himpunan data ke dalam satu nama variabel yang diberikan indeks. Salah satunya disebut sebagai larik atau array. Salah satu contoh di dunia nyata yang mempresentasikan Array adalah Loker.',
      //   description2: `Ketika kalian menyimpan barang di loker, kalian akan mengingat nomor loker tersebut. Kalian juga dapat menyimpan barang di loker dengan nomor yang berbeda. Pada analogi tersebut, nomor pada loker adalah indeks yang kita gunakan untuk mengenali tempat kita menyimpan barang kita tadi. Membuat array mirip dengan membuat variabel tunggal. Perbedaannya adalah kalian perlu memberikan informasi ukuran dari array yang akan dibuat dan kalian perlu mengaksesnya dengan menggunakan indeks.`,
      //   imageSrc1: '/loker.png',
      //   question: 'Manakah di bawah ini yang merupakan cara mendefinisikan array?',
      // },
      // {
      //   id: 3,
      //   lessonId: 1, 
      //   type: "ASSIST",
      //   order: 3,
      //   question: 'Array merupakan tipe data yang hanya menyimpan satu data.',
      // },
      // {
      //   id: 4,
      //   lessonId: 1,
      //   type: "SELECT",
      //   order: 4,
      //   description1: 'Dalam membuat Array, kita perlu memerhatikan hal tertentu. Elemen atau isi dari array itu sendiri harus satu jenis tipe data, misalkan terdiri dari kumpulan angka bulat saja (integer), kumpulan karakter saja (char), maupun kumpulan angka pecahan saja (double). Di dalam bahasa C++, kita tidak bisa membuat 1 array dengan berbagai tipe data (harus 1 jenis saja).',
      //   description2: `Sebagai contoh, misalkan saya ingin menyimpan 5 buah nilai siswa. Tanpa array, maka harus menyiapkan 5 buah variabel:`,
      //   description3: `Jika menggunakan array, pendefinisian variabel cukup seperti ini:`,
      //   imageSrc2: '/array_materi_1.png',
      //   imageSrc3: '/array_materi_2.png',
      //   question: 'Jika kita ingin membuat array dengan 1000 nilai, maka manakah yang benar?',
      // },
      // {
      //   id: 5,
      //   lessonId: 2,
      //   type: "SELECT",
      //   order: 5,
      //   description1: 'Berikutnya, bagaimana cara mengakses dan mengisi element array? Kita tinggal menuliskan nomor urut dari element yang akan akan diakses, nomor urut ini dikenal juga dengan istilah index. Berikut contohnya:',
      //   description2: `Perintah ini artinya kita sedang mengisi angka 80 ke index 4 dari array nilai.`,
      //   description3: `Yang harus perlu diperhatikan adalah, nomor urut atau index array dimulai dari 0, bukan 1. Akibatnya jika kita ingin mengakses element pertama dari array bilangan, penulisannya adalah bilangan[0]. Untuk bisa mengakses element ke-100 dari array bilangan, penulisannya adalah bilangan[99].`,
      //   description4: `Sebagai contoh pertama, kita ingin membuat array nilai dengan 5 element bertipe integer, lalu mengisi dan menampilkan nilainya menggunakan perintah cout:`,
      //   description5: `Di awal kode program, baris int nilai[5] dipakai untuk membuat sebuah array bernama nilai dengan 5 element atau 5 anggota. Array nilai ini di set sebagai int, yang artinya setiap element array hanya bisa diisi dengan bilangan bulat (integer). Setelah pendefinisian array nilai, selanjutnya kita mengisi setiap element array. Diingat kembali bahwa index array dimulai dari 0, sehingga untuk mengakses element pertama dari array nilai, penulisannya adalah nilai[0]. Serta untuk element kelima diakses dari nilai[4]. Lalu, di akhir program kita menampilkan seluruh elemen array nilai menggunakan cout.`,
      //   imageSrc1: '/array_materi_4.png',
      //   imageSrc4: '/array_materi_5.png',
      //   question: 'Manakah di bawah ini yang merupakan output dri kode tersebut?',
      // },
      // {
      //   id: 6,
      //   lessonId: 2, 
      //   type: "ASSIST",
      //   order: 6,
      //   question: 'Diberikan array char karakter[5]. Jika kita ingin mengakses elemen ke-3, maka kita memanggil karakter[2].',
      // },
      // {
      //   id: 7,
      //   lessonId: 2,
      //   type: "SELECT",
      //   order: 7,
      //   imageSrc1: "/array_materi_6.png",
      //   question: `Apakah output yang dihasilkan dari program di atas?`,
      // },
      // {
      //   id: 8,
      //   lessonId: 2,
      //   type: "SELECT",
      //   order: 8,
      //   description1: 'Dalam contoh sebelumnya, pengisian nilai array diproses satu persatu. Namun kita juga bisa mengisi element array langsung pada saat pendefinisian seperti contoh berikut:',
      //   description2: `Dalam kode di atas, tipe data array yang digunakan adalah char. Lalu semua isi array diinput sekaligus pada saat pembuatan, yakni dengan perintah:`,
      //   description3: `Tanda koma dipakai sebagai pemisah antara satu nilai dengan nilai lain.`,
      //   imageSrc1: '/array_materi_6.png',
      //   imageSrc2: '/array_materi_7.png',
      //   question: 'Jika kita ingin mengganti elemen ke-4 dari array huruf dengan karakter z, maka cara yang benar adalah...',
      // },
      // {
      //   id: 9,
      //   lessonId: 2,
      //   type: "SELECT",
      //   order: 9,
      //   description1: 'Kita juga bisa mendefinisikan array tanpa harus menulis jumlah elemen anggotanya.',
      //   description2: `Disini kita tidak menginput angka apapun sebagai penentu jumlah element. Jumlah element akan digenerate secara otomatis dari banyaknya nilai yang diinput ke dalam array tersebut. Dalam contoh ini terdapat 5 nilai sehingga array karakter akan berisi 5 element.`,
      //   description3: `Pembuatan array seperti ini hanya bisa dilakukan jika nilai untuk element array langsung ditulis pada saat pendefinisian. Kita tidak bisa memakai cara diatas jika element array diisi secara terpisah seperti contoh kode program pertama dalam tutorial ini.`,
      //   imageSrc1: '/array_materi_8.png',
      //   imageSrc3: '/array_materi_9.png',
      //   question: 'Apakah kode di atas dapat berhasil dieksekusi atau error?',
      // },  
    ]);
    
    /* Pilihan Ganda Unit 1 Lesson 1*/
    await db
    .insert(schema.challengeOptions)
    .values([
      
      {
        challengeId: 1,
        correct: false,
        text: "Start",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: true,
        text: "Condition",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: true,
        text: "Increment",
        audioSrc: "/bling.mp3",
      },
      // // Jawaban No. 2
      // {
      //   challengeId: 2,
      //   correct: true,
      //   text: "1",
      //   imageSrc:"/array_answer_1.png",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 2,
      //   correct: false,
      //   text: "2",
      //   imageSrc:"/array_answer_2.png",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 3
      // {
      //   challengeId: 3,
      //   correct: false,
      //   text: "True",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 3,
      //   correct: true,
      //   text: "False",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 4
      // {
      //   challengeId: 4,
      //   correct: true,
      //   text: "1",
      //   imageSrc:"/array_answer_3.png",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 4,
      //   correct: false,
      //   imageSrc:"/array_answer_4.png",
      //   text: "2",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 5
      // {
      //   challengeId: 5,
      //   correct: true,
      //   text: "1",
      //   imageSrc:"/array_answer_5.png",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 5,
      //   correct: false,
      //   imageSrc:"/array_answer_6.png",
      //   text: "2",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 6
      // {
      //   challengeId: 6,
      //   correct: true,
      //   text: "True",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 6,
      //   correct: false,
      //   text: "False",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 7
      // {
      //   challengeId: 7,
      //   correct: true,
      //   text: "Huruf: c",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 7,
      //   correct: false,
      //   text: "Huruf: b",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 7,
      //   correct: true,
      //   text: "c",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 7,
      //   correct: false,
      //   text: "b",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 8
      // {
      //   challengeId: 8,
      //   correct: false,
      //   text: "huruf[4] = z;",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 8,
      //   correct: true,
      //   text: "huruf[3] = z;",
      //   audioSrc: "/bling.mp3",
      // },
      // // Jawaban No. 9
      // {
      //   challengeId: 9,
      //   correct: false,
      //   text: "Berhasil",
      //   audioSrc: "/bling.mp3",
      // },
      // {
      //   challengeId: 9,
      //   correct: true,
      //   text: "Error",
      //   audioSrc: "/bling.mp3",
      // },
    ]);

    console.log("Inserting finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert the database");
  }
};

main();