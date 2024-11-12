// import dynamic from 'next/dynamic';
import Lkpd from './lkpd';

// // Dynamically import the component, disabling server-side rendering (SSR)
// const LiveWorksheet = dynamic(() => import('./live-worksheet'), {
//   ssr: false,
// });

const WorksheetIdPage = () => {
  // return <LiveWorksheet />;
  return <Lkpd/>;
};

export default WorksheetIdPage;