import { CatalogClient } from "@/components/catalog-client";
import Link from "next/link";
export default function Catalog() {

  return (
    <div
      className="container mx-auto px-4 md:px-6 mt-10 md:mt-20"
      id='catalog'
    >

      <div className="flex gap-2 text-graybold">
        <Link href="/">Главная</Link>/
        <Link className="text-black" href="/catalog">Каталог</Link>
      </div>

      <CatalogClient />
    </div>
  )
}