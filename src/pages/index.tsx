import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 lg:p-24">
      <h1
        className="my-14 text-center text-3xl font-bold uppercase 
    tracking-widest"
      >
        Home Page
      </h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/bmi">Bmi Page</Link>
        </li>
        <li>
          <Link href="/pokemon">Pokemon Page</Link>
        </li>
      </ul>
    </main>
  );
}
