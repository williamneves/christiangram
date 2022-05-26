import Stories from "./Stories";
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from "./Suggestions";
import {useSession} from 'next-auth/react';

export default function Feed({ }) {
  const {data: session} = useSession();
  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl mx-auto ${!session && '!grid-cols-1 !max-w-3xl'}`}>
      {/* Section */ }
      <section className="col-span-2">
        {/* Stories */ }
        <Stories />
        
        {/* Posts */ }
        <Posts/>

      </section>

      {/* Section */ }
      { session && (
        <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed">
          {/* Mini Profile */ }
          <MiniProfile />
          {/* Suggestions */ }
          <Suggestions />
        </div>
      </section>)}
    </main>
  )
}