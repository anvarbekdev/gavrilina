import { getAllProducts, getProductBySlug } from "@/api/requests";
import ProductSlide from "@/components/sliders/product-slide";
import Link from "next/link";
import '@/assets/css/product-slide.css';
import ProductFeed from "@/components/product-feed";
import Image from "next/image";
import LinkTo from "@/components/ui/link-to";
import { collections, newProducts } from "@/mock/data";
import NewCollection from "@/components/new-collection";
import ProductsCard from "@/components/cards/products-card";

export type paramsType = Promise<{ slug: string }>;

export default async function Product(props: { params: paramsType }) {
  const { slug } = await props.params

  const product = await getProductBySlug({ slug });
  const products = (await getAllProducts()).data.slice(0, 3)

  const originalImages =
    collections.flatMap((product) => {
      return product.isShowSection === "perfectCombination" && product.sliders ? product.sliders : [];
    });

  const minCount = 5;

  const images =
    originalImages.length >= minCount
      ? originalImages
      : [
        ...originalImages,
        ...Array(minCount - originalImages.length)
          .fill(null)
          .map((_, i) => originalImages[i % originalImages.length]),
      ];

  return (
    <>
      <div
        className="container mx-auto px-4 md:px-6 mt-10 md:mt-20"
        id='product'
      >

        <div className="flex flex-wrap gap-2 text-graybold mb-8 md:mb-16">
          <div className="flex gap-2">
            <Link href="/">Главная</Link>/
            <Link href="/catalog">Каталог</Link>
          </div>
          /<Link className="text-black" href="/catalog">{product?.name}</Link>
        </div>

        <div className="flex flex-col items-center xl:items-start gap-8 justify-between xl:flex-row">
          {product?.images && <ProductSlide slides={product?.images} />}

          {product && <ProductFeed product={product} />}
        </div>

      </div>

      {/* Stock */}
      <div
        className="relative border pt-4 xl:pt-0 border-line min-h-[400px] justify-between container flex flex-col-reverse xl:flex-row-reverse mx-auto h-full my-10 md:my-25"
        id="style"
      >
        {/* Image con */}
        <div className="relative flex justify-center xl:w-[60%] bg-gray h-auto">
          <Image
            src="/images/product/stock.webp"
            alt="style"
            height={400}
            width={400}
            className="object-conain"
          />
        </div>

        {/* Content*/}
        <div className="xl:w-[40%] p-3 md:p-8 mb-10 xl:mb-0 xl:min-h-[400px] gap-4 flex flex-col justify-between">
          <h2 className="text-[42px] xl:text-[56px] xl:leading-[64px] max-w-xs uppercase">Участвует в акции</h2>

          <div>
            <p className="text-sm md:text-2xl">
              При покупке изделия из летней коллекции, второе изделие идет
              со скидкой в 3000 рублей.
            </p>

            <LinkTo className="mt-8" href={'#'} label="Выбрать второе изделие" />
          </div>
        </div>
      </div>

      {/* new collection */}
      <NewCollection images={images} collections={collections} newProducts={newProducts} />

      {/* similar products */}
      {products.length > 0 &&
        <div id="similar_products" className="container mx-auto px-4 md:px-6 mt-10 md:mt-20">
          <h3 className=" uppercase">Вас также может заинтересовать</h3>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
            <ProductsCard products={products} />
          </div>
        </div>}
    </>
  )
}