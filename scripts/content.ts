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
        order: 2,
      },
      {
        id: 2,
        courseId: 1,
        title: "Bagian 2",
        description: "Vector dan Array 2 Dimensi",
        order: 3,
      },
      {
        id: 3,
        courseId: 1,
        title: "Bagian 3",
        description: "Konsep Dasar Karakter dan String",
        order: 1,
      },
      {
        id: 4,
        courseId: 1,
        title: "Bagian 4",
        description: "Latihan Array dan String",
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
        title: "Mengakses Array",
      },
      {
        id: 3,
        unitId: 1, 
        order: 3,
        title: "Menghitung Panjang Array",
      },
      
      // Lesson untuk Unit 2 (3 bintang)
      {
        id: 4,
        unitId: 2,
        order: 1,
        title: "Konsep Vector",
      },
      {
        id: 5,
        unitId: 2, 
        order: 2,
        title: "Kuis Fungsi dalam Vector",
      },
      {
        id: 6,
        unitId: 2, 
        order: 3,
        title: "Array 2D dan Vector of Vectors",
      },
      // Lesson untuk Unit 3 (2 bintang)
      {
        id: 7,
        unitId: 3,
        order: 1,
        title: "Konsep Karakter dan String",
      },
      {
        id: 8,
        unitId: 3, 
        order: 2,
        title: "Kuis Fungsi dalam Vector",
      },
      {
        id: 9,
        unitId: 3, 
        order: 3,
        title: "Array 2D dan Vector of Vectors",
      },
    ]);

    /* Soal untuk Unit 1 - Konsep Dasar Array */
    const challenges = await db
    .insert(schema.challenges)
    .values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        descriptions: [
          "Pada praktiknya, program digunakan untuk mengolah data yang berukuran besar dan membutuhkan waktu yang sangat lama jika dikerjakan manual oleh manusia. Misalnya kita perlu menghitung statistika deskriptif (seperti rata rata, nilai minimal, nilai maksimal, standar deviasi, dan sebagainya) dari data seluruh penduduk Indonesia.",
          "Walaupun masalahnya sederhana, namun dikarenakan jumlah data yang diolah sangat banyak dan berukuran besar mengakibatkan waktu pengerjaan pun menjadi sangat lama bagi manusia untuk menyelesaikannya. Bahkan ada kemungkinan data berukuran besar tersebut tidak dapat diolah menggunakan aplikasi pengolah data (spreadsheet) yang tidak dirancang untuk mengolah data sebesar itu. Sebelumnya kalian telah mengenal konsep variabel yang mampu menyimpan satu buah nilai dengan tipe data tertentu (variabel tunggal).",
        ],
        question: `Permasalahan akan muncul ketika program tersebut harus mengolah sebanyak satu juta data, apakah kita harus membuat satu juta variabel? Apa yang akan kamu lakukan jika diminta untuk menyimpan banyak data di program?`,
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        title:"Array",
        descriptions: [
          "Apa itu Array? Bahasa pemrograman memiliki suatu alat untuk menyimpan himpunan data ke dalam satu nama variabel yang diberikan indeks. Salah satunya disebut sebagai larik atau array. Salah satu contoh di dunia nyata yang mempresentasikan Array adalah Loker.",
          "Ketika kalian menyimpan barang di loker, kalian akan mengingat nomor loker tersebut. Kalian juga dapat menyimpan barang di loker dengan nomor yang berbeda. Pada analogi tersebut, nomor pada loker adalah indeks yang kita gunakan untuk mengenali tempat kita menyimpan barang kita tadi.",
          "Membuat array mirip dengan membuat variabel tunggal. Perbedaannya adalah kalian perlu memberikan informasi ukuran dari array yang akan dibuat dan kalian perlu mengaksesnya dengan menggunakan indeks.",
        ],
        imageSrcs: [
          "/array/loker.png",
        ],
        question: 'Manakah di bawah ini yang merupakan cara mendefinisikan array?',
      },
      {
        id: 3,
        lessonId: 1, 
        type: "ASSIST",
        order: 3,
        question: 'Array merupakan tipe data yang hanya menyimpan satu data.',
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        title:"Deklarasi Array",
        descriptions: [
          "Dalam membuat Array, kita perlu memerhatikan hal tertentu. Elemen atau isi dari array itu sendiri harus satu jenis tipe data, misalkan terdiri dari kumpulan angka bulat saja (integer), kumpulan karakter saja (char), maupun kumpulan angka pecahan saja (double). Di dalam bahasa C++, kita tidak bisa membuat 1 array dengan berbagai tipe data (harus 1 jenis saja).",
          "Sebagai contoh, misalkan saya ingin menyimpan 5 buah nilai siswa. Tanpa array, maka harus menyiapkan 5 buah variabel:",
          "Jika menggunakan array, pendefinisian variabel cukup seperti ini:",
        ],
        imageSrcs: [
          "",
          "/array/array_materi_1.png",
          "/array/array_materi_2.png",
        ],
        question: 'Jika kita ingin membuat array dengan 1000 nilai, maka manakah yang benar?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        title:"Mengisi Elemen Array",
        descriptions: [
          "Berikutnya, bagaimana cara mengakses dan mengisi element array? Kita tinggal menuliskan nomor urut dari element yang akan akan diakses, nomor urut ini dikenal juga dengan istilah index. Berikut contohnya:",
          "Perintah ini artinya kita sedang mengisi angka 80 ke index 4 dari array nilai.",
          "Yang harus perlu diperhatikan adalah, nomor urut atau index array dimulai dari 0, bukan 1.",
          "Akibatnya jika kita ingin mengakses element pertama dari array bilangan, penulisannya adalah bilangan[0]. Untuk bisa mengakses element ke-100 dari array bilangan, penulisannya adalah bilangan[99].",
          "Sebagai contoh pertama, kita ingin membuat array nilai dengan 5 element bertipe integer, lalu mengisi dan menampilkan nilainya menggunakan perintah cout:",
          "Di awal kode program, baris int nilai[5] dipakai untuk membuat sebuah array bernama nilai dengan 5 element atau 5 anggota. Array nilai ini di set sebagai int, yang artinya setiap element array hanya bisa diisi dengan bilangan bulat (integer).",
          "Setelah pendefinisian array nilai, selanjutnya kita mengisi setiap element array. Diingat kembali bahwa index array dimulai dari 0, sehingga untuk mengakses element pertama dari array nilai, penulisannya adalah nilai[0]. Serta untuk element kelima diakses dari nilai[4]. Lalu, di akhir program kita menampilkan seluruh elemen array nilai menggunakan cout.",
        ],
        imageSrcs: [
          "/array/array_materi_4.png",
          "",
          "",
          "",
          "/array/array_materi_5.png",
        ],
        question: 'Manakah di bawah ini yang merupakan output dri kode tersebut?',
      },
      {
        id: 6,
        lessonId: 2, 
        type: "ASSIST",
        order: 2,
        question: 'Diberikan array char karakter[5]. Jika kita ingin mengakses elemen ke-3, maka kita memanggil karakter[2].',
      },
      {
        id: 7,
        lessonId: 2,
        type: "SELECT",
        order: 3,
        imageSrcs: [
          "/array/array_materi_6.png"
        ],
        question: `Apakah output yang dihasilkan dari program di atas?`,
      },
      {
        id: 8,
        lessonId: 2,
        type: "SELECT",
        order: 4,
        descriptions: [
          "Dalam contoh sebelumnya, pengisian nilai array diproses satu persatu. Namun kita juga bisa mengisi element array langsung pada saat pendefinisian seperti contoh berikut:",
          "Dalam kode di atas, tipe data array yang digunakan adalah char. Lalu semua isi array diinput sekaligus pada saat pembuatan, yakni dengan perintah:",
          "Tanda koma dipakai sebagai pemisah antara satu nilai dengan nilai lain.",
        ],
        imageSrcs: [
          "/array/array_materi_6.png",
          "/array/array_materi_7.png",
        ],
        question: 'Jika kita ingin mengganti elemen ke-4 dari array huruf dengan karakter z, maka cara yang benar adalah...',
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        order: 5,
        descriptions: [
          "Kita juga bisa mendefinisikan array tanpa harus menulis jumlah elemen anggotanya.",
          "Disini kita tidak menginput angka apapun sebagai penentu jumlah element. Jumlah element akan digenerate secara otomatis dari banyaknya nilai yang diinput ke dalam array tersebut. Dalam contoh ini terdapat 5 nilai sehingga array karakter akan berisi 5 element.",
          "Pembuatan array seperti ini hanya bisa dilakukan jika nilai untuk element array langsung ditulis pada saat pendefinisian. Kita tidak bisa memakai cara diatas jika element array diisi secara terpisah seperti contoh kode program pertama dalam tutorial ini.",
        ],
        imageSrcs: [
          "/array/array_materi_8.png",
          "",
          "/array/array_materi_9.png",
        ],
        question: 'Apakah kode di atas dapat berhasil dieksekusi atau error?',
      },
      {
        id: 10,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        title:"Mencetak Array",
        descriptions: [
          null,
          "Pada contoh kode di atas, kita menggunakan perintah cout secara berulang untuk mencetak semua isi array (line 16 sampai 20). Berikut lebih jelasnya.",
          "Kalau isi array-nya ada ribuan, apa kamu akan sanggup menulis ini berulang-ulang? Tentu saja tidak! Karena itu, kita bisa memanfaatkan perulangan untuk mencetaknya (line 16 sampai 18):",
          "Hal ini jauh lebih sederhana dibandingkan harus menulis satu persatu. Berikut ini outputnya:",
          "Kalau kamu lupa dengan perulangan, maka berikut ini adalah format dasar struktur perulangan for:"
        ],
        imageSrcs: [
          "/array/array_materi_10.png",
          "/array/array_materi_11.png",
          "/array/array_materi_12.png",
          "/array/array_materi_13.png",
          "/array/array_materi_14.png",
        ],
        question: `Saat mencetak isi array dengan perulangan, i < 5 pada line 16 dari program di atas merupakan...`,
      },
      {
        id: 11,
        lessonId: 3,
        type: "SELECT",
        order: 2,
        title:"Menggunakan Class Array",
        descriptions: [
          "Sebelumnya kita dapat mengambil/mengakses elemen tertentu dari sebuah array menggunakan indeks. Sekarang, kita bisa mengambil panjang Array menggunakan Class array dari C++.",
          "Jika menggunakan Class array di C++, maka cara membuat arraynya ada di line 8. Sedangkan pada line 11 kita menggunakan size() setelah nama array untuk mengambil ukuran/panjang array. Output dari kode di atas adalah 5. Kenapa 5? karena array names memiliki 5 nama/elemen/anggota.",
          "Berikut ini kode program jika kita menggunakan Class array dan menggunakan panjang array dalam perulangan:",
          "Jangan lupa untuk selalu mengimport Class array dengan #include seperti pada line 3. Berikut output dari kode di atas:"
        ],
        imageSrcs: [
          "/array/array_materi_15.png",
          "",
          "/array/array_materi_16.png",
          "/array/array_materi_17.png",
        ],
        question: `Berikut ini yang merupakan cara untuk mengambil panjang array jika memakai Class array adalah...`,
      },
      {
        id: 12,
        lessonId: 3,
        type: "SELECT",
        order: 3,
        title:"Langkah Penyelesaian Array",
        descriptions: [
          "Disediakan kode program sebagai berikut:",
          "Berikut ini merupakan langkah-langkah penyelesaian dari contoh kasus program untuk mencari nilai maksimum dan minimum dari nilai inputan menggunakan array.",
          "1. Deklarasi variabel angka sebagai array yang dapat menampung 6 elemen. Deklarasi juga variabel maksimum dan minimum untuk menampung nilai terbesar dan terkecil.",
          "2. Menerima 6 angka inputan menggunakan cin yang dilakukan berulang menggunakan perulangan.",
          "3. Menginisialisasi nilai maksimum dan minimum dengan array indeks ke-0 (angka ke-1).",
          "4. Membandingkan setiap elemen dengan elemen sebelumnya menggunakan perulangan dngan kondisi.",
          "5. Mencetak nilai maksimum dan minimum menggunakan cout.",
        ],
        imageSrcs: [
          "/array/array_materi_20.png",
          "",
          "/array/array_materi_21.png",
          "/array/array_materi_22.png",
          "/array/array_materi_23.png",
          "/array/array_materi_24.png",
          "/array/array_materi_25.png",
        ],
        question: `Jika diinputkan 6 angka yaitu: {10, 8, 8, 5, 9, 4}, maka outputnya adalah...`,
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
        text: "Membuat banyak variabel",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 1,
        correct: true,
        text: "Menggunakan Array",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 2
      {
        challengeId: 2,
        correct: true,
        text: "1",
        imageSrc:"/array/array_answer_1.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "2",
        imageSrc:"/array/array_answer_2.png",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 3
      {
        challengeId: 3,
        correct: false,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 3,
        correct: true,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 4
      {
        challengeId: 4,
        correct: true,
        text: "1",
        imageSrc:"/array/array_answer_3.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 4,
        correct: false,
        imageSrc:"/array/array_answer_4.png",
        text: "2",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 5
      {
        challengeId: 5,
        correct: true,
        text: "1",
        imageSrc:"/array/array_answer_5.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 5,
        correct: false,
        imageSrc:"/array/array_answer_6.png",
        text: "2",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 6
      {
        challengeId: 6,
        correct: true,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 6,
        correct: false,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 7
      {
        challengeId: 7,
        correct: true,
        text: "Huruf: c",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "Huruf: b",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: true,
        text: "c",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 7,
        correct: false,
        text: "b",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 8
      {
        challengeId: 8,
        correct: false,
        text: "huruf[4] = z;",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 8,
        correct: true,
        text: "huruf[3] = z;",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 9
      {
        challengeId: 9,
        correct: false,
        text: "Berhasil",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 9,
        correct: true,
        text: "Error",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 10
      {
        challengeId: 10,
        correct: false,
        text: "Start",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: true,
        text: "Condition",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 10,
        correct: true,
        text: "Increment",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 11
      {
        challengeId: 11,
        correct: false,
        text: "1",
        imageSrc: "/array/array_answer_7.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 11,
        correct: true,
        text: "2",
        imageSrc: "/array/array_answer_8.png",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No. 12
      {
        challengeId: 12,
        correct: true,
        text: "1",
        imageSrc: "/array/array_answer_9.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 12,
        correct: false,
        text: "2",
        imageSrc: "/array/array_answer_10.png",
        audioSrc: "/bling.mp3",
      },
    ]);


    /* Soal untuk Unit 2 - Vector dan Array 2D */
    const challenges2 = await db
    .insert(schema.challenges)
    .values([
      {
        id: 13,
        lessonId: 4,
        type: "SELECT",
        order: 1,
        title:"Vector",
        descriptions: [
          "Apa itu Vector? Vector pada C++ (atau biasa disebut menggunakan std::vector) adalah Array dinamis, yakni array yang memungkinkan proses insert dan delete element pada bagian tengah array dan “seakan-akan” mengubah ukuran array tersebut. Berikut kira-kira ilustrasinya:",
          "Vector memiliki fitur, kapabilitas, dan memiliki banyak fungsi bawaan yang sangat berguna dan memudahkan kita untuk menambah, menghapus, atau melakukan perhitungan elemen. Tetapi secara general, penambahan elemen biasanya dilakukan dari belakang.",
          "Untuk menggunakan vector, kalian harus melakukan memasukkan library vector di paling atas kode seperti berikut:",
          "Kamu bisa mendefinisikan vector jenis apa pun yang kamu inginkan, baik itu vector integer atau tipe float, tipe char, vector string, atau bisa juga vector pasangan atau vector vector.",
          "Kamu juga bisa menentukan ukuran/panjang vektor saat deklarasi. n merupakan jumlah yang kamu inginkan.",
          "Contohnya seperti ini:",
          "vector v memiliki panjang vektor 10, dimana pada line 9 dicetak panjangnya menggunakan v.size() seperti yang sudah kita bahas sebelumnya di array."
        ],
        imageSrcs: [
          "/array/array_materi_26.png",
          "",
          "/array/array_materi_27.png",
          "/array/array_materi_28.png",
          "/array/array_materi_29.png",
          "/array/array_materi_18.png",
        ],
        question: `Jika kamu membuat vector<int>, apakah char/huruf dapat dimasukkan ke dalam vector tersebut?`,
      },
      {
        id: 14,
        lessonId: 4,
        type: "SELECT",
        order: 2,
        title:"Mengakses Elemen Vector",
        descriptions: [
          "Kita bisa memberi ukuran vector dan menyeragamkan isinya dengan fungsi .assign(). Contohnya seperti ini:",
          "Ketika vector telah memiliki ukuran (bukan 0), proses pengaksesan elemen sama seperti proses pengaksesan pada array biasa.",
          "Selain itu kita juga bisa mengakses elemen paling depan dan elemen paling belakang menggunakan .front() dan .back():",       
        ],
        imageSrcs: [
          "/array/array_materi_30.png",
          "/array/array_materi_32.png",
          "/array/array_materi_31.png",
          
        ],
        question: `Jika vector<int> v tidak diberikan ukuran lalu diambil panjangnya menggunakan v.size(), maka output yang dihasilkan adalah...`,
      },
      {
        id: 15,
        lessonId: 4,
        type: "SELECT",
        order: 3,
        title:"Menambahkan Elemen Vector",
        descriptions: [
          "Terdapat dua jenis proses pengisian elemen ke vektor. Yang pertama adalah penambahan elemen ke posisi paling belakang dari vektor (push). Ini bisa dilakukan ketika vektor masih kosong ataupun sudah terisi. Proses penambahan elemen ini menggunakan perintah .push_back(). Berikut ilustrasi .push_back():",
          "Contoh kode menambah elemen vektor menggunakan .push_back():",
          "Cara kedua adalah dengan menyisipkan nilai di tengah-tengah vektor. Proses penyisipan dilakukan menggunakan fungsi .insert() dengan pola:",
          "Sebagai contoh misal kita ingin menambahkan angka 8 pada posisi ke 1 (disisipkan antara elemen ke-0 dan ke-1) dari contoh vector sebelumnya:",
          "Apa maksudnya v.begin()+1? jadi untuk beberapa fungsi vector, kita perlu menggunakan pointer untuk menunjuk suatu posisi.", 
          "v.begin() ini pointer yang menunjuk posisi pertama pada vector, mirip dengan penulisan v[0] pada array (walau sebenernya tetep beda). Mudahnya, setiap akan insert posisi ke-i kita tuliskan v.begin()+i.",      
        ],
        imageSrcs: [
          "/array/array_materi_33.png",
          "/array/array_materi_34.png",
          "/array/array_materi_35.png",
          "/array/array_materi_36.png",
          "",
          "/array/array_materi_37.png",
        ],
        question: `Jika vector<int> v diprint/dicetak menggunakan cout seperti pada kode perulangan di atas setelah dilakukan .push_back() dan .insert(), maka isi dari vector<int> v sekarang adalah...`,
      },
      {
        id: 16,
        lessonId: 4,
        type: "SELECT",
        order: 4,
        title:"Menghapus Elemen Vector",
        descriptions: [
          "Untuk delete elemen di tengah-tengah kita bisa gunakan fungsi .erase() dengan pola:",
          "Semisal kita ingin menghapus elemen di posisi 1 pada vector contoh di bawah (elemen bernilai 5) kita lakukan seperti berikut:",
        ],
        imageSrcs: [
          "/array/array_materi_38.png",
          "/array/array_materi_39.png",
        ],
        question: `Berdasarkan kode di atas maka angka manakah yang dihapus dari vector<int> v?`,
      },
      {
        id: 17,
        lessonId: 5,
        type: "ASSIST",
        order: 1,
        question: `.push_back() merupakan perintah untuk menambah elemen ke posisi paling depan.`,
      },
      {
        id: 18,
        lessonId: 5,
        type: "ASSIST",
        order: 2,
        question: `.pop_back() merupakan perintah untuk menghapus elemen di posisi terakhir.`,
      },
      {
        id: 19,
        lessonId: 5,
        type: "ASSIST",
        order: 3,
        question: `.assign() merupakan perintah untuk memberi ukuran vector dan menyeragamkan isinya.`,
      },
      {
        id: 20,
        lessonId: 5,
        type: "ASSIST",
        order: 4,
        question: `.front() merupakan perintah untuk mengakses elemen paling belakang.`,
      },
      {
        id: 21,
        lessonId: 6,
        type: "SELECT",
        order: 1,
        title:"Array Dua Dimensi",
        descriptions: [
          "Apa itu Array 2 dimensi? Array 2 dimensi adalah array yang terdiri dari n buah baris dan m buah kolom, atau biasa disebut sebagai array yang mempunyai dua subskrip, yaitu baris dan kolom. Bentuknya dapat kamu bayangkan seperti matriks atau tabel, dimana indeks pertama menunjukan baris dan indeks kedua menunjukan kolom.",
          "Untuk mendeklarasikan sebuah array 2 dimensi dalam C++, kamu harus menggunakan dua tanda [ ] (bracket). Adapun bentuk umum dari pendeklarasian array dua dimensi adalah sebagai berikut:",
          "Sebagai contoh misalnya kita ingin mendeklarasikan sebuah array dua dimensi (misalnya dengan nama angka) yang mempunyai jumlah elemen baris sebanyak 3, jumlah elemen kolom sebanyak 4 dan array angka memiliki tipe data int, maka bentuk array nya adalah sebagai berikut:",
        ],
        imageSrcs: [
          "/array/array_materi_40.png",
          "/array/array_materi_41.png",
          "/array/array_materi_42.png",
          
        ],
        question: `Untuk mengakses angka 7 yang berada di baris ke-2 kolom ke-3 array angka, yang dapat kamu lakukan adalah...`,
      },
      {
        id: 22,
        lessonId: 6,
        type: "SELECT",
        order: 2,
        title:"Vector dari Vectors",
        descriptions: [
          "Apa itu Vector dari Vectors? Vector dari Vectors adalah vector dua dimensi dengan jumlah baris yang bervariasi, di mana setiap baris adalah vector. Setiap indeks vector menyimpan vector yang dapat dilintasi dan diakses menggunakan iterator.",
          "Contohnya:",
          "Perintah ini mendorong vector v2 ke dalam vector of vectors v1. Oleh karena itu v1 menjadi {{1, 2, 3}}. Selanjutnya:", 
          "Perintah ini mendorong vektor v2 ke dalam vector of vectors v1 yang sudah ada.",   
        ],
        imageSrcs: [
          "/array/array_materi_43.png",
          "/array/array_materi_44.png",
          "/array/array_materi_45.png",
          
        ],
        question: `Maka dari itu, v1 sekarang menjadi?`,
      },
      {
        id: 23,
        lessonId: 6,
        type: "SELECT",
        order: 3,
        title:"Menambah Elemen",
        descriptions: [
          "Berikut merupakan contoh kode program untuk menambah elemen vector of vectors (membuat Matriks):",
          "Output dari kode di atas adalah:", 
        ],
        imageSrcs: [
          "/array/array_materi_46.png",
          "/array/array_materi_47.png", 
        ],
        question: `Jika int i pada perulangan for (line 20) diganti menjadi 1, maka apa yang terjadi?`,
      },
      {
        id: 24,
        lessonId: 6,
        type: "SELECT",
        order: 4,
        title:"Menghapus Elemen",
        descriptions: [
          "Elemen dapat dihapus dari vector of vectors menggunakan fungsi pop_back().",
          "Misalkan diberikan sebuah vector<vector<int>> v = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}. Lalu dilakukanlah:", 
          "Perintah ini menghapus elemen 9 dari baris terakhir vector. Oleh karena itu v menjadi {{1, 2, 3}, {4, 5, 6}, {7, 8}}. Selanjutnya dilakukan:",
        ],
        imageSrcs: [
          "/array/array_materi_48.png",
          "/array/array_materi_49.png", 
          "/array/array_materi_50.png",
        ],
        question: `Perintah di atas menghapus angka berapa?`,
      },
      {
        id: 25,
        lessonId: 6,
        type: "SELECT",
        order: 5,
        title:"Contoh Kasus",
        descriptions: [
          "Pada kasus seperti apa array dua dimensi digunakan? Misalnya kalian ingin menghitung jarak antara dua kota yang dihubungkan dengan jalan dua  arah. Kalian dapat menggunakan matriks dua dimensi untuk merepresentasikan jarak antara dua kota seperti pada Gambar 2.14 berikut:",
          "Gambar tersebut memperlihatkan proses berpikir komputasional yaitu abstraksi. Suatu hubungan antara kota di dunia nyata (kontekstual) dibuat dalam bentuk yang lebih sederhana dalam bentuk grafik yang menampilkan informasi yang relevan (konseptual), yaitu hubungan antar kota dan jaraknya.", 
          "Setelah itu, bentuk tadi diubah ke dalam bentuk yang dapat digunakan dalam menyusun algoritma komputer (logikal) dalam bentuk matriks dua dimensi. Di balik program yang berjalan di komputer kalian, program akan menyimpan matriks tersebut di dalam memori komputer (fisikal) yang memiliki bentuk seperti matriks satu dimensi.",
          "Misalnya, kalian kemudian dapat membuat kode program yang akan menerima isi matriks jarak di atas dan menyimpannya dalam sebuah vector dua dimensi. Setelah itu, program akan dapat menjawab jarak antara dua kota yang ditanyakan oleh pengguna.",
          "Berikut kode programnya:",
        ],
        imageSrcs: [
          "/array/array_materi_51.png",
          "", 
          "",
          "",
          "/array/array_materi_52.png",
        ],
        question: `Jika jarak yang dimasukkan sesuai dengan Gambar 2.14, maka jarak Kota B ke Kota C adalah...`,
      },                  
    ]);

    /* Pilihan Ganda Unit 2*/
    await db
    .insert(schema.challengeOptions)
    .values([
      // Jawaban No 1
      {
        challengeId: 13,
        correct: false,
        text: "Bisa",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 13,
        correct: true,
        text: "Tidak bisa",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 2
      {
        challengeId: 14,
        correct: true,
        text: "0",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 14,
        correct: false,
        text: "Error",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 3
      {
        challengeId: 15,
        correct: true,
        text: "1",
        imageSrc: "/array/array_answer_11.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 15,
        correct: false,
        text: "2",
        imageSrc: "/array/array_answer_12.png",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 4
      {
        challengeId: 16,
        correct: false,
        text: "3",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: true,
        text: "5",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: false,
        text: "1",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 16,
        correct: false,
        text: "7",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 5
      {
        challengeId: 17,
        correct: false,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 17,
        correct: true,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 6
      {
        challengeId: 18,
        correct: true,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 18,
        correct: false,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 7
      {
        challengeId: 19,
        correct: true,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 19,
        correct: false,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 8
      {
        challengeId: 20,
        correct: false,
        text: "True",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 20,
        correct: true,
        text: "False",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 9
      {
        challengeId: 21,
        correct: true,
        text: "angka[1][2]",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "angka[2][1]",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "angka[2][3]",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 21,
        correct: false,
        text: "angka[3][2]",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 10
      {
        challengeId: 22,
        correct: false,
        text: "1",
        imageSrc:"/array/array_answer_13.png",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 22,
        correct: true,
        text: "2",
        imageSrc:"/array/array_answer_14.png",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 11
      {
        challengeId: 23,
        correct: false,
        text: "Jumlah kolom menjadi 3",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 23,
        correct: true,
        text: "Jumlah baris menjadi 2",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 12
      {
        challengeId: 24,
        correct: true,
        text: "Angka 6",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 24,
        correct: false,
        text: "Angka 8",
        audioSrc: "/bling.mp3",
      },
      // Jawaban No 13
      {
        challengeId: 25,
        correct: true,
        text: "Jarak[1][2]",
        audioSrc: "/bling.mp3",
      },
      {
        challengeId: 25,
        correct: false,
        text: "Jarak[2][1]",
        audioSrc: "/bling.mp3",
      },
    ]);

    
    // /* Soal untuk Unit 4 - Latihan Array dan String */
    // const challenges4 = await db
    // .insert(schema.challenges)
    // .values([
    //   {
    //     id: 26,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 1,
    //     title:"Karakter dan String",
    //     descriptions: [
    //       "Selain angka, masukan dari program dapat berupa karakter atau rangkaian karakter seperti kata. Hal ini telah lazim kalian temui, misalnya ketika mengetikkan kata kunci untuk melakukan pencarian di mesin pencari atau ketika kalian memasukkan kata sandi saat login. Oleh karena itu, program dilengkapi dengan kemampuan untuk membaca, menyimpan, mengolah, dan mencetak rangkaian karakter tersebut.",
    //       "Rangkaian karakter tersebut dalam pemrograman disebut sebagai string. Definisi string dalam pemrograman adalah rangkaian karakter. Karakter sendiri merupakan suatu data berupa huruf, angka, simbol, dan karakter lain yang mengikuti suatu standar tertentu seperti “American Standard Code for Information Interchange” (ASCII) atau Unicode:",
    //       "Karakter adalah unit terkecil dari teks yang dapat ditampilkan atau diproses oleh komputer. Dalam C++, karakter direpresentasikan oleh tipe data char.",
    //       "Contoh: 'A', 'b', '1', '@', '#'",
    //       "String adalah kumpulan karakter yang diatur dalam urutan tertentu. Dalam C++, string dapat direpresentasikan menggunakan array karakter atau menggunakan kelas std::string.",
    //       'Contoh: "Hello", "12345", "C++ Programming"',
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_1.png",
    //     ],
    //     question: `Apakah string merupakan tipe data yang dapat menerima inputan angka (int)?`,
    //   },
    //   {
    //     id: 27,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 2,
    //     title:"Deklarasi dan Inisialisasi",
    //     descriptions: [
    //       "Di C++, deklarasi variabel char dan string cukup sederhana. Berikut adalah contoh bagaimana mendeklarasikan dan menginisialisasi variabel char dan string di C++.",
    //       "Deklarasi dan inisialisasi char:",
    //       "Deklarasi dan inisialisasi string:",
    //       "Jangan lupa untuk selalu mengimport library string di awal kode ketika kamu menggunakan string di C++, seperti ini:",
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_12.png",
    //       "/string/string_materi_13.png",
    //       "/string/string_materi_14.png",
    //     ],
    //     question: 'Jika kita menginisialisasikan char, apakah dapat menggunakan tanda petik ganda (")?',
    //   },
    //   {
    //     id: 28,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 3,
    //     descriptions: [
    //       "Ada beberapa cara yang lazim digunakan untuk mengimplementasikan string dalam pemrograman. Pada bahasa C, string diimplementasikan sebagai array karakter yang diakhiri oleh karakter ‘\0’. Dengan kata lain, kalian dapat membuat dan memproses suatu string seperti halnya kalian mengolah array.",
    //       "Bahasa pemrograman lain seperti C++ atau Java memilih sebuah tipe data string sendiri yang menyembunyikan beberapa detail terkait pengelolaan data string yang dilakukan oleh program. Karena proses pada string berbeda dengan proses pada bilangan, untuk itu bahasa pemrograman telah dilengkapi dengan fungsi-fungsi untuk mengolah karakter dan string.",
    //       "Misalnya untuk melakukan konversi dari huruf kapital ke non kapital, penggabungan string, pencarian substring, dan berbagai fungsi lainnya. Pada bahasa C, kalian dapat akses fungsi-fungsi tersebut pada pustaka.",
    //       "Diberikan sebuah kode program C++ yang menerima inputan string berikut ini:",         
    //     ],
    //     imageSrcs: [
    //       "",
    //       "",
    //       "",
    //       "/string/string_materi_2.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang dilakukan program setelah menerima inputan string menggunakan cin?`,
    //   },
    //   {
    //     id: 29,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 4,
    //     descriptions: [
    //       "Contoh lain, diberikan sebuah kode program C++ yang mempunyai function lowerCase() dimana program menerima inputan string berikut ini:",         
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_3.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang dilakukan program pada line 17 sampai 19?`,
    //   },
    //   {
    //     id: 30,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 5,
    //     descriptions: [
    //       null,         
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_3.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang terjadi jika string yang diinputkan merupakan 'sToP'?`,
    //   },
    //   {
    //     id: 31,
    //     lessonId: 8,
    //     type: "SELECT",
    //     order: 1,
    //     title: "Operasi Dasar",
    //     descriptions: [
    //       "Ada beberapa operasi dasar pada string yang melibatkan berbagai manipulasi dan pemrosesan data teks. Beberapa operasi dasar yang sering digunakan antara lain:",
    //       "1. Penggabungan (Concatenation): Menggabungkan dua atau lebih string menjadi satu string menggunakan operator + atau append().",
    //       "2. Pengambilan Substring: Mengambil sebagian dari string berdasarkan indeks mulai dan panjang substring.",
    //       "3. Perbandingan (Comparison): Membandingkan dua string untuk menentukan urutan leksikografis atau kesamaan menggunakan operator perbandingan (==, !=, <, >).",
    //       "4. Panjang string: Menentukan jumlah karakter dalam string enggunakan fungsi size() atau length().",     
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_4.png",
    //       "/string/string_materi_5.png",
    //       "/string/string_materi_6.png",
    //       "/string/string_materi_7.png",
    //     ],
    //     question: `Apakah sebuah string dapat digabungkan dengan int secara langsung?`,
    //   },
    //   {
    //     id: 32,
    //     lessonId: 8,
    //     type: "SELECT",
    //     order: 2,
    //     title: "Operasi Dasar",
    //     descriptions: [
    //       "5. Pencarian (Search): Mencari keberadaan substring dalam string dan mengembalikan indeks kemunculannya.",
    //       "6. Penggantian (Replace): Mengganti bagian dari string dengan string lain.",
    //       "7. Penghapusan (Erase): Menghapus bagian dari string berdasarkan indeks dan panjangnya.",
    //       "8. Mengakses Elemen: Menggunakan indeks seperti array (str[index]).",
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_8.png",
    //       "/string/string_materi_9.png",
    //       "/string/string_materi_10.png",
    //       "/string/string_materi_11.png",
    //     ],
    //     question: `Jika pada penghapusan str.erase(5, 7) diganti menjadi str.erase(0, 7), maka outputnya adalah...`,
    //   },
    //   {
    //     id: 33,
    //     lessonId: 8, 
    //     type: "ASSIST",
    //     order: 3,
    //     question: 'Perintah .length() digunakan untuk menggabungkan beberapa string.',
    //   },  
    //   {
    //     id: 34,
    //     lessonId: 8, 
    //     type: "ASSIST",
    //     order: 4,
    //     question: 'Kita bisa mengakses elemen string dengan menggunakan nama_variabel[index].',
    //   },
    //   {
    //     id: 35,
    //     lessonId: 8, 
    //     type: "SELECT",
    //     order: 5,
    //     imageSrcs: [
    //       "/string/string_materi_15.png",
    //     ],
    //     question: 'Output dari kode program di atas adalah...',
    //   },        
    // ]);

    // /* Pilihan Ganda Unit 3*/
    // await db
    // .insert(schema.challengeOptions)
    // .values([
    //   // Jawaban No 1
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "Benar",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: true,
    //     text: "Salah",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 2
    //   {
    //     challengeId: 27,
    //     correct: false,
    //     text: "Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 27,
    //     correct: true,
    //     text: "Tidak bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 3
    //   {
    //     challengeId: 28,
    //     correct: true,
    //     text: "Mengubah setiap karakter menjadi non-kapital",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Mengubah setiap karakter menjadi kapital",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 4
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Jika inputan str sama dengan 'STOP', maka program akan terus menerima inputan string dan mengubahnya menjadi huruf non-kapital menggunakan fungsi lowercase().",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: true,
    //     text: "Jika inputan str tidak sama dengan 'STOP', maka program akan terus menerima inputan string dan mengubahnya menjadi huruf non-kapital menggunakan fungsi lowercase().",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 5
    //   {
    //     challengeId: 30,
    //     correct: true,
    //     text: "Program akan terus berjalan hingga inputan str sama dengan 'STOP'.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: "Program akan berhenti.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 6
    //   {
    //     challengeId: 31,
    //     correct: false,
    //     text: "Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 31,
    //     correct: true,
    //     text: "Tidak Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 7
    //   {
    //     challengeId: 32,
    //     correct: true,
    //     text: "World!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 32,
    //     correct: false,
    //     text: "Hello",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 8
    //   {
    //     challengeId: 33,
    //     correct: false,
    //     text: "True",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 33,
    //     correct: true,
    //     text: "False",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 9
    //   {
    //     challengeId: 34,
    //     correct: true,
    //     text: "True",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 34,
    //     correct: false,
    //     text: "False",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 10
    //   {
    //     challengeId: 35,
    //     correct: false,
    //     text: "Hello, World!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 35,
    //     correct: true,
    //     text: "World!Hello, ",
    //     audioSrc: "/bling.mp3",
    //   },
    // ]);

    // /* Soal untuk Unit 3 - Konsep Dasar Karakter dan String */
    // const challenges3 = await db
    // .insert(schema.challenges)
    // .values([
    //   {
    //     id: 26,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 1,
    //     title:"Karakter dan String",
    //     descriptions: [
    //       "Selain angka, masukan dari program dapat berupa karakter atau rangkaian karakter seperti kata. Hal ini telah lazim kalian temui, misalnya ketika mengetikkan kata kunci untuk melakukan pencarian di mesin pencari atau ketika kalian memasukkan kata sandi saat login. Oleh karena itu, program dilengkapi dengan kemampuan untuk membaca, menyimpan, mengolah, dan mencetak rangkaian karakter tersebut.",
    //       "Rangkaian karakter tersebut dalam pemrograman disebut sebagai string. Definisi string dalam pemrograman adalah rangkaian karakter. Karakter sendiri merupakan suatu data berupa huruf, angka, simbol, dan karakter lain yang mengikuti suatu standar tertentu seperti “American Standard Code for Information Interchange” (ASCII) atau Unicode:",
    //       "Karakter adalah unit terkecil dari teks yang dapat ditampilkan atau diproses oleh komputer. Dalam C++, karakter direpresentasikan oleh tipe data char.",
    //       "Contoh: 'A', 'b', '1', '@', '#'",
    //       "String adalah kumpulan karakter yang diatur dalam urutan tertentu. Dalam C++, string dapat direpresentasikan menggunakan array karakter atau menggunakan kelas std::string.",
    //       'Contoh: "Hello", "12345", "C++ Programming"',
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_1.png",
    //     ],
    //     question: `Apakah string merupakan tipe data yang dapat menerima inputan angka (int)?`,
    //   },
    //   {
    //     id: 27,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 2,
    //     title:"Deklarasi dan Inisialisasi",
    //     descriptions: [
    //       "Di C++, deklarasi variabel char dan string cukup sederhana. Berikut adalah contoh bagaimana mendeklarasikan dan menginisialisasi variabel char dan string di C++.",
    //       "Deklarasi dan inisialisasi char:",
    //       "Deklarasi dan inisialisasi string:",
    //       "Jangan lupa untuk selalu mengimport library string di awal kode ketika kamu menggunakan string di C++, seperti ini:",
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_12.png",
    //       "/string/string_materi_13.png",
    //       "/string/string_materi_14.png",
    //     ],
    //     question: 'Jika kita menginisialisasikan char, apakah dapat menggunakan tanda petik ganda (")?',
    //   },
    //   {
    //     id: 28,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 3,
    //     descriptions: [
    //       "Ada beberapa cara yang lazim digunakan untuk mengimplementasikan string dalam pemrograman. Pada bahasa C, string diimplementasikan sebagai array karakter yang diakhiri oleh karakter ‘\0’. Dengan kata lain, kalian dapat membuat dan memproses suatu string seperti halnya kalian mengolah array.",
    //       "Bahasa pemrograman lain seperti C++ atau Java memilih sebuah tipe data string sendiri yang menyembunyikan beberapa detail terkait pengelolaan data string yang dilakukan oleh program. Karena proses pada string berbeda dengan proses pada bilangan, untuk itu bahasa pemrograman telah dilengkapi dengan fungsi-fungsi untuk mengolah karakter dan string.",
    //       "Misalnya untuk melakukan konversi dari huruf kapital ke non kapital, penggabungan string, pencarian substring, dan berbagai fungsi lainnya. Pada bahasa C, kalian dapat akses fungsi-fungsi tersebut pada pustaka.",
    //       "Diberikan sebuah kode program C++ yang menerima inputan string berikut ini:",         
    //     ],
    //     imageSrcs: [
    //       "",
    //       "",
    //       "",
    //       "/string/string_materi_2.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang dilakukan program setelah menerima inputan string menggunakan cin?`,
    //   },
    //   {
    //     id: 29,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 4,
    //     descriptions: [
    //       "Contoh lain, diberikan sebuah kode program C++ yang mempunyai function lowerCase() dimana program menerima inputan string berikut ini:",         
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_3.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang dilakukan program pada line 17 sampai 19?`,
    //   },
    //   {
    //     id: 30,
    //     lessonId: 7,
    //     type: "SELECT",
    //     order: 5,
    //     descriptions: [
    //       null,         
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_3.png",
    //     ],
    //     question: `Berdasarkan kode di atas, apa yang terjadi jika string yang diinputkan merupakan 'sToP'?`,
    //   },
    //   {
    //     id: 31,
    //     lessonId: 8,
    //     type: "SELECT",
    //     order: 1,
    //     title: "Operasi Dasar",
    //     descriptions: [
    //       "Ada beberapa operasi dasar pada string yang melibatkan berbagai manipulasi dan pemrosesan data teks. Beberapa operasi dasar yang sering digunakan antara lain:",
    //       "1. Penggabungan (Concatenation): Menggabungkan dua atau lebih string menjadi satu string menggunakan operator + atau append().",
    //       "2. Pengambilan Substring: Mengambil sebagian dari string berdasarkan indeks mulai dan panjang substring.",
    //       "3. Perbandingan (Comparison): Membandingkan dua string untuk menentukan urutan leksikografis atau kesamaan menggunakan operator perbandingan (==, !=, <, >).",
    //       "4. Panjang string: Menentukan jumlah karakter dalam string enggunakan fungsi size() atau length().",     
    //     ],
    //     imageSrcs: [
    //       "",
    //       "/string/string_materi_4.png",
    //       "/string/string_materi_5.png",
    //       "/string/string_materi_6.png",
    //       "/string/string_materi_7.png",
    //     ],
    //     question: `Apakah sebuah string dapat digabungkan dengan int secara langsung?`,
    //   },
    //   {
    //     id: 32,
    //     lessonId: 8,
    //     type: "SELECT",
    //     order: 2,
    //     title: "Operasi Dasar",
    //     descriptions: [
    //       "5. Pencarian (Search): Mencari keberadaan substring dalam string dan mengembalikan indeks kemunculannya.",
    //       "6. Penggantian (Replace): Mengganti bagian dari string dengan string lain.",
    //       "7. Penghapusan (Erase): Menghapus bagian dari string berdasarkan indeks dan panjangnya.",
    //       "8. Mengakses Elemen: Menggunakan indeks seperti array (str[index]).",
    //     ],
    //     imageSrcs: [
    //       "/string/string_materi_8.png",
    //       "/string/string_materi_9.png",
    //       "/string/string_materi_10.png",
    //       "/string/string_materi_11.png",
    //     ],
    //     question: `Jika pada penghapusan str.erase(5, 7) diganti menjadi str.erase(0, 7), maka outputnya adalah...`,
    //   },
    //   {
    //     id: 33,
    //     lessonId: 8, 
    //     type: "ASSIST",
    //     order: 3,
    //     question: 'Perintah .length() digunakan untuk menggabungkan beberapa string.',
    //   },  
    //   {
    //     id: 34,
    //     lessonId: 8, 
    //     type: "ASSIST",
    //     order: 4,
    //     question: 'Kita bisa mengakses elemen string dengan menggunakan nama_variabel[index].',
    //   },
    //   {
    //     id: 35,
    //     lessonId: 8, 
    //     type: "SELECT",
    //     order: 5,
    //     imageSrcs: [
    //       "/string/string_materi_15.png",
    //     ],
    //     question: 'Output dari kode program di atas adalah...',
    //   },        
    // ]);

    // /* Pilihan Ganda Unit 3*/
    // await db
    // .insert(schema.challengeOptions)
    // .values([
    //   // Jawaban No 1
    //   {
    //     challengeId: 26,
    //     correct: false,
    //     text: "Benar",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 26,
    //     correct: true,
    //     text: "Salah",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 2
    //   {
    //     challengeId: 27,
    //     correct: false,
    //     text: "Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 27,
    //     correct: true,
    //     text: "Tidak bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 3
    //   {
    //     challengeId: 28,
    //     correct: true,
    //     text: "Mengubah setiap karakter menjadi non-kapital",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 28,
    //     correct: false,
    //     text: "Mengubah setiap karakter menjadi kapital",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 4
    //   {
    //     challengeId: 29,
    //     correct: false,
    //     text: "Jika inputan str sama dengan 'STOP', maka program akan terus menerima inputan string dan mengubahnya menjadi huruf non-kapital menggunakan fungsi lowercase().",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 29,
    //     correct: true,
    //     text: "Jika inputan str tidak sama dengan 'STOP', maka program akan terus menerima inputan string dan mengubahnya menjadi huruf non-kapital menggunakan fungsi lowercase().",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 5
    //   {
    //     challengeId: 30,
    //     correct: true,
    //     text: "Program akan terus berjalan hingga inputan str sama dengan 'STOP'.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 30,
    //     correct: false,
    //     text: "Program akan berhenti.",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 6
    //   {
    //     challengeId: 31,
    //     correct: false,
    //     text: "Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 31,
    //     correct: true,
    //     text: "Tidak Bisa",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 7
    //   {
    //     challengeId: 32,
    //     correct: true,
    //     text: "World!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 32,
    //     correct: false,
    //     text: "Hello",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 8
    //   {
    //     challengeId: 33,
    //     correct: false,
    //     text: "True",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 33,
    //     correct: true,
    //     text: "False",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 9
    //   {
    //     challengeId: 34,
    //     correct: true,
    //     text: "True",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 34,
    //     correct: false,
    //     text: "False",
    //     audioSrc: "/bling.mp3",
    //   },
    //   // Jawaban No 10
    //   {
    //     challengeId: 35,
    //     correct: false,
    //     text: "Hello, World!",
    //     audioSrc: "/bling.mp3",
    //   },
    //   {
    //     challengeId: 35,
    //     correct: true,
    //     text: "World!Hello, ",
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