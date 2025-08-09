import { ProductType } from "@/types/type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCard({ products, isSame = false }: { products: ProductType[], isSame?: boolean }) {
  const getSpanClass = (index: number) => {

    const position2Col = index % 4;

    let class2Col = "";

    if (position2Col === 0 || position2Col === 1) {
      class2Col = "col-span-1";
    } else {
      class2Col = "col-span-2";
    }

    if (isSame) {
      return class2Col;
    }

    const position4Col = index % 6;

    let class4Col = "";

    if (position4Col === 0 || position4Col === 1) {
      class4Col = "xl:col-span-1";
    } else if (position4Col === 2) {
      class4Col = "xl:col-span-2";
    } else if (position4Col === 3) {
      class4Col = "xl:col-span-2";
    } else {
      class4Col = "xl:col-span-1";
    }
    return `${class2Col} ${class4Col}`;
  };

  return products
    .map((product, index) => {
      return (
        <div
          key={index}
          className={clsx(
            `group relative bg-white overflow-hidden transition-all duration-300`,
            getSpanClass(index)
          )}
        >
          {/* Image Container */}
          <div className="image-container cursor-pointer relative  overflow-hidden bg-gray">

            {/* Badges */}
            {product.isNew && (
              <div className="absolute top-1 md:top-3 left-1 md:left-3 z-30">
                <span className="bg-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs md:text-lg ">
                  Новинка
                </span>
              </div>
            )}

            {/* Heart Button */}
            <button className="absolute hover:opacity-70 cursor-pointer top-1 md:top-3 right-1 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-sm opacity-100 md:opacity-0  group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 z-30">
              <svg width="16" height="14" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8337 4.17012C12.8337 5.07223 12.4873 5.93871 11.8687 6.57968C10.4448 8.05557 9.06381 9.59458 7.58675 11.017C7.24818 11.3383 6.71111 11.3266 6.38712 10.9907L2.13168 6.57968C0.845428 5.24635 0.845428 3.09387 2.13168 1.76057C3.43058 0.414167 5.54662 0.414167 6.84551 1.76057L7.00021 1.9209L7.15479 1.76066C7.77756 1.11478 8.62572 0.750488 9.51175 0.750488C10.3978 0.750488 11.2459 1.11474 11.8687 1.76057C12.4873 2.40158 12.8337 3.26802 12.8337 4.17012Z" stroke="#080808" strokeWidth="0.486111" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Desktop Navigation Lines (hover-based) */}
            {product.images.length > 1 &&
              product.images.map((_, idx) => (
                <div
                  key={`nav-${idx}`}
                  data-hover-index={idx}
                  className="nav-line hidden md:block group/navline absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100  transition-opacity duration-300 z-20 h-full  cursor-pointer"
                  style={{
                    width: `${270 / product.images.length - 8}px`,
                    marginLeft: `${((idx - (product.images.length - 1) / 2) * (270 / product.images.length))}px`
                  }}
                >
                  <div
                    style={{
                      width: `${270 / product.images.length - 8}px`,
                    }}
                    className="nav-line rounded-full absolute group-hover/navline:bg-[#898989] bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 h-0.5  bg-[#DCDCDC] cursor-pointer"
                  />
                </div>
              ))
            }

            {/* Desktop Image Stack (hover-based) */}
            <div className={clsx(
              "image-stack hidden md:block relative w-full ",
              Math.floor(index / 3) % 2 === 0
                ? "h-[300px] sm:h-[400px] md:h-[400px]"
                : "h-[230px] sm:h-[300px] md:h-[400px]"
            )}>
              {product.images.map((image, idx) => (
                <Image
                  data-img-index={idx}
                  key={`desktop-img-${idx}`}
                  src={image.url}
                  alt={image.name}
                  width={600}
                  height={600}
                  className={`product-image absolute inset-0 w-full h-full object-contain transition-all duration-500  ${idx === 0 ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>

            {/* Mobile Touch Slider (scroll-based) */}
            <div className=" md:hidden overflow-x-auto w-full h-full image-slider">
              <div className="flex">
                {product.images.map((image, idx) => (
                  <Link
                  href={`/catalog/${product.slug}`}
                    key={`mobile-img-${idx}`}
                    className={clsx(
                      "flex-shrink-0 w-full image-slide relative",
                      index % 4 === 2 || index % 4 === 3
                        ? "h-[300px] sm:h-[400px]"
                        : "h-[230px] sm:h-[300px]"
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      width={400}
                      height={400}
                      className={clsx(
                        "w-full h-full object-contain",
                        index % 4 === 2 || index % 4 === 3
                          ? "object-contain"
                          : "min-[400px]:object-contain object-cover"
                      )}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && (
              <div className="absolute hidden md:block group/sizes bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-30">

                <div className="flex cursor-pointer items-center left-1/2 transform -translate-x-1/2 bg-white -top-9 rounded-full absolute gap-3 px-4
            opacity-0 group-hover/sizes:opacity-100 translate-y-2 group-hover/sizes:translate-y-0 transition-all duration-300
            ">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      className=" cursor-pointer hover:opacity-60 py-1.5 text-lg leading-[18px]  transition-all"
                    >
                      {size.name}
                    </button>
                  ))}
                </div>

                <button className=" cursor-pointer flex items-center justify-center bg-white group-hover/sizes:hover:opacity-75 w-[50px] h-[50px] rounded-full ml-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H7M7 7H13M7 7V1M7 7V13" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="my-4 cursor-pointer">
            <Link
              href={`/catalog/${product.slug}`}
            >
              <h6 className="lg:mb-1 hover:text-gray-text line-clamp-2">
                {product.name}
              </h6>
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg">
                  {product.price?.toLocaleString()} ₽
                </span>
                {product.discount && (
                  <span className="text-base text-gray-text md:text-lg  line-through">
                    {product.discount.amount.toLocaleString()} ₽
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )
    }
    )
}