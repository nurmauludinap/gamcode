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
      {id: 1, title: "Percabangan", imageSrc: "/bahasa_pemrograman.svg"},
    ]);

    const units = await db
    .insert(schema.units)
    .values([
      {
        id: 1,
        courseId: 1,
        title: "Bagian 1",
        description: "Percabangan IF",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Bagian 2",
        description: "Percabangan IF - ELSE",
        order: 2,
      },
      {
        id: 3,
        courseId: 1,
        title: "Bagian 3",
        description: "Percabangan IF - ELSE IF",
        order: 3,
      },
      {
        id: 4,
        courseId: 1,
        title: "Bagian 4",
        description: "Percabangan Switch Case",
        order: 4,
      },
      {
        id: 5,
        courseId: 1,
        title: "Bagian 5",
        description: "Percabangan Bersarang (Nested IF)",
        order: 5,
      },
    ]);

    const lessons = await db
    .insert(schema.lessons)
    .values([
      // Lesson untuk Unit 1 (2 bintang)
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Percabangan IF",
      },
      {
        id: 2,
        unitId: 1, 
        order: 2,
        title: "Percabangan IF",
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "Latihan Percabangan IF",
      },
      
      // Lesson untuk Unit 2 (2 bintang)
      {
        id: 4,
        unitId: 2,
        order: 1,
        title: "Percabangan IF ELSE",
      },
      {
        id: 5,
        unitId: 2, 
        order: 2,
        title: "Percabangan IF ELSE",
      },
      
      // Lesson untuk Unit 3 (1 bintang) 
      {
        id: 6,
        unitId: 3, 
        order: 1,
        title: "Percabangan IF - ELSE IF",
      },

      // Lesson untuk Unit 4 (1 bintang)
      {
        id: 7,
        unitId: 4,
        order: 1,
        title: "Percabangan Switch Case",
      },

      // Lesson untuk Unit 5 (1 bintang)
      {
        id: 8,
        unitId: 5, 
        order: 1,
        title: "Percabangan Nested IF",
      },
    ]);

    /* Materi untuk Unit 1 - Percabangan IF */
    const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        title: "Percabangan",
        order: 1,
        descriptions: [
          "Mungkin kalian akan bertanya-tanya, apa itu percabangan dan kenapa dinamakan percabangan? Istilah ini sebenarnya digunakan untuk menggambarkan alur program yang bercabang. Pada flow chart, logika “jika…maka” digambarkan dalam bentuk cabang. Karena itulah disebut percabangan.",
          "Selain percabangan, struktur ini juga disebut: control flow, decision, struktur kondisi, Struktur if, dan sebagainya. Percabangan akan mampu membuat program berpikir dan menentukan tindakan sesuai dengan logika/kondisi yang kita berikan.",
          "Percabangan dalam pemrograman merupakan konsep dasar yang memungkinkan programmer untuk membuat jalur eksekusi yang berbeda berdasarkan kondisi tertentu. Teknik ini penting untuk mengelola software yang kompleks dan memastikan bahwa kode tersebut efisien dan mudah beradaptasi. Hampir setiap program yang kompleks mengandung suatu penyeleksian kondisi. Dengan menyeleksi suatu kondisi, program dapat menentukan tindakan apa yang harus dikerjakan, tergantung dari hasil kondisi yang diseleksi tersebut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1p484ytiCGTPRJKSkkh9eaup9K-P4SODE",
        ],
        question: `Apa fungsi utama dari konsep percabangan dalam pemrograman?`,
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        title: "Percabangan IF",
        order: 2,
        descriptions: [
          "Kamu bangun di pagi hari dan bersiap-siap untuk pergi ke sekolah. Saat kamu ke luar rumah, kamu melihat langit tampak mendung. Ada beberapa hal yang kamu lakukan terhadap pernyataan ini.",
          "1.	Kamu tahu jika langit mendung maka ada kemungkinan untuk turun hujan.",
          "2.	Karena ada kemungkinan turun hujan, maka kamu mencari payung untuk dibawa.",
          "Hal-hal di atas kamu lakukan karena kamu tahu bahwa langit tampak mendung. Kamu menganalisis (kemungkinan hujan) dan melakukan tindakan (membaya payung). Maka, jika langit tidak mendung, hal-hal/kondisi di atas akan kamu abaikan (kamu tidak akan menganalisis dan melakukan tindakan).",
        ],
        question: 'Kamu baru saja pulang dari sekolah. Sesampainya di rumah, kamu melihat pintu depan rumah tidak terkunci. Berdasarkan situasi tersebut, tindakan mana saja yang akan kamu lakukan? (2 jawaban)',
      },
      {
        id: 22,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Kasus-kasus yang dijelaskan sebelumnya dalam pemrograman dapat disebut sebagai percabangan IF. Apa itu percabangan IF?",
          "IF adalah sebuah struktur pemilihan yang digunakan untuk mengeksekusi sebuah kondisi. Dalam definisi sederhananya, IF berarti sebuah kondisi 'jika' sebuah kondisi bernilai benar, maka program 1 yang akan mengeksekusinya. Namun jika salah, kondisi akan diabaikan. Berikut ini adalah ilustrasinya menggunakan flowchart.",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1iJb8D10ql76YSNJFJIcy6ZuFjiRaBe9e",
          "https://drive.google.com/uc?export=view&id=1mns6Zl2DzwlhGec1tx9eb5FZDjIe3cBA",
        ],
        question: `Gambar di atas merupakan bentuk umum percabangan IF dalam pemrograman.`
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Contoh kode sederhana percabangan IF dalam bahasa pemrograman C++",
          "Kasus #1 – Langit mendung (menggunakan string).",
          "Kode programnya:",
          "Kode di atas merupakan sebuah program yang memeriksa kondisi cuaca dan memberikan saran berdasarkan kondisi tersebut (sesuai dengan kasus sebelumnya). Berikut adalah penjelasan singkatnya:",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
          "PENTING: Jika kamu menggunakan string sebagai kondisi ataupun nilai, maka antara kondisi dan nilai harus SAMA PERSIS, alias string di sini merupakan CASE SENSITIVE. Sederhananya, case sensitive adalah perlakukan sistem yang membedakan huruf besar dan huruf kecil sebagai dua karakter yang berbeda.",
          "Coba kamu ganti nilai variabel langit pada kode program di bawah ini menjadi “Mendung” dan RUN programnya. Apa yang terjadi?",
          "Kode program akan tetap bisa dijalankan dan tidak mengalami error namun program tidak menghasilkan keluaran/output apapun. Walaupun kata/string yang digunakan sama-sama “mendung” namun tetap berbeda karena variabel langit bernilai “Mendung” bukan “mendung”.",
          "Selanjutnya, analisis kode program di bawah ini.",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1260_qW3KI7a3xapz0592CuKafe62wRSG",
          "https://drive.google.com/uc?export=view&id=1VLStSEQaTYK3Astyjy4e_G7BmWiy8KOo",
          "",
          "https://drive.google.com/uc?export=view&id=1CuXKKkp0JFwpVJBQJrlBDqKO0SWpUUOZ",
          "",
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1qMOOIknyr9HmajDMTxSJLP2p42iXE32z",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQObQOUyg/zE4CnbfMhMRaljOE52In8g/view?embed",
        ],
        codeSources: [
          "",
          "",
          "",
          "",
          "",
          "",
          "https://onecompiler.com/embed/cpp/42rmsddff?theme=dark&hideLanguageSelection=true&hideNewFileOption=true&hideNew=true&disableAutoComplete=true&hideStdin=true",
        ],
        question: `Jika kamu mengganti kodenya menjadi seperti di atas dan kamu menjalankan programnya, maka apakah keluaran/output yang dihasilkan dari program tersebut?`,
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Selanjutnya, diberikan kode program seperti berikut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1Z_gzbWqvZqmmcfaAbVsFU41EOmjaIso-",
        ],
        question: 'Berdasarkan kode di atas, maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        title:"Menggunakan Percabangan IF dalam Perhitungan",
        descriptions: [
          "Selain untuk menentukan hal-hal dasar seperti pada contoh sebelumnya, kita juga bisa menggunakan percabangan IF dalam perhitungan. Contohnya adalah sebagai berikut.",
          "Kasus #2 – Membuat program untuk menentukan bilangan genap.",
          "Kode programnya:",
          "Kode di atas merupakan sebuah program yang menentukan apakah suatu bilangan adalah bilangan genap. Berikut adalah penjelasan singkatnya:",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
          "Mari kita coba untuk mengganti variabel kode program di atas menggunakan code editor di bawah ini.",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1RxkConh2LTD1TCnmyQlQPiyj-sqjEnN8",
          "https://drive.google.com/uc?export=view&id=12R-3yNZZdv-GSp4d13a1D2YuaLtxPgsN",
          "",
          "https://drive.google.com/uc?export=view&id=1HtwU4G2fsACxxgnEfLhb3JspQ9Xsam6V",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQOUxA8GQ/wxqENqfFTLbxjwNfMDKYnQ/view?embed",
        ],
        codeSources: [
          "",
          "",
          "",
          "",
          "",
          "https://onecompiler.com/embed/cpp/42rmsjjbh?theme=dark&hideLanguageSelection=true&hideNewFileOption=true&hideNew=true&disableAutoComplete=true&hideStdin=true",
        ],
        question: 'Coba kamu ganti nilai variabel angka dengan 7 dalam kode program tersebut lalu tekan tombol RUN. Apa keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 6,
        lessonId: 2, 
        type: "SELECT",
        order: 2,
        descriptions: [
          "Kasus #3 – Membuat program untuk menentukan bilangan ganjil dengan menerima masukan/input-an dari pengguna",
          "Kode programnya:",
          "Kode di atas merupakan sebuah program yang menerima masukan/input dari pengguna untuk menentukan apakah bilangan yang dimasukkan adalah ganjil. Berikut adalah penjelasan singkatnya:",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1BAqAVzuhFvysXDNfFuUgddHst0QG4Uxi",
          "https://drive.google.com/uc?export=view&id=1yFpzcZ62GJJ1a-Q0ajTDT4YkJtD5HIwW",
        ],
        links: [
          "",
          "",
          "https://www.canva.com/design/DAGQOXMV9uc/rABvFjBQeRTZdlGwyCGSNg/view?embed",
        ],
        question: 'Jika blok kode pada line 8 pada program di atas dihapus dan kamu memasukkan 7 sebagai input-annya, maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 7,
        lessonId: 2,
        type: "SELECT",
        title: "Percabangan Lebih dari 1 Kondisi",
        order: 3,
        descriptions: [
          "Ternyata dalam sebuah percabangan, kita bisa memasukkan/menggunakan lebih dari 1 kondisi, loh! Gimana sih caranya? Kita bisa menggunakan operator logika, loh! Jika kamu lupa apa saja operator logika, berikut ini penjelasan singkat terkait operator logika.",
          "Nah, biar kamu bisa mengerti, yuk lihat kode program berikut ini.",
          "Kasus #4 – Membuat program untuk menentukan kelulusan dengan dua kondisi menggunakan operator logika.",
          "Kode di atas merupakan sebuah program yang memeriksa dua kondisi untuk menentukan apakah seseorang lulus dan telah menyelesaikan tugas. Berikut adalah penjelasan singkatnya:",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1nf4mDL3VonDQtL9esAZJJwwixeS3LHIb",
          "",
          "https://drive.google.com/uc?export=view&id=1ozANgfQ1U_6_gInhHmDWGz1kv9yZYZ4-",
          "https://drive.google.com/uc?export=view&id=1OuBcI48WtLdJYS-MzMAqXuFuOStpqNg5",
        ],
        links: [
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQOY5d5Tw/2GEWPRVAVthPdd0LtUY2Kg/view?embed",
        ],
        question: 'Jika pada program di atas nilai boolean tugasSelesai pada line 6 diubah menjadi false dan operator logika && (AND) pada line 8 diubah menjadi operator logika II (OR), maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 8,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        descriptions: [
          "Selanjutnya, diberikan kode program seperti berikut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=13g4d2n9A3S1GU4yebWubmssKTlQNJ2x-",
        ],
        question: 'Berdasarkan kode di atas, apakah keluaran/output yang dihasilkan oleh program tersebut?',
      },
      {
        id: 9,
        lessonId: 3,
        type: "SELECT",
        order: 2,
        descriptions: [
          "Selanjutnya, diberikan kode program seperti berikut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=13g4d2n9A3S1GU4yebWubmssKTlQNJ2x-",
        ],
        question: 'Jika variabel nilai diisi dengan 75, maka apakah keluaran/output yang dihasilkan oleh program tersebut?',
      },
      {
        id: 10,
        lessonId: 3,
        type: "SELECT",
        order: 3,
        question: 'Suatu hari kamu sedang mengerjakan tugas yang diberikan oleh gurumu di laptop. Namun, laptopmu tiba-tiba mati karena baterai laptopmu habis padahal kamu sudah mencolokkan kabel charger. Berdasarkan situasi tersebut, tindakan mana saja yang akan kamu lakukan? (2 jawaban)',
      },
      {
        id: 11,
        lessonId: 3,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Diberikan sebuah kode program yang belum lengkap sebagai berikut.",
          "Program di atas bertujuan untuk mendeteksi umur yang dianggap dewasa. Seseorang dianggap dewasa jika ia berumur lebih dari 17 tahun.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1S9VFp-g1PUP3vAF2x_DX8AZU6GzOiORo",
        ],
        question: 'Kamu diminta untuk melengkapi kode di atas. Berikut ini jawaban yang tepat untuk mengisi blok kode line 9 adalah…',
      },
      {
        id: 12,
        lessonId: 3,
        type: "SELECT",
        order: 5,
        descriptions: [
          "Diberikan sebuah kode program yang belum lengkap sebagai berikut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1orWudoqanWlgZ-0st8u_l14rDmh5m_pV",
        ],
        question: 'Berdasarkan kode program di atas, kamu diminta untuk melengkapi kode tersebut. Berikut ini jawaban yang tepat untuk mengisi blok kode line 10 adalah…',
      },
      {
        id: 13,
        lessonId: 3,
        type: "SELECT",
        order: 6,
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1d3tveNc-V8LTYyY9tRYOqbFVP9TBHTym",
        ],
        question: 'Berdasarkan kode program di atas, kamu diminta untuk melengkapi kode tersebut. Berikut ini jawaban yang tepat untuk mengisi blok kode line 10 adalah…',
      },      
    ]);
    
    /* Pilihan Ganda Unit 1*/
    await db
    .insert(schema.challengeOptions)
    .values([
      // Jawaban No 1
      {
        challengeId: 1,
        correct: false,
        text: "Untuk menghentikan program secara paksa",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Untuk menjalankan program tanpa kondisi",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: true,
        text: "Untuk menentukan jalur eksekusi yang berbeda berdasarkan kondisi tertentu",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Untuk memperlambat eksekusi program",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Untuk menampilkan data tanpa proses logika",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 2
      {
        challengeId: 2,
        correct: false,
        text: "Mengamati bahwa pintu tidak terkunci",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Memeriksa apakah ada barang yang hilang di dalam rumah",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Menghubungi orang tua untuk memberitahu kondisi pintu",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Mencatat kejadian ini agar tidak lupa",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Mengabaikan dan masuk ke dalam rumah",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 3
      {
        challengeId: 3,
        correct: false,
        text: "membawa payung",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        correct: true,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 4
      {
        challengeId: 4,
        correct: true,
        text: "membalas pesan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 5
      {
        challengeId: 5,
        correct: false,
        text: "Bilangan tersebut genap",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: true,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 6
      {
        challengeId: 6,
        correct: true,
        text: "Bilangan tersebut ganjil",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 7
      {
        challengeId: 7,
        correct: true,
        text: "Anda lulus dan telah menyelesaikan tugas",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 8
      {
        challengeId: 8,
        correct: true,
        text: "Selamat! Anda lulus.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 9
      {
        challengeId: 9,
        correct: true,
        text: "Selamat! Anda lulus.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 10
      {
        challengeId: 10,
        correct: true,
        text: "Memeriksa apakah kabel charger terhubung dengan benar",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: false,
        text: "Menghubungi teman untuk meminjam charger laptop",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: true,
        text: "Memastikan kabel charger terhubung dengan baik dan mencoba menyalakan laptop kembali",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: false,
        text: "Meminjam laptop teman untuk melanjutkan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: false,
        text: "Membuat salinan presentasi di cloud sebagai cadangan",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 11
      {
        challengeId: 11,
        correct: false,
        text: "umur <= 17",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 11,
        correct: false,
        text: "umur >= 17",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 11,
        correct: false,
        text: "umur < 18",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 11,
        correct: true,
        text: "umur >= 18",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 11,
        correct: false,
        text: "umur == 18",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 12
      {
        challengeId: 12,
        correct: false,
        text: '“Angka tersebut merupakan kelipatan 2”',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 12,
        correct: false,
        text: '“Angka tersebut bukan merupakan kelipatan 2”',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 12,
        correct: true,
        text: '“Angka tersebut merupakan kelipatan 3”',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 12,
        correct: false,
        text: '“Angka tersebut bukan merupakan kelipatan 3”',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 12,
        correct: false,
        text: '“Angka tersebut memiliki sisa bagi 1"',
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 13
      {
        challengeId: 13,
        correct: false,
        text: "Anda mendapatkan diskon spesial.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 13,
        correct: true,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
    ]);


    /* Materi untuk Unit 2 - Percabangan IF ELSE */
    const challenges2 = await db
    .insert(schema.challenges)
    .values([
      {
        id: 14,
        lessonId: 4,
        type: "SELECT",
        title: "Percabangan IF ELSE",
        order: 1,
        descriptions: [
          "Kamu sedang berada di dapur dan merasa sedikit lapar. Kamu melihat ada dua pilihan makanan di depanmu: sebuah apel dan sepotong kue cokelat. Kamu memikirkan beberapa hal sebelum memilih apa yang akan kamu makan.",
          "1.	Kamu tahu bahwa jika kamu ingin makan makanan yang sehat, maka kamu akan memilih apel.",
          "2.	Jika kamu tidak ingin makan makanan yang sehat, maka kamu akan memilih kue cokelat.",
          "Kamu menganalisis (makanan sehat atau tidak) dan melakukan tindakan (memakan apel atau kue cokelat). Analisa terhadap makanan sehat atau tidak, dijadikan sebagai kondisi untuk menentukan apakah kamu memakan apel atau kue cokelat.",
          "Contoh lain pada kasus sebelumnya. Kamu bangun di pagi hari dan bersiap-siap untuk pergi ke sekolah. Kamu ke luar rumah dan mengecek kondisi langit. Ada beberapa hal yang kamu lakukan terhadap pernyataan ini.",
          "1.	Jika kamu melihat langit mendung, maka kamu akan membawa payung.",
          "2.	Jika kamu melihat langit tidak mendung, maka kamu tidak akan membawa payung.",
          "Kamu menganalisis (mendung atau tidak) dan melakukan tindakan (membaya payung atau tidak). Analisa terhadap langit mendung atau tidak, dijadikan sebagai kondisi untuk menentukan apakah kamu membawa payung atau tidak.",
          null,
          "Kamu sedang berada di ruang tamu dan memutuskan untuk menonton TV. Kamu melihat dua opsi tayangan: film atau berita. Kamu akan membuat keputusan berdasarkan waktu yang tersedia. Satu kondisi yang kamu tahu bahwa jika kamu memiliki banyak waktu (misalnya lebih dari satu jam), maka kamu akan menonton film.",
        ],
        question: `Berdasarkan situasi tersebut, tindakan mana saja yang akan kamu lakukan? (3 jawaban)`,
      },
      {
        id: 15,
        lessonId: 4,
        type: "SELECT",
        order: 2,
        descriptions: [
          "Kasus-kasus yang dijelaskan sebelumnya dalam pemrograman dapat disebut sebagai percabangan IF - Else. Apa itu percabangan IF - Else?",
          "If Else adalah menjalankan kondisi dengan 2 pernyataan yang berbeda. Jika pada IF sebelumnya hanya melakukan pernyataan jika kondisi benar namun akan diabaikan jika kondisi salah. Namun pada if else, kondisi salah tidak diabaikan tapi di berikan pernyataan juga. Berikut ini adalah ilustrasinya menggunakan flowchart.",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1hqB7_ivnzycFSeF2Wq3tfqCdzJyhwSad",
          "https://drive.google.com/uc?export=view&id=1ELWvOZDCLK1KT3CD27F7XWOINaMWhWRv",
        ],
        question: `Gambar di atas merupakan bentuk umum percabangan IF – Else dalam pemrograman.`
      },
      {
        id: 16,
        lessonId: 4,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Contoh kode sederhana percabangan IF - Else dalam bahasa pemrograman C++",
          "Kasus #1 – Pemilihan makanan berdasarkan kesehatan (menggunakan string).",
          "Kode programnya:",
          "Kode di atas merupakan sebuah program yang menentukan makanan apa yang akan dimakan berdasarkan kesehatan (sesuai dengan kasus sebelumnya). Berikut adalah penjelasan singkatnya:",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
          "PENTING: Jika kamu menggunakan string sebagai kondisi ataupun nilai, maka antara kondisi dan nilai harus SAMA PERSIS, alias string di sini merupakan CASE SENSITIVE. Sederhananya, case sensitive adalah perlakukan sistem yang membedakan huruf besar dan huruf kecil sebagai dua karakter yang berbeda.",
          "Coba kamu ganti nilai variabel makanan pada kode program di bawah ini menjadi “Sehat” dan RUN programnya. Apa yang terjadi?",
          "Kode program akan tetap bisa dijalankan dan tidak mengalami error namun keluaran/output yang dihasilkan adalah “kue cokelat”. Walaupun kata/string yang digunakan sama-sama “sehat” namun tetap berbeda karena variabel makanan bernilai “Sehat” bukan “sehat”, sehingga variabel makanan dianggap tidak memenuhi kondisi dan akan masuk ke blok kode else.","Selanjutnya, analisis kode program di bawah ini.",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1R8aP5AHwuRgi_pmk7rkKwULDELHZv5SD",
          "https://drive.google.com/uc?export=view&id=184ctMQz7HVPekrtAG9A0jzBIDnI8MmDt",
          "",
          "https://drive.google.com/uc?export=view&id=1Na7Edltebh1-kCBwDPhQdrYl9uC0ftV4",
          "",
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1NwQkNlg2ESqQAnOF5cmiZ-cLc4hQdJ_R",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZat_A7k/QYC_UhLeitAMGNSzE0c3aw/view?embed",
        ],
        codeSources: [
          "",
          "",
          "",
          "",
          "",
          "",
          "https://onecompiler.com/embed/cpp/42rmsq8f9?theme=dark&hideLanguageSelection=true&hideNewFileOption=true&hideNew=true&disableAutoComplete=true&hideStdin=true",
        ],
        question: `Jika kamu mengganti kodenya menjadi seperti di atas dan kamu menjalankan programnya, maka apakah keluaran/output yang dihasilkan dari program tersebut?`,
      },
      {
        id: 17,
        lessonId: 4,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Selanjutnya, diberikan kode program seperti berikut.",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1TlBmgVroadSQve5DQbpHhQaO67lJxLV-",
        ],
        question: 'Berdasarkan kode di atas, maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 18,
        lessonId: 5,
        type: "SELECT",
        order: 1,
        title:"Menggunakan Percabangan IF ELSE dalam Perhitungan",
        descriptions: [
          "Selain untuk menentukan hal-hal dasar seperti pada contoh sebelumnya, kita juga bisa menggunakan percabangan IF – Else dalam perhitungan. Contohnya adalah sebagai berikut.",
          "Kasus #2 – Membuat program untuk menentukan bilangan kelipatan 5.",
          "Bentuk Flowchartnya:",
          "Kode programnya:",
          "Kode di atas merupakan sebuah program yangmemeriksa apakah suatu bilangan merupakan kelipatan 5, dengan pengecualian bahwa bilangan 0 tidak dianggap sebagai kelipatan. Berikut adalah penjelasan singkatnya:",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
          "Mari kita coba untuk mengganti variabel kode program di atas menggunakan code editor di bawah ini.",
        ],
        imageSrcs: [
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1j_e5CwnVvrdGuuwPhUyl654EkN5Xrub1",
          "https://drive.google.com/uc?export=view&id=1dOy_5R9p8jr8v-mP9S4B0SePrzJvlzxP",
          "",
          "https://drive.google.com/uc?export=view&id=1rQNmh_oCbnSLDp4OuRVq-uxODtHXUPii",
        ],
        links: [
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZl_00zY/m6KklGDdVvPPAzPOXqvlnQ/view?embed",
        ],
        codeSources: [
          "",
          "",
          "",
          "",
          "",
          "",
          "https://onecompiler.com/embed/cpp/42rmst44w?theme=dark&hideLanguageSelection=true&hideNewFileOption=true&hideNew=true&disableAutoComplete=true&hideStdin=true",
        ],
        question: 'Coba kamu ganti nilai variabel angka dengan 95 dalam kode program tersebut lalu tekan tombol RUN. Apa keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 19,
        lessonId: 5, 
        type: "SELECT",
        order: 2,
        descriptions: [
          "Kasus #3 – Membuat program untuk menentukan bilangan ganjil dengan menerima masukan/input-an dari pengguna",
          "Kode di atas merupakan sebuah program yang menerima masukan/input dari pengguna untuk menentukan apakah bilangan yang dimasukkan adalah genap. Berikut adalah penjelasan singkatnya:",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1xYb-tDvZs4WG4azddqdpmaYfzCEYgrOF",
        ],
        links: [
          "",
          "https://www.canva.com/design/DAGQZpbXgfI/Kh6DbO4N7l3LK35mviPY9w/view?embed",
        ],
        question: 'Jika blok kode pada line 8  pada program di atas dihapus dan kamu memasukkan 7 sebagai input-annya, maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      },
      {
        id: 20,
        lessonId: 5,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Kasus #3 – Membuat program untuk menentukan bilangan dengan menerima masukan/input-an dari pengguna",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1LxEWcM9Kz8amRnDZ5mf7ekAVCt_TlxLY",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZpbXgfI/Kh6DbO4N7l3LK35mviPY9w/view?embed",
        ],
        question: 'Manakah di bawah ini statement/kondisi untuk melengkapi baris 1 dan baris 2 agar program dapat berjalan dengan benar?',
      },
      {
        id: 21,
        lessonId: 5,
        type: "SELECT",
        order: 4,
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1LxEWcM9Kz8amRnDZ5mf7ekAVCt_TlxLY",
        ],
        question: 'Anggaplah kamu sudah melengkapi statement/kondisi pada baris 1 dan baris 2. Jika blok kode if-else pada baris 1 dihilangkan (line 9 sampai line 13), apa yang terjadi pada program di atas?',
      },     
    ]);
    
    /* Pilihan Ganda Unit 2*/
    await db
    .insert(schema.challengeOptions)
    .values([
      // Jawaban No 1
      {
        challengeId: 14,
        correct: true,
        text: "Memeriksa apakah waktu yang tersedia banyak atau sedikit",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 14,
        correct: false,
        text: "Memutuskan untuk menonton film jika memiliki sedikit waktu",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 14,
        correct: true,
        text: "Memutuskan untuk menonton film jika memiliki banyak waktu",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 14,
        correct: true,
        text: "Memutuskan untuk menonton berita jika memiliki sedikit waktu",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 14,
        correct: false,
        text: "Memutuskan untuk menonton berika jika memiliki banyak waktu",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 2
      {
        challengeId: 16,
        correct: false,
        text: "apel",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: true,
        text: "kue cokelat",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 3
      {
        challengeId: 17,
        correct: true,
        text: "menonton film",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "menonton berita",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 4
      {
        challengeId: 18,
        correct: true,
        text: 'Bilangan tersebut merupakan kelipatan 5',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 18,
        correct: false,
        text: 'Bilangan tersebut bukan merupakan kelipatan 5',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 5
      {
        challengeId: 19,
        correct: false,
        text: 'Bilangan tersebut genap',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 19,
        correct: true,
        text: 'Bilangan tersebut ganjil',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 6
      {
        challengeId: 20,
        correct: false,
        text: "number == 0 dan number > 100",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 20,
        correct: false,
        text: "number == 0 dan number > 100",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 20,
        correct: true,
        text: "number % 2 == 0 dan number > 100 ",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 20,
        correct: false,
        text: "number % 2 == 0 dan number < 100",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 20,
        correct: false,
        text: "number % 2 != 0 dan number > 100",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 7
      {
        challengeId: 21,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: true,
        text: 'Program tidak error dan menghasilkan output namun tidak sesuai tujuan',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: 'Program tidak error dan menghasilkan output sesuai tujuan',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "Program terus berjalan tanpa henti",
        audioSrc: "/bling.mp3",
      },
    ]);

    /* Materi untuk Unit 3 - Percabangan IF - ELSE IF */
    const challenges3 = await db
    .insert(schema.challenges)
    .values([
      {
        id: 31,
        lessonId: 6,
        type: "SELECT",
        title: "Percabangan IF - ELSE IF",
        order: 1,
        descriptions: [
          "Kamu sedang berada di depan lemari pakaian dan bersiap-siap untuk pergi keluar rumah. Kamu melihat beberapa pilihan pakaian di depanmu: jaket tebal, jaket tipis, atau kaos. Kamu memikirkan beberapa hal sebelum memilih pakaian yang akan kamu pakai berdasarkan kondisi cuaca.",
          "1.	Jika kamu melihat cuaca terasa dingin, maka kamu akan memilih jaket tebal.",
          "2.	Jika cuaca tidak terasa dingin, tapi terasa sejuk, maka kamu akan memilih jaket tipis.",
          "3.	Jika cuaca tidak terasa dingin dan sejuk, tapi terasa panas, maka kamu akan memilih kaos.",
          "Kamu menganalisis kondisi cuaca (dingin, sejuk, atau panas) dan kemudian melakukan tindakan (memilih jaket tebal, jaket tipis, atau kaos). Analisa terhadap kondisi cuaca ini dijadikan sebagai kondisi untuk menentukan jenis pakaian yang akan kamu pakai.",
          "Contoh lain,  kamu sedang bersiap-siap untuk pergi ke restoran dan harus memutuskan apa yang akan kamu pesan berdasarkan tingkat rasa lapar dan preferensimu saat ini.",
          "1.	Jika kamu merasa sangat lapar, maka kamu akan memesan hidangan lengkap dengan makanan pembuka, hidangan utama, dan pencuci mulut.",
          "2.	Jika kamu merasa tidak sangat lapar, tapi cukup lapar, maka kamu akan memesan hidangan utama dan pencuci mulut saja.",
          "3.	Jika kamu merasa tidak sangat lapar dan cukup lapar, tapi sedikit lapar, maka kamu akan memesan hidangan utama saja.",
          "4.	Jika kamu tidak lapar sama sekali, maka kamu tidak akan memesan makanan, hanya minuman.",
          "Kamu menganalisis tingkat rasa lapar (sangat lapar, cukup lapar, sedikit lapar, atau tidak lapar) dan kemudian melakukan tindakan (memesan berbagai jenis hidangan atau hanya minuman). Analisis terhadap tingkat rasa lapar dijadikan sebagai kondisi untuk menentukan apa yang akan kamu pesan.",
        ],
        question: `Jika kamu pada akhirnya memakan hidangan utama saja, maka tindakan apa saja yang sebelumnya kamu lakukan? (2 jawaban)`,
      },
      {
        id: 32,
        lessonId: 6,
        type: "SELECT",
        order: 2,
        descriptions: [
          "Kasus-kasus yang dijelaskan sebelumnya dalam pemrograman dapat disebut sebagai percabangan IF – Else IF. Apa itu percabangan IF – Else IF?",
        ],
        imageSrcs: [
          "https://drive.google.com/uc?export=view&id=1DPaNIrUDhUiKjEeNi1uQd6QDXw8MbvEm",
        ],
        question: `If - else if digunakan untuk melakukan pengecekkan kondisi lebih dari satu. Hal ini biasanya digunakan untuk melakukan listing kondisi lainnya jika ingin melibatkan lebih dari satu kondisi. Penggunaan if - else if ini digunakan jika kondisi satu salah, maka akan di lemparkan ke kondisi kedua (else if), jika salah lagi ke kondisi ketiga (else if) dan seterusnya sampai ke kondisi default (else). Jadi, pemeriksaan kondisi dilakukan terurut dari kondisi pertama hingga default.`
      },
      {
        id: 23,
        lessonId: 6,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Kasus #1 – Penentuan sebuah angka dan menentukan kategorinya.",
          "Seorang guru matematika sedang mengajarkan konsep bilangan positif, negatif, dan nol kepada murid-muridnya. Untuk membantu murid-murid lebih memahami, guru tersebut menggunakan sebuah program sederhana. Program ini akan mengecek sebuah angka, kemudian memberikan pesan apakah angka tersebut termasuk dalam kategori: Bilangan positif (jika angka lebih dari 0), Bilangan negatif (jika angka kurang dari 0), atau Nol (jika angkanya tepat sama dengan 0). Di awal, guru memasukkan angka 26 ke dalam program untuk percobaan pertama.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang memeriksa sebuah angka dan menentukan kategorinya. Berikut adalah penjelasan singkatnya: ",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
        ],
        imageSrcs: [
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1fQXz_h5gvDKSL9j1uuNPIEwzEFz969cl",
          "https://drive.google.com/uc?export=view&id=1sgkT6k3h_UeUckZo_F4uS1bpKRIB9VJY",
          "",
          "https://drive.google.com/uc?export=view&id=150Y1sbImZmbr2G2eFiZ-4h9LiOozVkBz",
        ],
        links: [
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZrcDMT4/jlGYcX0lZhO5bKblVR4EQQ/view?embed",
        ],
        question: `Berdasarkan program di atas, ada berapa banyak statement/kondisi percabangan yang digunakan?`
      },
      {
        id: 24,
        lessonId: 6,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Kasus #2 – Penentuan nilai akhir berdasarkan hasil ujian berdasarkan inputan/masukan dari pengguna.",
          "Seorang guru sedang mengadakan ujian dan ingin memberikan nilai huruf berdasarkan skor yang diperoleh setiap siswa. Guru tersebut meminta bantuan seorang asisten untuk membuat program yang bisa mengubah skor ujian menjadi nilai huruf. Program ini akan mengklasifikasikan nilai ujian siswa sebagai berikut: Nilai A untuk skor 85 atau lebih, Nilai B untuk skor 70 sampai 84, Nilai C untuk skor 55 sampai 69, Nilai D untuk skor 40 sampai 54, Nilai E untuk skor di bawah 40.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang menentukan nilai akhir berdasarkan hasil ujian. Berikut adalah penjelasan singkatnya:",
        ],
        imageSrcs: [
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1wI8mYX5zyLHYyoOaSI_dCyWnsVZeNxyB",
          "https://drive.google.com/uc?export=view&id=1ffa2OZGrjSMhAoDJ4mboaLcxAaJKJl6y",
        ],
        links: [
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZ6HKVg8/1abqLZhqP0yjWBAbam-Zuw/view?embed",
        ],
        question: `Berdasarkan program di atas, jika kamu memasukkan 62 sebagai nilai dari variabel ‘nilai’ maka apakah keluaran/output yang dihasilkan?`,
      },
      {
        id: 25,
        lessonId: 6,
        type: "SELECT",
        order: 5,
        descriptions: [
          "Di sebuah klinik, petugas administrasi perlu mencatat kategori usia pasien untuk keperluan pengisian data dan pemetaan layanan kesehatan. Klinik ini menggunakan sebuah program untuk mengelompokkan pasien berdasarkan usia yang mereka masukkan. Kategori usia dalam program tersebut adalah sebagai berikut: Anak-anak usia 0 - 12 tahun, Remaja usia 13 - 17 tahun, Dewasa usia 18 - 64 tahun, Lansia usia 65 tahun ke atas. Jika usia yang dimasukkan kurang dari 0, program akan menampilkan pesan 'Usia tidak valid!'",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang menentukan kategori usia berdasarkan masukan pengguna. Berikut adalah penjelasan singkatnya: ",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1T1nkVtHIjy1q9EurcVDqxHzCZX0QBeGk",
          "https://drive.google.com/uc?export=view&id=1o7q8Hxt-Jr0K2vVgkfBOBzVJtskojHCt",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZ74Ufuk/nsGTFfQRcw8XS5nvo12XkA/view?embed",
        ],
        question: 'Jika blok kode else pada line 21 sampai line 23 dihapus/dihilangkan dan kamu memasukan -20 sebagai inputan, maka apakah keluaran/output yang dihasilkan dari program tersebut saat kamu menjalankan programnya?',
      }, 
    ]);
    
    /* Pilihan Ganda Unit 3*/
    await db
    .insert(schema.challengeOptions)
    .values([
      // Jawaban No 1
      {
        challengeId: 31,
        correct: false,
        text: "Mengetahui bahwa kamu cukup lapar",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 31,
        correct: true,
        text: "Memastikan rasa lapar yang dirasakan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 31,
        correct: false,
        text: "Mengetahui bahwa kamu sangat lapar",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 31,
        correct: true,
        text: "Menentukan makanan yang akan dipesan",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 31,
        correct: false,
        text: "Menentukan minuman yang akan dipesan",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 2
      {
        challengeId: 23,
        correct: false,
        text: "1",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 23,
        correct: true,
        text: "2",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 23,
        correct: false,
        text: "3",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 23,
        correct: false,
        text: "4",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 23,
        correct: false,
        text: "Tidak mempunyai statement/kondisi",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 3
      {
        challengeId: 24,
        correct: false,
        text: "Nilai Anda: A",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 24,
        correct: false,
        text: "Nilai Anda: B",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 24,
        correct: true,
        text: "Nilai Anda: C",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 24,
        correct: false,
        text: "Nilai Anda: D",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 24,
        correct: false,
        text: "Nilai Anda: E",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 4
      {
        challengeId: 25,
        correct: false,
        text: 'Kategori: Dewasa',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 25,
        correct: false,
        text: 'Kategori: Remaja',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 25,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 25,
        correct: true,
        text: "Program tidak error namun tidak menghasilkan output apapun",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 25,
        correct: false,
        text: "Kode program tidak lengkap",
        audioSrc: "/bling.mp3",
      },
    ]);

    /* Materi untuk Unit 4 - Percabangan Switch Case */
    const challenges4 = await db
    .insert(schema.challenges)
    .values([
      {
        id: 26,
        lessonId: 7,
        type: "SELECT",
        title: "Percabangan Switch Case",
        order: 1,
        descriptions: [
          "Kamu sedang berada di restoran dan hendak memesan makanan. Menu yang tersedia adalah seblak, ketoprak, dan soto ayam. Kamu akan memutuskan pesananmu berdasarkan mood dan keinginan pada saat itu.",
          "1.	Jika kamu merasa ingin sesuatu yang pedas, maka kamu akan memesan seblak.",
          "2.	Jika kamu merasa ingin sesuatu yang gurih tapi tidak terlalu pedas, maka kamu akan memesan ketoprak.",
          "3.	Jika kamu merasa ingin sesuatu yang berkuah dan hangat, maka kamu akan memesan soto ayam.",
          "Analisismu terhadap keinginan atau mood (pedas, gurih, atau berkuah) digunakan sebagai kondisi dalam memilih makanan, dengan tiap kondisi menghasilkan pilihan yang berbeda.",
          "Contoh lain, Kamu sedang berada di restoran dan bersiap-siap untuk memesan makanan. Di depanmu ada menu yang berisi beberapa pilihan makanan: nasi goreng, mie goreng, atau sate. Kamu harus memilih makanan berdasarkan nomor pesanan yang tertera di menu.",
          "1.	Jika kamu memilih nomor 1, maka kamu akan mendapatkan nasi goreng.",
          "2.	Jika kamu memilih nomor 2, maka kamu akan mendapatkan mie goreng.",
          "3.	Jika kamu memilih nomor 3, maka kamu akan mendapatkan sate.",
          "4.	Jika kamu memilih nomor 4, maka kamu akan mendapatkan baso tahu.",
          "5.	Jika kamu memilih nomor lain yang tidak ada di menu, maka pesanmu tidak dikenali dan kamu akan diminta untuk memilih ulang.",
          "Kamu menganalisis pilihan nomor makanan pada menu dan kemudian memilih berdasarkan nomor yang kamu masukkan. Analisa nomor ini dijadikan sebagai kondisi untuk menentukan makanan yang kamu pesan.",
        ],
        question: `Berdasarkan situasi di atas, jika pada akhirnya kamu memakan sate, maka nomor berapa yang kamu pilih?`,
      },
      {
        id: 27,
        lessonId: 7,
        type: "SELECT",
        order: 2,
        descriptions: [
          "Kasus-kasus yang dijelaskan sebelumnya dalam pemrograman dapat disebut sebagai percabangan Switch Case. Apa itu percabangan Switch Case?",
          "Switch case merupakan salah satu jenis percabangan (selain IF ELSE) yang dapat digunakan di bahasa pemrograman C++. Cara kerjanya sederhana. Sebuah nilai akan dibandingkan dengan setiap nilai pada case yang ada. Jika sebuah case mempunyai nilai yang sama (bernilai true) maka pernyataan pada case tersebut yang akan dijalankan. Apabila setiap case bernilai false maka pernyataan default yang akan dijalankan. ",
          "Perbedaan mendasar antara IF dan switch yaitu switch case ini digunakan untuk mengecek data yang tipenya karakter dan juga integer. Sementara pada IF – Else pengecekan bisa menggunakan simbol atau operator seperti <, >, =, == dan operator logika seperti AND (&&), OR (||), dan juga NOT (!).",
          "Bentuk perbedaan IF – Else dan Switch Case:",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1vCNomsFL5yZAAlr6WP0GV-1yfIwP67B6",
          "",
          "https://drive.google.com/uc?export=view&id=1PW4uI5-JZwuhE1yMWkD4IX7JLO4NtMAs",
        ],
        question: `Switch sendiri digunakan untuk memilih kondisi yang biasanya memasukkan variabel. Lalu case digunakan sebagai kondisi-kondisi. Jika suatu kondisi bernilai benar maka blok yang benar (true) akan ditampilkan.`
      },
      {
        id: 28,
        lessonId: 7,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Code Editor #1 – Penentuan angka menggunakan switch-case sesuai masukan/inputan dari pengguna.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang meminta pengguna memasukkan angka antara 1 hingga 3, lalu menampilkan pesan berdasarkan pilihan tersebut menggunakan pernyataan switch. Berikut adalah penjelasan singkatnya: ",
        ],
        imageSrcs: [
          "",
          "https://drive.google.com/uc?export=view&id=1m1z29hS_11WFrdFbDDqhyLPpMi0fz0AA",
          "https://drive.google.com/uc?export=view&id=1P_GITe-yxWHs2oJwKcllrqN8npGGcwiO",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZ6HKVg8/1abqLZhqP0yjWBAbam-Zuw/view?embed",
        ],
        question: `Coba kamu jalankan (RUN) program di atas lalu masukkan angka 0 pada STDIN. Apakah keluaran/output yang dihasilkan dari program tersebut?`,
      },
      {
        id: 29,
        lessonId: 7,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Kasus #1 – Penentuan grade menggunakan switch-case dengan tipe data char.",
          "Seorang guru sedang memberikan nilai kepada siswa berdasarkan performa mereka dalam ujian akhir. Setiap siswa menerima grade berupa huruf yang mewakili tingkat pencapaian mereka. Untuk memudahkan pengumuman hasil, guru tersebut menggunakan program yang akan memberikan pesan motivasi atau peringatan berdasarkan grade yang diterima siswa. Berikut adalah ketentuan pesan yang ditampilkan oleh program: Grade A: 'Luar biasa!', Grade B: 'Bagus!', Grade C: 'Cukup.', Grade D: 'Perlu usaha lebih.', Grade F: 'Gagal.'. Jika nilai grade tidak valid (bukan A, B, C, D, atau F), program akan menampilkan pesan: 'Grade tidak valid!' Di dalam program, grade awal yang dimasukkan adalah D.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang meminta pengguna memasukkan angka antara 1 hingga 3, lalu menampilkan pesan berdasarkan pilihan tersebut menggunakan pernyataan switch. Berikut adalah penjelasan singkatnya:",
          "Output yang dihasilkan dari kode di atas adalah sebagai berikut:",
        ],
        imageSrcs: [
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1anYHc6oIxMRtw_XCOPB13fVBWM3JcWS_",
          "https://drive.google.com/uc?export=view&id=17U_zZaRhOwNbcOHkrTTwD8POVZuyZW2t",
          "",
          "https://drive.google.com/uc?export=view&id=1Zc5cVaaVh7iE--3ElwhhnFdeRV9CiuFL",
        ],
        links: [
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZxmVGXw/Z9PbJdkCMLuXitslfjTt4Q/view?embed",
        ],
        question: 'Berdasarkan kode program di atas, jika variabel grade diisi dengan nilai ‘E’ maka apa keluaran/output yang dihasilkan saat program dijalankan? ',
      },
      {
        id: 30,
        lessonId: 7,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Kasus #2 – Penentuan hari menggunakan switch-case dengan masukkan/inputan dari pengguna.",
          "Di sebuah perusahaan, seorang pegawai ingin membuat program sederhana untuk membantu menentukan apakah suatu hari termasuk hari kerja atau akhir pekan. Program ini menerima input berupa angka yang mewakili hari dalam seminggu, dengan ketentuan sebagai berikut: Angka 1 untuk hari Senin, 2 untuk hari Selasa, 3 untuk hari Rabu, 4 untuk hari Kamis, 5 untuk hari Jumat, Angka 6 untuk hari Sabtu dan 7 untuk hari Minggu. Program akan menampilkan: 'Ini adalah hari kerja.' jika angka yang dimasukkan berada antara 1 hingga 5. 'Ini adalah hari akhir pekan.' jika angka yang dimasukkan adalah 6 atau 7. Hari tidak valid!' jika angka yang dimasukkan di luar rentang 1-7.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang meminta pengguna untuk memasukkan angka yang mewakili hari dalam seminggu, lalu menampilkan pesan berdasarkan pilihan tersebut menggunakan pernyataan switch. Berikut adalah penjelasan singkatnya:",
        ],
        imageSrcs: [
          "",
          "",
          "https://drive.google.com/uc?export=view&id=11H_cqqaYLd4CJdRH2qP9gYz-t2aE7xqG",
          "https://drive.google.com/uc?export=view&id=1RRQUJL9DPoAJnXtWlwCVOBm__2EnluNM",
        ],
        links: [
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQZ_jI6i4/q4Zq0cR8dozxEgyKGM7knA/view?embed",
        ],
        question: 'Jika blok kode line 16 dihapus dan kamu memasukkan angka 2 sebagai inputan, maka keluaran/output apa yang dihasilkan saat program dijalankan?',
      },  
    ]);
    
    /* Pilihan Ganda Unit 4*/
    await db
    .insert(schema.challengeOptions)
    .values([
      // Jawaban No 1
      {
        challengeId: 26,
        correct: false,
        text: "1",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 26,
        correct: false,
        text: "2",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 26,
        correct: true,
        text: "3",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 26,
        correct: false,
        text: "4",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 26,
        correct: false,
        text: "5",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 2
      {
        challengeId: 28,
        correct: false,
        text: "Anda memilih angka 1.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 28,
        correct: false,
        text: "Anda memilih angka 2.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 28,
        correct: false,
        text: "Anda memilih angka 3.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 28,
        correct: true,
        text: "Pilihan tidak valid!",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 28,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 3
      {
        challengeId: 29,
        correct: false,
        text: "Bagus!",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 29,
        correct: false,
        text: "Cukup.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 29,
        correct: false,
        text: "Perlu usaha lebih.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 29,
        correct: false,
        text: "Gagal.",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 29,
        correct: true,
        text: "Grade tidak valid!",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 4
      {
        challengeId: 30,
        correct: false,
        text: 'Ini adalah hari akhir pekan.',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 30,
        correct: false,
        text: 'Ini adalah hari kerja.',
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 30,
        correct: true,
        text: "Hari tidak valid!",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 30,
        correct: false,
        text: "Program error",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 30,
        correct: false,
        text: "Program tidak error namun tidak mengeluarkan output apapun",
        audioSrc: "/bling.mp3",
      },
    ]);

    /* Materi untuk Unit 5 - Percabangan Nested IF */
    const challenges5 = await db
    .insert(schema.challenges)
    .values([
      {
        id: 33,
        lessonId: 8,
        type: "SELECT",
        title: "Percabangan Bersarang / Nested IF",
        order: 1,
        descriptions: [
          "Kamu sedang berada di depan lemari pakaian dan bersiap-siap untuk pergi ke sebuah acara formal yang tergantung pada cuaca. Berikut ini beberapa pernyataan untuk menentukan jenis pakaian yang akan dipakai:",
          "1.	Jika cuaca terasa dingin, maka: •	Jika kamu memiliki jaket tebal, maka kamu akan memilih jaket tebal. •	Jika kamu tidak memiliki jaket tebal, maka kamu akan memilih jaket tipis.",
          "2.	Jika cuaca tidak terasa dingin, tapi terasa sejuk, maka: •	Jika kamu memiliki jaket tipis, maka kamu akan memilih jaket tipis. •	Jika kamu tidak memiliki jaket tipis, maka kamu akan memilih kaos.",
          "3.	Jika cuaca tidak terasa dingin dan sejuk, tapi terasa panas, maka kamu akan memilih kaos.",
          "Dalam contoh di atas, kamu menentukan jenis pakaian yang akan dipakai berdasarkan kondisi cuaca dan ketersediaan jaket. Setiap kondisi cuaca memiliki pilihan pakaian yang spesifik, dan jika kondisi pertama tidak dipenuhi, maka akan dilanjutkan ke kondisi berikutnya.",
          "Pada tahapan di atas, kamu menerapkan konsep Nested IF (Percabangan IF bersarang). Apa itu Nested IF?",
        ],
        imageSrcs: [
          "",
          "",
          "",
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1peqHu6a6NihoyTjbSDKGxmYdKdXL3LvT",
        ],
        question: `Nested IF (IF Bersarang) merupakan percabangan if dengan struktur yang lebih kompleks. Dimana didalam sebuah pernyataan if terdapat pernyataan if lainnya, Dengan kata lain terdapat sebuah kondisi if didalam if. Penggunaan struktur if  Bercabang biasa digunakan untuk pemilihan beberapa pernyataan bertingkat, Ketika sebuah pernyataan if dijalankan dan bernilai true maka akan terdapat pernyataan if lainnya pada blok tersebut.`,
      },
      {
        id: 34,
        lessonId: 8,
        type: "SELECT",
        order: 2,
        descriptions: [
          "Contoh kode sederhana percabangan Switch Case dalam bahasa pemrograman C++",
          "Kasus #1 – Penentuan kelulusan berdasarkan nilai teori dan praktik menggunakan nested if sesuai masukan/inputan dari pengguna.",
          "Seorang siswa mengikuti ujian akhir yang terdiri dari dua bagian: ujian teori dan ujian praktik. Untuk dapat dinyatakan Lulus, siswa harus mendapatkan nilai minimal: 60 pada ujian teori dan 70 pada ujian praktik. Jika siswa hanya lulus ujian teori tetapi gagal pada ujian praktik (nilai praktik kurang dari 70), siswa akan dinyatakan 'Tidak Lulus Praktik.' Jika siswa gagal pada ujian teori (nilai teori kurang dari 60), siswa akan dinyatakan 'Tidak Lulus Teori' terlepas dari nilai praktik yang diperoleh.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang memeriksa apakah seseorang lulus berdasarkan nilai teori dan nilai praktik. Berikut penjelasan singkatnya:",
        ],
        imageSrcs: [
          "",
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1uapEQVQTA3yM0DuSPLLnwL83906P5_9u",
          "https://drive.google.com/uc?export=view&id=1y1E3j6rs1TPOX5OmWtUiqQm0bSPBkCKT",
        ],
        links: [
          "",
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQaMHzlig/QNzQ8pYxRgTJc6rsV5RebQ/view?embed",
        ],
        question: `Jika salah satu syarat tidak terpenuhi, program menampilkan alasan tidak lulus (baik karena nilai teori atau praktik).`
      },
      {
        id: 35,
        lessonId: 8,
        type: "SELECT",
        order: 3,
        descriptions: [
          "Kasus #2 – Penentuan jenis segitiga menggunakan nested if sesuai masukan/inputan dari pengguna.",
          "Seorang guru matematika meminta murid-muridnya membuat program yang bisa menentukan jenis segitiga berdasarkan panjang ketiga sisinya. Program ini akan menerima tiga input angka yang masing-masing mewakili panjang sisi segitiga. Berdasarkan panjang sisi-sisi tersebut, program akan mengidentifikasi jenis segitiga sebagai berikut:",
          "1. Segitiga Sama Sisi: jika ketiga sisinya sama panjang.",
          "2. Segitiga Sama Kaki: jika hanya dua sisinya yang sama panjang.",
          "3. Segitiga Sembarang: jika ketiga sisinya berbeda panjang.",
          "Bentuk Flowchartnya:",
          "Bentuk kode programnya:",
          "Kode di atas merupakan sebuah program yang mengklasifikasikan jenis segitiga berdasarkan panjang tiga sisinya. Berikut penjelasan singkatnya:",
        ],
        imageSrcs: [
          "",
          "",
          "",
          "",
          "",
          "https://drive.google.com/uc?export=view&id=1h1lSEdCjCT0z_WHCI25NJDaT0Az_XcJS",
          "https://drive.google.com/uc?export=view&id=1exUJTK8c1cT5maFLXKeEo5_FvJ8qCgy6",
        ],
        links: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "https://www.canva.com/design/DAGQaB-fQ38/OZx-o6nZ7hY81YmtEKQmfA/view?embed",
        ],
        question: `Setiap variabel akan dibandingkan dengan operator perbandingan dan mengeluarkan output sesuai dengan statement yang ada.`,
      },
    ]);
    
    /* Pilihan Ganda Unit 5*/
    // await db
    // .insert(schema.challengeOptions)
    // .values([
    //   // Jawaban No 1
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "1",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "2",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: true,
    //     text: "3",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "4",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "5",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No. 2
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Anda memilih angka 1.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Anda memilih angka 2.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Anda memilih angka 3.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: true,
    //     text: "Pilihan tidak valid!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Program error",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No. 3
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Bagus!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Cukup.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Perlu usaha lebih.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Gagal.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: true,
    //     text: "Grade tidak valid!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No. 4
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: 'Ini adalah hari akhir pekan.',
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: 'Ini adalah hari kerja.',
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: true,
    //     text: "Hari tidak valid!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: "Program error",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: "Program tidak error namun tidak mengeluarkan output apapun",
    //     audioSrc: "/bling.mp3",
    //   },
    // ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();