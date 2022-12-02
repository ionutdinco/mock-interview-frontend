import Head from 'next/head'
import Header from '../Components/Home/Header'
import Sidebar from '../Components/Home/Sidebar'
import Feed from '../Components/Home/Feed'
import ComunitySidebar from '../Components/Home/ComunitySidebar'
import Login from '../Components/Login'
import { getSession } from 'next-auth/react'


export default function Home({session}) {
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>Mock Interview App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='flex flex-auto'> 
        <Sidebar/>
        <Feed/>
        <ComunitySidebar/>
      </main>
      <footer></footer>
    </div>
  );
}

export async function  getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: { session },
  };
}
