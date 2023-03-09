import React from "react";
import Login from "../../Components/Login";
import { getSession } from "next-auth/react";
import CurrentProfessions from "../../Components/Professionals/CurrentProfessions";
import Professional from "../../Components/Professionals/Professional";
import Header from "../../Components/Professionals/Header";
import Head from "next/head";

export default function Professionals({ session }) {
  if (!session) return <Login />;
  return (
    <div className="bg-[#f5f2ff] h-screen">
      <Head>
        <title>Mock Interview App Home</title>
        <meta name="Professional" content="Professions management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex flex-wrap justify-evenly h-5/6 content-center">
        <CurrentProfessions />
        <Professional />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
