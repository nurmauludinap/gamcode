import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";

import { getUserProgress } from "@/db/queries";

const CompilerPage = async () => {
  const userProgressData = getUserProgress();
  
  const [
    userProgress,
  ] = await Promise.all([
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return ( 
    <div className="px-4 top-6">
      <FeedWrapper>
      <iframe
        height="900px"  
        src="https://onecompiler.com/embed/cpp?disableCopyPaste=true&theme=dark" 
        width="100%"
      />
      </FeedWrapper>
    </div>
   );
}

export default CompilerPage;