import ProductsCard from "@/components/cards/products-card";
import NewCollection from "@/components/new-collection";
import ResponsiveCtgSlider from "@/components/sliders/responsive-ctg-slider";
import LinkTo from "@/components/ui/link-to";
import { categories, collections, newProducts } from "@/mock/data";
import { BlogType } from "@/types/type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    _id: "1",
    title: "«Искусство Casual-элегантности»",
    topic: "Мода",
    slug: "#",
    createdAt: new Date(),
    image: {
      _id: "1",
      url: "/images/product/blog-1.jpg",
      name: "blog-1.jpg",
    }
  },
  {
    _id: "2",
    title: "«Йога-лук: комфорт и стиль»",
    topic: "О здоровье",
    slug: "#",
    createdAt: new Date(),
    image: {
      _id: "1",
      url: "/images/product/blog-2.jpg",
      name: "blog-1.jpg",
    }
  },
  {
    _id: "3",
    title: "«Почему шелк — это инвестиция»",
    topic: "Мода",
    slug: "#",
    createdAt: new Date(),
    image: {
      _id: "1",
      url: "/images/product/blog-3.jpg",
      name: "blog-1.jpg",
    }
  },
  {
    _id: "4",
    title: "Йога как антидепрессант",
    topic: "Спорт",
    slug: "#",
    createdAt: new Date(),
    image: {
      _id: "1",
      url: "/images/product/blog-4.jpg",
      name: "blog-1.jpg",
    }
  },
] as BlogType[]

