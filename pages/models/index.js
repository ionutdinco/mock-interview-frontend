import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Header from "../../Components/Professionals/Header";
import Head from "next/head";
import ModelsPackage from "../../Components/Models/ModelsPackage";
import CreateModel from "../../Components/Models/CreateModel";
import { VscAdd } from "react-icons/vsc";
import Login from "../../Components/Login";

export default function Models({ session }) {
  if (!session) return <Login />;
  const [createModel, setCreateModel] = useState(false);
  return (
    <div>
      <Head>
        <title>Mock Interview App Home</title>
        <meta name="Professional" content="Professions management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="flex flex-row justify-center py-2 bg-[#f1a880]">
          <p
            className={`font-mono text-xl px-2 py-2 text-white border-b-2 ${
              !createModel ? "border-[#b2301c]" : "border-[#f1a880]"
            } cursor-pointer`}
            onClick={() => setCreateModel(false)}
          >
            Models
          </p>
          <p
            className={`font-mono text-xl px-2 py-2 text-white border-b-2 ${
              createModel ? "border-[#b2301c]" : "border-[#f1a880]"
            } cursor-pointer`}
            onClick={() => setCreateModel(true)}
          >
            New Model
          </p>
        </div>
        {!createModel && <ModelsPackage />}
        {createModel && <CreateModel />}
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
