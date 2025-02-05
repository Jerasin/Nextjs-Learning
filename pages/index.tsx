'use client'

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // ทำการ redirect ไปยังหน้าใหม่หลังจากที่หน้าโหลดเสร็จแล้ว
    router.push('/pokemon');
  }, [router]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 lg:p-24">
      {/* <h1
        className="my-14 text-center text-3xl font-bold uppercase 
    tracking-widest"
      >
        Home Page
      </h1>

      <ul>
        <li>
          <Link href="/pokemon">Pokemon Page</Link>
        </li>

        <li>
          <Link href="/login">Login Page</Link>
        </li>
      </ul> */}


    </main>
  );
}
