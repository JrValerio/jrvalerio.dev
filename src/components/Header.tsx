import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black/60 text-white flex justify-center gap-8 py-4 px-8 sticky top-0 z-30 backdrop-blur-md shadow">
      <Link href="/">Home</Link>
      <Link href="/sobre">Sobre</Link>
      <Link href="/projetos">Projetos</Link>
      <Link href="/contato">Contato</Link>
      <Link href="/cv" className="text-teal-400 font-semibold underline underline-offset-4 hover:text-teal-300 transition">CV</Link>
    </header>
  );
}
