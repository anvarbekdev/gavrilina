import ResponsiveCtgSlider from "@/components/sliders/responsive-ctg-slider";
import LinkTo from "@/components/ui/link-to";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    _id: "1",
    category: "Эксклюзивные модели",
    summary: "Limited Edition Только 10 экземпляров",
    href: "/eksklyuzivnye_modeli",
    total: "12",
    image: "/images/product/ctg-1.png",
  },
  {
    _id: "2",
    category: "Костюмы с пиджаками",
    summary: "Комфорт и эстетика в каждом шве",
    href: "/kostyumy_s_pidzhakami",
    total: "17",
    image: "/images/product/ctg-2.png",
  },
  {
    _id: "3",
    category: "Летние коллекции",
    summary: "Комфорт и эстетика в каждом шве",
    href: "/letnie_kollekcii",
    total: "20",
    image: "/images/product/ctg-3.png",
  },
  {
    _id: "4",
    category: "Халаты и кимоно",
    summary: "Комфорт и эстетика в каждом шве",
    href: "/halaty_i_kimono",
    total: "14",
    image: "/images/product/ctg-4.jpg",
  },
]

const products = [
  {
    _id: "1",
    name: "Костюм спортивный «Пэлас»",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-1.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-2.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-4.png",
        name: "product-4.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
  },
  {
    _id: "2",
    name: "Костюм спортивный «Пэлас»",
    sizes: ["XS", "S", "M", "L"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-2.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-3.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-4.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-1.png",
        name: "product-4.png",
      }
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
  },
  {
    _id: "3",
    name: "Костюм спортивный «Пэлас»",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-3.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-4.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-2.png",
        name: "product-4.png",
      }
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
    isBig: true
  },
  {
    _id: "4",
    name: "Льняная рубашка",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-4.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-2.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-1.png",
        name: "product-4.png",
      }
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
    isBig: true
  },
  {
    _id: "5",
    name: "Пиджак «Янь»",
    sizes: ["XS", "S", "M"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-5.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-2.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-4.png",
        name: "product-4.png",
      }
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
  },
  {
    _id: "6",
    name: "Платье трикотажное",
    sizes: ["XS", "S", "M"],
    images: [
      {
        _id: "1",
        url: "/images/product/new-6.png",
        name: "product-1.png",
      },
      {
        _id: "2",
        url: "/images/product/new-2.png",
        name: "product-2.png",
      },
      {
        _id: "3",
        url: "/images/product/new-3.png",
        name: "product-3.png",
      },
      {
        _id: "4",
        url: "/images/product/new-4.png",
        name: "product-4.png",
      }
    ],
    price: 25000,
    discount: 15000,
    isNew: true,
  },
]

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      <div id='hero'
        className="overflow-hidden relative max-w-wqhd mx-auto"
        style={{
          backgroundImage: `url('/images/ui/hero_bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container flex flex-col items-center justify-between min-h-[calc(100vh-80px)] wqhd:min-h-[1000px] mx-auto px-4 md:px-6">
          <h5 className="text-center font-thin text-white pt-16">
            Одежда для тех, кто ценит качество <br />
            и индивидуальность
          </h5>

          <Image
            src="/images/ui/hero_logo.png"
            alt="hero_logo"
            width={120}
            height={120}
          />

          <Image
            src="/images/ui/ellipse_center.png"
            alt="hero_ellipse_center"
            className="absolute max-w-[1000px] md:max-w-[800px] lg:max-w-[750px] xl:max-w-[750px] 2xl:max-w-[900px] bottom-0 left-1/2 transform -translate-x-1/2 "
            width={1000}
            height={1000}
          />

          <Image
            src="/images/ui/ellipse_left.png"
            alt="hero_ellipse_center"
            className="absolute w-[100px] lg:w-[250px] xl:w-[350px] 2xl:w-[400px] wqhd:w-[1400px] bottom-0 right-0"
            width={400}
            height={400}
          />
          <Image
            src="/images/ui/ellipse_right.png"
            alt="hero_ellipse_right"
            className="absolute w-[100px] lg:w-[250px] xl:w-[350px] 2xl:w-[400px] wqhd:w-[1400px] bottom-0 left-0"
            width={400}
            height={400}
          />

          <Link
            href="#"
            className="flex z-40 flex-col transition-all duration-300 hover:opacity-70 items-center border-b mb-16 pb-2 border-hover-gray"
          >
            <div className="h-16 flex items-center justify-center w-16 p-5 bg-white text-black rounded-full" >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white text-lg mt-2">
              Перейти в каталог
            </span>
          </Link>

        </div>

      </div>

      {/* <Categories /> */}
      <div
        className="max-w-wqhd mx-auto px-4 md:px-6 border-b border-gray"
        id='categories'
      >
        <ResponsiveCtgSlider categories={Array.from({ length: 10 }).flatMap(() => categories)} />
      </div>

      {/* New products */}
      <div
        className="container mx-auto px-4 md:px-6 mt-10 md:mt-25"
        id='new_products'
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className={clsx(
            "uppercase cursor-pointer hover:text-black/70 flex items-center gap-2",

          )}>
            Новинки
            <div className="bg-gray text-black flex h-6 w-6 text-xs rounded-full items-center justify-center">
              <span className="p-1">16</span>
            </div>
          </h3>

          <LinkTo href={'#'} className="flex-row-reverse hidden md:flex" />
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={product._id}
              className={clsx(
                `group relative bg-white overflow-hidden transition-all duration-300`,
                (index % 4 === 2 || index % 4 === 3) && "col-span-2"
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
                  index % 4 === 2 || index % 4 === 3
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
                      <div
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
                            "w-full h-full",
                            index % 4 === 2 || index % 4 === 3
                              ? "object-contain"
                              : "object-cover sm:object-contain"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                {product.sizes && (
                  <div className="absolute hidden md:block group/sizes bottom-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-40">

                    <div className="flex cursor-pointer items-center left-1/2 transform -translate-x-1/2 bg-white -top-9 rounded-full absolute gap-3 px-4
                    opacity-0 group-hover/sizes:opacity-100 translate-y-2 group-hover/sizes:translate-y-0 transition-all duration-300
                    ">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className=" cursor-pointer hover:opacity-60 py-1.5 text-lg leading-[18px]  transition-all"
                        >
                          {size}
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
                <h6 className="lg:mb-1 hover:text-gray-text line-clamp-2">
                  {product.name}
                </h6>
                <div className="flex items-center gap-2">
                  <span className="text-base md:text-lg">
                    {product.price?.toLocaleString()} ₽
                  </span>
                  {product.discount && (
                    <span className="text-base text-gray-text md:text-lg  line-through">
                      {product.discount.toLocaleString()} ₽
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </>
  );
}
