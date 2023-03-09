import React from 'react';
import Link from "next/link";

export default function TopNav({props}) {
    return (
      <nav className='flex flex-col px-5 space-y-3 pt-5'>
        <Link className='hover:bg-[#1a88a0] p-1 rounded-md border-b' href={props.first}>Domains</Link>
        <Link className='hover:bg-[#1a88a0] p-1 rounded-md border-b' href={props.second}>Publications</Link>
        <Link className='hover:bg-[#1a88a0] p-1 rounded-md border-b' href={props.third}>About</Link>
      </nav>
    )
  }

