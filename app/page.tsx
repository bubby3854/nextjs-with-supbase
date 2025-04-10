// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <Link href="/todo">Todo</Link>
      <Link href="/login">LoginIn</Link>
    </main>
  );
}
