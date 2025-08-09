import clsx from "clsx";
import Link from "next/link";

export default function LinkTo(
  { href, className = "", isButton = false, onClick, label = "Перейти в категорию", iconClassName = "h-16 w-16 p-5" }
    : { href?: string; className?: string, iconClassName?: string, isButton?: boolean, onClick?: () => void, label?: string }) {

  return (
    !href && isButton ?
      <button
        onClick={onClick}
        className={clsx(
          `flex  cursor-pointer gap-4 z-40 transition-all duration-300 hover:opacity-70 items-center`,
          className
        )}
      >
        <div className={clsx(
          "flex items-center justify-center bg-gray text-black rounded-full",
          iconClassName
        )} >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6.99365H7M7 6.99365H13M7 6.99365V0.993652M7 6.99365V12.9937" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-black text-sm md:text-lg border-b pb-1 border-line">
          {label}
        </span>
      </button>
      : href && <Link
        href={href}
        className={clsx(
          `flex gap-4 z-40 transition-all duration-300 hover:opacity-70 items-center `,
          className
        )}
      >
        <div className="h-16 min-w-16 flex items-center justify-center  p-5 bg-gray text-black rounded-full" >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="underline decoration-[1px] decoration-line underline-offset-[10px]">
          {label}
        </span>
      </Link>
  );
}