export default function Home() {

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
      {/* <Hero /> */}
      <div id='hero'
        className="overflow-hidden relative wqhd:container  mx-auto"
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
            href="/catalog"
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

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
          poster="/images/ui/hero_bg.webp"
        >
          <source src="/videos/home-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* <Categories /> */}
      <div
        className="wqhd:container px-4 md:px-6 mx-auto border-b border-gray"
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
          <h3 className="uppercase cursor-pointer hover:text-black/70 xl:flex items-start">
            Новинки
            {newProducts && <span
              className="bg-gray text-black inline-block align-middle h-8 w-8 text-base rounded-full text-center leading-8 ml-2"
            >
              {newProducts.slice(0, 6).length}
            </span>}
          </h3>

          <LinkTo href={'/catalog?isNew=true'} className="flex-row-reverse hidden md:flex" />
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <ProductsCard products={newProducts.slice(0, 6)} />
        </div>

      </div>

      {/* new collection */}
      <NewCollection images={images} collections={collections} newProducts={newProducts} />

      {/* Style */}
      <div
        className="relative container flex flex-col-reverse xl:flex-row mx-auto  xl:h-[calc(100vh-80px)] wqhd:max-h-[50vh] px-4 md:px-6 my-10 md:my-25"
        id="style"
      >
        {/* Image con */}
        <div className="relative xl:w-[60%] h-[285px] sm:h-[400px] md:h-[500px] xl:h-full">
          <Image
            src="/images/ui/style.webp"
            alt="style"
            fill
            className="object-cover"
          />
        </div>

        {/* Content*/}
        <div className="xl:w-[40%] p-2 xl:p-8 mb-10 xl:mb-0 h-full gap-4 flex flex-col justify-between">
          <h2 className="text-[42px] xl:text-[56px] xl:leading-[64px]">{"Лето в стиле".toUpperCase()} <br /> {"Luxury".toUpperCase()}</h2>

          <div>
            <p className="text-sm md:text-2xl">
              При покупке изделия из летней коллекции, второе изделие идет
              со скидкой в 3000 рублей.
            </p>

            <LinkTo className="mt-8" href={'#'} label="Подробнее" />
          </div>
        </div>
      </div>

      {/* About Brand */}
      <div
        className="relative overflow-hidden flex justify-center items-center h-[240vh] md:h-[180vh]   wqhd:max-h-[110vh] px-4 md:px-6 my-10 md:my-25"
        id="about-brand"
      >
        <div className="container z-40 mx-auto max-w-5xl">
          <div>
            <h3 className="uppercase text-gray-text">О бренде</h3>
            <h3 className="my-6 leading-[40px]">
              Мы бренд, который черпает вдохновение в красоте природы, в дальних странствиях, в величии древних зданий и прежде всего, в движениях человеческого тела, наполненных энергией.
              В каждой нити нашего гардероба мы стремимся выразить свободу — свободу духа, свободу быть собой, свободу
              жить в гармонии с миром
            </h3>

            <LinkTo href={'#'} label="О бренде" />
          </div>
        </div>

        <Image
          src="/images/ui/left-line.webp"
          alt="left-line"
          className="absolute max-w-[1200px] md:max-w-[800px] lg:max-w-[750px] xl:max-w-[750px] 2xl:max-w-[900px] transform -translate-x-1/2 "
          width={900}
          height={900}
        />

        <Image
          src="/images/ui/right-line.webp"
          alt="right-line"
          className="absolute max-w-[1200px] lg:max-w-[1000px] 2xl:max-w-[1150px] transform translate-x-1/3 -right-120 md:right-auto"
          width={1500}
          height={1500}
        />

        {/* Image */}
        <Image
          src="/images/ui/about-1.webp"
          alt="right-line"
          className="absolute transform translate-x-[40%] lg:-translate-x-[200%] top-30 md:top-50 max-w-[200px] lg:max-w-[1000px] 2xl:max-w-[1150px] "
          width={300}
          height={300}
        />

        <Image
          src="/images/ui/about-2.webp"
          alt="right-line"
          className="absolute transform -translate-x-[40%] md:-translate-x-1/1 bottom-30 md:bottom-0 max-w-[200px] lg:max-w-[200px] 2xl:max-w-[250px] "
          width={300}
          height={300}
        />

        <Image
          src="/images/ui/about-3.webp"
          alt="right-line"
          className="absolute transform translate-x-[70%] md:-translate-x-[180%] 2xl:-translate-x-1/3 bottom-0 md:bottom-auto md:top-0 max-w-[140px] lg:max-w-[120px] 2xl:max-w-[150px] "
          width={300}
          height={300}
        />

        <Image
          src="/images/ui/about-4.webp"
          alt="right-line"
          className="absolute transform translate-y-50 md:-translate-y-0 translate-x-1/2 max-w-[1200px] lg:max-w-[1000px] 2xl:max-w-[1150px] "
          width={500}
          height={500}
        />

        <Image
          src="/images/ui/about-5.webp"
          alt="right-line"
          className="absolute transform -translate-x-[80%] md:translate-x-[90%] lg:translate-x-[100%]  xl:translate-x-[200%] 2xl:translate-x-[310%] top-0 md:top-20 max-w-[140px] md:max-w-[200px] lg:max-w-[180px] 2xl:max-w-[200px]"
          width={200}
          height={200}
        />

      </div>

      {/* home collection */}
      <div
        className="container mx-auto px-4 md:px-6 mt-10 md:mt-25"
        id='home_collection'
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="uppercase cursor-pointer hover:text-black/70 xl:flex  items-start">
            {collections.find((collection) => collection.isShowSection === "elegantCollection")?.name || ''}
            {<span
              className="bg-gray text-black inline-block align-middle h-8 w-8 text-base rounded-full text-center leading-8 ml-2"
            >
              {newProducts?.filter((product) => product.collectionSlug === "izyskannaya_kollekciya_sovmestno_s_cozy_home").length}
            </span>}
          </h3>

          <LinkTo href={'#'} className="flex-row-reverse hidden md:flex" />
        </div>

        {newProducts.filter((product) => product.collectionSlug === "izyskannaya_kollekciya_sovmestno_s_cozy_home").length > 0 && <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <ProductsCard isSame products={newProducts.filter((product) => product.collectionSlug === "izyskannaya_kollekciya_sovmestno_s_cozy_home")} />
        </div>}
      </div>

      {/* blog */}
      <div
        className="container mx-auto px-4 md:px-6 mt-10 md:mt-25"
        id='blog'
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="uppercase cursor-pointer hover:text-black/70 xl:flex  items-start">
            Блог
          </h3>

          <LinkTo href={'#'} label="Все статьи" className="flex-row-reverse hidden md:flex" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
          {blogs
            .slice(0, 4)
            .map((blog) => (
              <div
                key={blog._id}
                className={clsx(
                  `group relative max-w-[400px] bg-white overflow-hidden transition-all duration-300`,
                )}
              >
                {/* Image Container */}
                <div className="image-container w-full max-h-[500px] cursor-pointer relative overflow-hidden bg-gray">

                  {/* Topic */}
                  {blog.topic && (
                    <div className="absolute top-1 md:top-3 left-1 md:left-3 z-30">
                      <span className="bg-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs md:text-lg ">
                        {blog.topic}
                      </span>
                    </div>
                  )}

                  {/*Image*/}
                  <Image
                    src={blog.image.url}
                    alt={blog.image.name}
                    width={600}
                    height={600}
                    className={`  inset-0 w-full h-full object-contain object-top`}
                  />

                </div>

                {/* Blog Info */}
                <div className="my-4 cursor-pointer md:min-h-20 xl:min-h-23 flex flex-col justify-between">
                  <h6 className="lg:mb-1 hover:text-gray-text line-clamp-2">
                    {blog.title}
                  </h6>
                  <p className="text-base md:text-lg text-gray-text">
                    {new Date(blog.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>

              </div>
            ))}
        </div>
      </div>
    </>
  );
}
