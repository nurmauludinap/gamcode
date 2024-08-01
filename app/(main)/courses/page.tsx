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
                    <li>Peserta didik mampu memahami proses pemrograman melalui kegiatan teori dan praktik dengan baik.</li>
                    <li>Peserta didik mampu menguasai konsep larik/array dalam pemrograman dengan tepat.</li>
                    <li>Peserta didik mampu menguasai penerapan larik/array dalam pemrograman melalui kegiatan praktik dengan baik.</li>
                    <li>Peserta didik mampu menguasai konsep karakter dan string dalam pemrograman dengan tepat.</li>
                    <li>Peserta didik mampu menguasai penerapan karakter dan string dalam pemrograman melalui kegiatan praktik dengan baik.</li>
                </ol>
            </div>
            
            <div className="py-2">
                <h1 className="text-xl font-bold text-darkenBlue">
                    Capaian Pembelajaran
                </h1>
                <h1 className="text-justify">
                Pada akhir fase F, peserta didik mampu bergotong-royong dalam mengembangkan program modular yang berukuran besar menggunakan bahasa pemrograman yang ditentukan, mampu memahami struktur program (aspek statik) dan eksekusi (aspek dinamik) suatu program sumber (source code) serta memelihara dan menyempurnakannya, mampu mengenal algoritma standar dan strategi efisiensinya.
                </h1>
            </div>
            
        </div>
    );
}
 
export default CoursesPage;