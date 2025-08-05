import Link from "next/link";

export default function LinkTo({ href, className = "", }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`flex gap-4 mt-6 z-40 transition-all duration-300 hover:opacity-70 items-center ${className}`}
    >
      <div className="h-16 flex items-center justify-center w-16 p-5 bg-gray text-black rounded-full" >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-black text-lg border-b pb-1 border-line">
        Перейти в категорию
      </span>
    </Link>
  );
}
