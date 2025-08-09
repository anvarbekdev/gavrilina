"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { X, ChevronDown } from "lucide-react"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { LikeIcon, MenuIcon, SearchIcon, TextIcon } from "@/assets/svg/all"
import { categories } from "@/mock/data"

const headers = [
  {
    name: "Одежда",
    slug: "clothing",
  },
  {
    name: "Аксессуары",
    slug: "accessory",
  },
  { name: "покупателям", slug: "/" },
]

const secondHeaders = [
  { name: "О бренде", href: "/" },
  { name: "Блог", href: "/" },
  { name: "Контакты", href: "/" },
]

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [mobileSubDropdown, setSubMobileDropdown] = useState(null)
  const [mobileSubMiniDropdown, setSubMiniMobileDropdown] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const headerRef = useRef(null) as any;

  const clothingCtgs = categories.filter((ctg) => ctg.type === "clothing");
  const accessoryCtgs = categories.filter((ctg) => ctg.type === "accessory");

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setMobileDropdown(null);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      lastScrollY.current = scrollY;

      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        headerRef?.current?.classList?.add("sticky_header");
      }

    }, { passive: true });
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc, { passive: true });

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, [stickyHeaderFunc]);

  const toggleMobileDropdown = (index: any) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };
  const toggleMobileSubDropdown = (index: any) => {
    setSubMobileDropdown(mobileSubDropdown === index ? null : index);
  };

  const toggleMobileSubMiniDropdown = (index: any) => {
    setSubMiniMobileDropdown(mobileSubMiniDropdown === index ? null : index);
  };

  return (
    <div className="min-h-20">
      <header
        ref={headerRef}
      >
        <div className="border-t-8 border-black border-b border-b-line">
          <div className="container min-h-20 flex items-center mx-auto px-4 xl:px-6">

            {/* Desktop Navbar */}
            <nav className="flex flex-col gap-2 xl:flex-row w-full items-center justify-between">
              <div className="xl:flex items-center hidden relative">
                <Link
                  aria-label="Home"
                  href="/" className="flex gap-x-2 items-center">
                  <Image
                    src="/svg/logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </Link>

                {headers.map((header) => (
                  <div
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={header.name}
                    className="group">
                    <Link
                      href={
                        header.slug === "clothing"
                          || header.slug === "accessory"
                          ? "#"
                          : header.slug}
                      className={clsx(
                        `text-sm px-3 min-h-20 hover:text-hover-gray flex items-center gap-1 transition-colors duration-200`,
                      )}
                    >
                      {header.name.toUpperCase()}
                      {(header.slug === "clothing" || header.slug === "accessory") && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </Link>

                    {(header.slug === "clothing" || header.slug === "accessory") && (
                      <div className="absolute overflow-auto min-h-screen max-h-screen flex left-0 p-8 border-t bg-white shadow-2xl z-50 min-w-[960px] opacity-0 invisible transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible ">
                        <div className="flex flex-col justify-between border-r pr-10">
                          <div>
                            {header.slug === "clothing"
                              ? clothingCtgs
                                .map((category, catIndex) => (
                                  <div
                                    key={catIndex}
                                    onClick={() => setHoveredIndex(catIndex)}
                                    className="flex my-2">
                                    <h4 className={clsx(
                                      "relative uppercase cursor-pointer hover:text-black/70 flex items-center gap-2 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:-translate-x-1/2",
                                      (hoveredIndex === catIndex || (hoveredIndex === null && catIndex === 0))
                                        ? "after:w-full text-black"
                                        : "text-hover-gray"
                                    )}>
                                      {category.name}
                                      {category.total && (
                                        <div className="bg-gray text-black flex h-6 w-6 text-xs rounded-full items-center justify-center">
                                          <span className="p-1">{category.total}</span>
                                        </div>
                                      )}
                                    </h4>
                                  </div>
                                ))
                              : header.slug === "accessory" ? accessoryCtgs
                                .map((category, catIndex) => (
                                  <div
                                    key={catIndex}
                                    onClick={() => setHoveredIndex(catIndex)}
                                    className="flex my-2">
                                    <h4 className={clsx(
                                      "relative uppercase cursor-pointer hover:text-black/70 flex items-center gap-2 after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:bg-black after:w-0 after:transition-all after:duration-300 after:-translate-x-1/2",
                                      (hoveredIndex === catIndex || (hoveredIndex === null && catIndex === 0))
                                        ? "after:w-full text-black"
                                        : "text-hover-gray"
                                    )}>
                                      {category.name}
                                      {category.total && (
                                        <div className="bg-gray text-black flex h-6 w-6 text-xs rounded-full items-center justify-center">
                                          <span className="p-1">{category.total}</span>
                                        </div>
                                      )}
                                    </h4>
                                  </div>
                                ))
                                : null
                            }
                          </div>

                          {/* image or video */}
                          {(() => {
                            const activeCategory =
                              hoveredIndex !== null
                                ? header.slug === "accessory" ? accessoryCtgs[hoveredIndex] : categories[hoveredIndex]
                                : header.slug === "accessory" ? accessoryCtgs[0] : clothingCtgs[0];

                            return (activeCategory?.image && activeCategory?.image.type === "image" ?
                              <Image
                                src={activeCategory.image.url}
                                alt="image"
                                width={400}
                                className="pb-10"
                                height={400}
                              />
                              :
                              activeCategory?.image && activeCategory?.image.type === "video" ?
                                <video
                                  src={activeCategory.image.url}
                                  autoPlay
                                  muted
                                  height={400}
                                  width={400}
                                  loop
                                  className="pb-10"
                                />
                                :
                                null
                            )
                          })()}
                        </div>
                        <div className="pl-10">
                          {(() => {
                            const activeCategory =
                              hoveredIndex !== null
                                ? header.slug === "accessory" ? accessoryCtgs[hoveredIndex] : categories[hoveredIndex]
                                : header.slug === "accessory" ? accessoryCtgs[0] : clothingCtgs[0];

                            return (
                              activeCategory?.children?.map((item, itemIndex) => (
                                <React.Fragment key={itemIndex}>
                                  <h5
                                    className=" text-black hover:text-black/60 uppercase mt-4"
                                  >
                                    {item.name}
                                  </h5>
                                  {item.children && (
                                    <ul className="flex flex-col gap-2 mt-2 ml-2">
                                      {item.children.map((subItem, subItemIndex) => (
                                        <li key={subItemIndex}>
                                          <Link
                                            onClick={() => {
                                              const groupEl = document.activeElement?.closest('.group');
                                              if (groupEl) {
                                                groupEl.classList.remove('group');
                                                setTimeout(() => groupEl.classList.add('group'), 1000);
                                              }
                                            }}
                                            href={`/catalog/?categorySlug=${subItem.slug}`}
                                            className=" text-gray-text hover:text-black/80 uppercase"
                                          >
                                            {subItem.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </React.Fragment>
                              ))
                            );
                          })()}
                        </div>

                      </div>
                    )}
                  </div>
                ))}

              </div>

              <Link
                aria-label="Home"
                href="/">
                <TextIcon />
              </Link>

              <div className="flex items-center justify-between w-full xl:w-auto">
                <button
                  aria-label="Toggle navigation menu"
                  className="cursor-pointer xl:hidden z-50 group"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <MenuIcon />
                </button>

                <div className="flex items-center justify-between gap-2">
                  {secondHeaders.map((header) => (
                    <Link
                      key={header.name}
                      href={header.href}
                      className={clsx(
                        `relative text-sm hidden xl:block text-md px-3 py-2 hover:text-hover-gray`,
                        pathname === header.href && "text-purple"
                      )}
                    >
                      {header.name.toUpperCase()}
                    </Link>
                  ))}

                  <SearchIcon className="cursor-pointer hover:opacity-50 mx-2" />
                  <LikeIcon className="cursor-pointer hover:opacity-50 mx-2" />
                  <Link
                    href="#"
                    className="flex text-sm hover:text-hover-gray gap-x-2 items-center cursor-pointer">
                    <span className="flex gap-x-2 items-center">
                      {"корзина".toUpperCase()}
                    </span>
                    <div className="bg-gray flex h-6 w-6 rounded-full items-center justify-center">
                      <span className="p-1">1</span>
                    </div>
                  </Link>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed burger-menu opacity-0 ${isMenuOpen ? "open opacity-100" : ""} custom-cursor inset-0 bg-white z-50 overflow-y-auto`}>
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                  <h2>Меню</h2>
                  <button
                    aria-label="Toggle navigation menu"
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray z-50 custom-cursor group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className=" z-50 custom-cursor  text-black" />
                  </button>
                </div>


                {headers.map((header, index) => (
                  <div key={header.name}>
                    <div
                      className={clsx(
                        "flex items-center relative justify-between py-2 cursor-pointer",
                        mobileDropdown === index && "text-black"
                      )}
                      onClick={() => (header.slug === "accessory" || header.slug === "clothing") && toggleMobileDropdown(index)}
                    >
                      <div
                        className={clsx(
                          "relative uppercase custom-cursor text-gray-text hover:text-black/80 " +
                          "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[1.6px] " +
                          "after:bg-black after:w-0 after:transition-all after:duration-300 after:-translate-x-1/2",
                          mobileDropdown === index && "text-black after:w-full"
                        )}
                      >
                        {header.name}
                      </div>


                    </div>

                    {/* Mobile Dropdown */}
                    {(header.slug === "accessory" || header.slug === "clothing") && (
                      header.slug === "accessory" ? accessoryCtgs.map((category, catIndex) => (
                        <div
                          key={catIndex}
                          onClick={() => {
                            toggleMobileSubDropdown(catIndex)
                            toggleMobileSubMiniDropdown(null)
                          }}
                          className={clsx(
                            "overflow-hidden pr-2 cursor-pointer transition-all duration-300 ease-out",
                            mobileDropdown === index
                              ? " opacity-100 translate-y-0"
                              : "max-h-0 opacity-0 -translate-y-2"
                          )}
                          style={{
                            transitionDelay: mobileDropdown === index ? `${catIndex * 100 + 200}ms` : '0ms'
                          }}
                        >
                          <h3 className={clsx(
                            "hover:text-black/90 cursor-pointer uppercase my-2 flex items-center gap-2 justify-start",
                            mobileSubDropdown === catIndex ? "text-black" : "text-gray-text"
                          )}>
                            {category.name}
                            {category.total && (
                              <div className="bg-gray text-black flex h-6 w-6 text-xs rounded-full items-center justify-center">
                                <span className="p-1">{category.total}</span>
                              </div>
                            )}
                          </h3>
                          {category?.children?.map((item, itemIndex) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileSubMiniDropdown(itemIndex)
                              }}
                              className={clsx(
                                "overflow-hidden transition-all duration-300 ease-out",
                                mobileSubDropdown === catIndex
                                  ? " opacity-100 translate-y-0"
                                  : "max-h-0 opacity-0 -translate-y-4"
                              )}
                              style={{
                                transitionDelay: mobileSubDropdown === catIndex ? `${itemIndex * 100 + 200}ms` : '0ms'
                              }}
                              key={itemIndex}>
                              <h4
                                className={"flex  my-1  items-center justify-between uppercase"}
                              >
                                <span
                                  className=" text-black hover:text-black/60"
                                >
                                  {item.name}
                                </span>
                                <ChevronDown className={clsx(
                                  "w-5 h-5 transition-all duration-300 ease-out",
                                  mobileSubMiniDropdown === itemIndex
                                    ? "rotate-180"
                                    : "rotate-0 "
                                )} />

                              </h4>
                              {item.children && (
                                item.children.map((subItem, subItemIndex) => (
                                  <h5
                                    className={clsx(
                                      "overflow-hidden leading-8 ml-2 transition-all duration-300 ease-out",
                                      mobileSubMiniDropdown === itemIndex
                                        ? " opacity-100 translate-y-0"
                                        : "max-h-0 opacity-0 -translate-y-4"
                                    )}
                                    style={{
                                      transitionDelay: mobileSubMiniDropdown === itemIndex ? `${subItemIndex * 100 + 200}ms` : '0ms'
                                    }}
                                    key={subItemIndex}>
                                    <Link
                                      href={`/catalog/?categorySlug=${subItem.slug}`}
                                      onClick={() => setIsMenuOpen(false)}
                                      className=" text-base text-gray-text hover:text-black/80 uppercase"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </h5>
                                ))
                              )}
                            </div>
                          ))}

                          {/* image or video */}
                          {category?.image && mobileSubDropdown === catIndex && category.image.type === "image" ? <Image
                            src={category?.image.url}
                            alt="image"
                            width={400}
                            height={400}
                          />
                            : mobileSubDropdown === catIndex && category.image && category.image.type === "video" &&
                            <video
                              src={category.image.url}
                              autoPlay
                              muted
                              height={400}
                              width={400}
                              loop
                              className="pb-10"
                            />
                          }

                        </div>
                      )) : header.slug === 'clothing' && clothingCtgs.map((category, catIndex) => (
                        <div
                          key={catIndex}
                          onClick={() => {
                            toggleMobileSubDropdown(catIndex)
                            toggleMobileSubMiniDropdown(null)
                          }}
                          className={clsx(
                            "overflow-hidden pr-2 cursor-pointer transition-all duration-300 ease-out ",
                            mobileDropdown === index
                              ? "opacity-100 translate-y-0"
                              : "max-h-0 opacity-0 -translate-y-2"
                          )}
                          style={{
                            transitionDelay: mobileDropdown === index ? `${catIndex * 100 + 200}ms` : '0ms'
                          }}
                        >
                          <h3 className={clsx(
                            "hover:text-black/90 cursor-pointer uppercase my-2 flex items-center gap-2 justify-start",
                            mobileSubDropdown === catIndex ? "text-black" : "text-gray-text"
                          )}>
                            {category.name}
                            {category.total && (
                              <div className="bg-gray text-black flex h-6 w-6 text-xs rounded-full items-center justify-center">
                                <span className="p-1">{category.total}</span>
                              </div>
                            )}
                          </h3>
                          {category?.children?.map((item, itemIndex) => (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileSubMiniDropdown(itemIndex)
                              }}
                              className={clsx(
                                "overflow-hidden transition-all duration-300 ease-out",
                                mobileSubDropdown === catIndex
                                  ? " opacity-100 translate-y-0"
                                  : "max-h-0 opacity-0 -translate-y-4"
                              )}
                              style={{
                                transitionDelay: mobileSubDropdown === catIndex ? `${itemIndex * 100 + 200}ms` : '0ms'
                              }}
                              key={itemIndex}>
                              <h4
                                className={"flex  my-1  items-center justify-between uppercase"}
                              >
                                <span
                                  className=" text-black hover:text-black/60"
                                >
                                  {item.name}
                                </span>
                                <ChevronDown className={clsx(
                                  "w-5 h-5 transition-all duration-300 ease-out",
                                  mobileSubMiniDropdown === itemIndex
                                    ? "rotate-180"
                                    : "rotate-0 "
                                )} />

                              </h4>
                              {item.children && (
                                item.children.map((subItem, subItemIndex) => (
                                  <h5
                                    className={clsx(
                                      "overflow-hidden leading-8 ml-2 transition-all duration-300 ease-out",
                                      mobileSubMiniDropdown === itemIndex
                                        ? " opacity-100 translate-y-0"
                                        : "max-h-0 opacity-0 -translate-y-4"
                                    )}
                                    style={{
                                      transitionDelay: mobileSubMiniDropdown === itemIndex ? `${subItemIndex * 100 + 200}ms` : '0ms'
                                    }}
                                    key={subItemIndex}>
                                    <Link
                                      href={`/catalog/?categorySlug=${subItem.slug}`}
                                      onClick={() => setIsMenuOpen(false)}
                                      className=" text-base text-gray-text hover:text-black/80 uppercase"
                                    >
                                      {subItem.name}
                                    </Link>
                                  </h5>
                                ))
                              )}
                            </div>
                          ))}

                          {/* image or video */}
                          {mobileSubDropdown === catIndex && (category?.image && category.image.type === "image") ? <Image
                            src={category?.image.url}
                            alt="image"
                            width={400}
                            height={400}
                          />
                            : mobileSubDropdown === catIndex && category.image && category.image.type === "video" ?
                              <video
                                src={category.image.url}
                                autoPlay
                                muted
                                height={400}
                                width={400}
                                loop
                                className="pb-10"
                              />
                              : null
                          }
                        </div>
                      )))}
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}