import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {
    const coursesData = getCourses();
    const userProgressData = getUserProgress();

    const [
        courses,
        userProgress,
    ] = await Promise.all([
        coursesData,
        userProgressData,
    ]);
    
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-darkenBlue">
               Materi GamCode 
            </h1>
            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
            <div className="py-10">
                <h1 className="text-xl font-bold my-3 text-darkenBlue">
                    Tujuan Pembelajaran
                </h1>
                <ol className="text-justify list-decimal px-5">
                    <li>Peserta didik mampu menjelaskan konsep percabangan dengan benar.</li>
                    <li>Peserta didik mampu memahami konsep dan fungsi percabangan if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu menganalisis percabangan if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu membuat program C++ menggunakan percabangan if dengan baik.</li>
                    <li>Pesera didik mampu menyimpulkan program yang menggunakan percabangan if dengan tepat.</li>
                    <li>Peserta didik mampu memahami konsep dan fungsi percabangan if else pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu menganalisis percabangan if else pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu membuat program C++ menggunakan percabangan if else dengan baik.</li>
                    <li>Pesera didik mampu menyimpulkan program yang menggunakan percabangan if else dengan tepat.</li>
                    <li>Peserta didik mampu memahami konsep dan fungsi percabangan if – else if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu menganalisis percabangan if – else if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu membuat program C++ menggunakan percabangan if – else if dengan baik.</li>
                    <li>Pesera didik mampu menyimpulkan program yang menggunakan percabangan if – else if dengan tepat.</li>
                    <li>Peserta didik mampu memahami konsep dan fungsi percabangan switch case pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu menganalisis percabangan switch case pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu membuat program C++ menggunakan percabangan switch case dengan baik.</li>
                    <li>Pesera didik mampu menyimpulkan program yang menggunakan percabangan switch case dengan tepat.</li>
                    <li>Peserta didik mampu memahami konsep dan fungsi percabangan nested if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu menganalisis percabangan nested if pada pemrograman C++ dengan baik.</li>
                    <li>Peserta didik mampu membuat program C++ menggunakan percabangan nested if dengan baik.</li>
                    <li>Pesera didik mampu menyimpulkan program yang menggunakan percabangan nested if dengan tepat.</li>
                </ol>
            </div>
            <div className="py-2">
                <h1 className="text-xl font-bold text-darkenBlue">
                    Capaian Pembelajaran
                </h1>
                <h1 className="text-justify">
                Pada akhir fase F, peserta didik mampu memahami konsep strategi algoritmik, mengembangkan program komputer terstruktur dalam notasi algoritma atau notasi lain berdasarkan strategi algoritmik yang tepat. Selain itu mampu mengembangkan, melakukan pemeliharaan, dan penyempurnaan algoritma standar ke dalam kode sumber program dengan memperhatikan kualitasnya; serta mampu merancang dan mengimplementasi sebuah program yang menggunakan struktur data kompleks, tepat menggunakan library atau perangkat yang tersedia.
                </h1>
            </div>
            <div className="py-3"/>
            <div className="py-2">
                <h1 className="text-xl font-bold text-darkenBlue">
                    Credits
                </h1>
                <h1 className="text-justify">
                https://icons8.com/
                </h1>
                <h1 className="text-justify">
                https://www.freepik.com/
                </h1>
                <h1 className="text-justify">
                https://iconscout.com/
                </h1>
                <h1 className="text-justify">
                https://www.flaticon.com/
                </h1>
            </div>
            <div className="py-3"/>
        </div>
    );
}
 
export default CoursesPage;