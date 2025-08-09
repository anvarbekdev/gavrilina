"use client"

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ProductQueryParams, CategoryType, } from "@/types/type";
import { categories, collections, colors, sizes } from "@/mock/data";
import clsx from "clsx";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductQueryParams;
  setFilters: (filters: ProductQueryParams | ((prev: ProductQueryParams) => ProductQueryParams)) => void;
  categories?: CategoryType[];
}

const sidebar = [
  {
    name: "Категории",
    slug: "categorySlug",
  },
  {
    name: "Размер",
    slug: "sizes",
  },
  {
    name: "Пол",
    slug: "gender",
  },
  {
    name: "Цвет",
    slug: "colors",
  },
  {
    name: "Цена",
    slug: "price",
  },
  {
    name: "Коллекция",
    slug: "collectionSlug",
  },
  {
    name: "Акции",
    slug: "discount",
  },
  {
    name: "Новинки",
    slug: "isNew",
  },
  {
    name: "Только в наличии",
    slug: "onlyInStock",
  },
]

export const FilterSidebar = ({ isOpen, onClose, filters, setFilters }: FilterSidebarProps) => {
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [mobileSubDropdown, setSubMobileDropdown] = useState(null)
  const [mobileSubMiniDropdown, setSubMiniMobileDropdown] = useState(null)
  const [localMinPrice, setLocalMinPrice] = useState(
    Number(filters.minPrice ?? 1000)
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(
    Number(filters.maxPrice ?? 1000000000)
  );

  const minTimeout = useRef<NodeJS.Timeout | null>(null);
  const maxTimeout = useRef<NodeJS.Timeout | null>(null);
  const rangeTimeout = useRef<NodeJS.Timeout | null>(null);
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);

  const handleFilterChange = (key: keyof ProductQueryParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handleArrayFilterChange = (key: 'sizes' | 'colors', value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [key]: newArray,
        page: 1
      };
    });
  };

  const resetAllFilters = () => {
    setFilters({
      limit: 12,
      page: 1
    });

    onClose();
  };

  const toggleMobileDropdown = (index: any) => {
    setMobileDropdown(mobileDropdown === index ? null : index);
  };
  const toggleMobileSubDropdown = (index: any) => {
    setSubMobileDropdown(mobileSubDropdown === index ? null : index);
  };

  const toggleMobileSubMiniDropdown = (index: any) => {
    setSubMiniMobileDropdown(mobileSubMiniDropdown === index ? null : index);
  };

  useEffect(() => {
    setLocalMinPrice(filters.minPrice ?? 1000);
    setLocalMaxPrice(filters.maxPrice ?? 1000000000);
  }, [filters.minPrice, filters.maxPrice]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,9}$/.test(value)) {
      setLocalMinPrice(Number(value));

      if (minRangeRef.current) {
        minRangeRef.current.value = value || '0';
      }

      if (minTimeout.current) clearTimeout(minTimeout.current);
      minTimeout.current = setTimeout(() => {
        const numValue = value ? parseInt(value) : undefined;
        setFilters(prev => ({
          ...prev,
          minPrice: numValue
        }));
      }, 1000);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,9}$/.test(value)) {
      setLocalMaxPrice(Number(value));

      if (maxRangeRef.current) {
        maxRangeRef.current.value = value || '999999999';
      }

      if (maxTimeout.current) clearTimeout(maxTimeout.current);
      maxTimeout.current = setTimeout(() => {
        const numValue = value ? parseInt(value) : undefined;
        setFilters(prev => ({
          ...prev,
          maxPrice: numValue
        }));
      }, 1000);
    }
  };

  const handleSliderChange = (range: [number, number]) => {
    setLocalMinPrice(range[0])
    setLocalMaxPrice(range[1])

    if (rangeTimeout.current) clearTimeout(rangeTimeout.current)
    rangeTimeout.current = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        minPrice: range[0],
        maxPrice: range[1]
      }))
    }, 1000)
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className={`fixed wqhd:container mx-auto filter-sidebar top-22 opacity-0 ${isOpen ? "open opacity-100" : ""} custom-cursor inset-0 z-40 `}>

      <div className="max-w-lg shadow-xl bg-white px-4 overflow-y-auto min-h-[calc(100vh-88px)]  max-h-[calc(100vh-88px)] scrollbar-none">
        <div className="flex justify-between items-center h-20">
          <h2 className="text-[32px] uppercase">Фильтры</h2>
          <button
            aria-label="Toggle navigation menu"
            className="h-10 cursor-pointer hover:opacity-70 w-10 flex items-center justify-center rounded-full z-50 custom-cursor group"
            onClick={onClose}
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.64">
                <path d="M4 4L25 25" stroke="black" strokeWidth="2" />
                <path d="M25 4L4 25" stroke="black" strokeWidth="2" />
              </g>
            </svg>

          </button>
        </div>


        {sidebar.map((header, index) => (
          <div key={header.name}>
            <div
              className={clsx(
                "flex items-center z-40 overflow-hidden justify-between py-2 cursor-pointer",
                mobileDropdown === index && "text-black"
              )}
              onClick={() => toggleMobileDropdown(index)}
            >
              <label
                htmlFor={header.slug}
                className="text-2xl w-full cursor-pointer flex justify-between items-center custom-cursor text-black font-medium"
              >
                {header.name}
                {(header.slug === "sizes" || header.slug === "colors" || header.slug === "collectionSlug" || header.slug === "categorySlug") && (
                  <button
                    className={clsx(
                      "underline cursor-pointer hover:opacity-70 font-normal text-sm md:text-xl",
                      !filters[header.slug] && " opacity-40"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (header.slug === "sizes") {
                        setFilters((prev) => ({
                          ...prev,
                          sizes: [],
                          page: 1
                        }))
                      } else if (header.slug === "colors") {
                        setFilters((prev) => ({
                          ...prev,
                          colors: undefined,
                          page: 1
                        }))
                      } else if (header.slug === "collectionSlug") {
                        setFilters((prev) => ({
                          ...prev,
                          collectionSlug: undefined,
                          page: 1
                        }))
                      } else if (header.slug === "categorySlug") {
                        setFilters((prev) => ({
                          ...prev,
                          categorySlug: undefined,
                          page: 1
                        }))
                      }
                    }}
                    type="button">
                    Сбросить
                  </button>
                )}
                {(header.slug === "isNew" || header.slug === "discount" || header.slug === "onlyInStock") && (
                  <Switch
                    id={header.slug}
                    onClick={(e) => {
                      e.stopPropagation();
                      const slug = header.slug as 'isNew' | 'discount' | 'onlyInStock';
                    
                      setFilters((prev) => {
                        const newFilters = { ...prev };
                    
                        if (newFilters[slug]) {
                          delete newFilters[slug];
                        } else {
                          newFilters[slug] = true;
                        }
                    
                        newFilters.page = 1;
                        return newFilters;
                      });
                    }}
                    
                    
                    checked={filters[header.slug] || false}
                  />
                )}
              </label>
            </div>

            {/* Category Dropdown */}
            {header.slug === "categorySlug" && (
              <div className="border-b relative overflow-hidden">
                {categories.map((category, catIndex) => (
                  <div
                    key={catIndex}
                    onClick={(e) => {
                      toggleMobileSubDropdown(catIndex)
                      handleFilterChange('categorySlug', category.slug);
                      toggleMobileSubMiniDropdown(null)
                    }}
                    className={clsx(
                      "overflow-hidden ml-3 cursor-pointer transition-all duration-300 ease-out",
                      mobileDropdown === index
                        ? " opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2"
                    )}
                    style={{
                      transitionDelay: mobileDropdown === index ? `${catIndex * 100 + 200}ms` : '0ms'
                    }}
                  >
                    <h3
                      className={clsx(
                        "hover:text-black/90 border-l pl-4 text-base md:text-xl cursor-pointer my-2 flex items-center gap-2 justify-between",
                        mobileSubDropdown === catIndex ? "text-black" : "text-gray-text"
                      )}>
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase()}
                      <ChevronDown className={clsx(
                        "w-5 h-5 transition-all duration-300 ease-out",
                        mobileSubDropdown === catIndex
                          ? "rotate-180"
                          : "rotate-0 "
                      )} />
                    </h3>
                    {category?.children?.map((item, itemIndex) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange('categorySlug', item.slug);
                          toggleMobileSubMiniDropdown(itemIndex)
                        }}
                        className={clsx(
                          "overflow-hidden border-l ml-5 pl-4 transition-all duration-300 ease-out",
                          mobileSubDropdown === catIndex
                            ? " opacity-100 translate-y-0"
                            : "max-h-0 opacity-0 -translate-y-4"
                        )}
                        style={{
                          transitionDelay: mobileSubDropdown === catIndex ? `${itemIndex * 100 + 200}ms` : '0ms'
                        }}
                        key={itemIndex}>
                        <h4
                          className={"flex text-base md:text-xl my-1 items-center justify-between"}
                        >
                          <span
                            className=" text-black hover:text-black/60"
                          >
                            {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterChange('categorySlug', subItem.slug);
                                onClose();
                              }}
                              className={clsx(
                                "overflow-hidden border-l ml-1 pl-4 hover:text-black/60 text-base md:text-xl transition-all duration-300 ease-out",
                                mobileSubMiniDropdown === itemIndex
                                  ? " opacity-100 translate-y-0 py-1"
                                  : "max-h-0 opacity-0 -translate-y-4"
                              )}
                              style={{
                                transitionDelay: mobileSubMiniDropdown === itemIndex ? `${subItemIndex * 100 + 200}ms` : '0ms'
                              }}
                              key={subItemIndex}>
                              <span

                                className="text-black hover:text-black/60"
                              >
                                {subItem.name}
                              </span>
                            </h5>
                          ))
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Size Dropdown */}
            {header.slug === "sizes" && (
              <div className="overflow-hidden relative border-b">
                {sizes.map((size, sizeIndex) => (
                  <h5
                    key={sizeIndex}
                    className={clsx(
                      "flex items-center gap-4 text-base md:text-xl ml-3 border-l pl-4 cursor-pointer transition-all duration-300 ease-out",
                      mobileDropdown === index
                        ? " opacity-100 translate-y-0 my-2"
                        : "max-h-0 opacity-0 -translate-y-2"
                    )}
                    style={{
                      transitionDelay: mobileDropdown === index ? `${sizeIndex * 100 + 200}ms` : '0ms'
                    }}
                  >
                    <Checkbox
                      checked={filters.sizes?.includes(size.name) || false}
                      id={size.name}
                      onClick={() => handleArrayFilterChange('sizes', size.name)}
                      className=" size-5 cursor-pointer" />
                    <label
                      htmlFor={size.name}
                      className="text-black cursor-pointer w-full block hover:text-black/60"
                    >
                      {size.name}
                    </label>
                  </h5>
                ))}
              </div>
            )}

            {/* Gender Dropdown */}
            {header.slug === "gender" && (
              <RadioGroup
                className="border-b relative overflow-hidden"
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    // handleFilterChange('gender', target.value);
                  }
                }}
                defaultValue="female">
                <div
                  className={clsx(
                    "flex items-center gap-4 text-base md:text-xl ml-3 border-l pl-4 cursor-pointer transition-all duration-300 ease-out",
                    mobileDropdown === index
                      ? " opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 z-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: mobileDropdown === index ? `${0 * 100 + 200}ms` : '0ms'
                  }}
                >
                  <RadioGroupItem className="size-6" value="male" id="male" />
                  <label htmlFor="male" className=" w-full cursor-pointer">Мужской</label>
                </div>
                <div
                  className={clsx(
                    "flex items-center gap-4 text-base md:text-xl ml-3 border-l pl-4 cursor-pointer transition-all duration-300 ease-out",
                    mobileDropdown === index
                      ? " opacity-100 translate-y-0 my-1"
                      : "max-h-0 absolute opacity-0 -translate-y-2"
                  )}
                  style={{
                    transitionDelay: mobileDropdown === index ? `${1 * 100 + 200}ms` : '0ms'
                  }}
                >
                  <RadioGroupItem className="size-6" value="female" id="female" />
                  <label htmlFor="female" className=" w-full cursor-pointer">Женский</label>
                </div>
              </RadioGroup>

            )}

            {/* Colors */}
            {header.slug === "colors" && (
              <div className="border-b relative overflow-hidden">
                {colors.map((color, colorIndex) => (
                  <h5
                    key={colorIndex}
                    className={clsx(
                      "flex items-center gap-4 text-base md:text-xl ml-3 border-l pl-4 cursor-pointer transition-all duration-300 ease-out",
                      mobileDropdown === index
                        ? " opacity-100 translate-y-0 my-2"
                        : "max-h-0 opacity-0 -translate-y-2"
                    )}
                    style={{
                      transitionDelay: mobileDropdown === index ? `${colorIndex * 100 + 200}ms` : '0ms'
                    }}
                  >
                    <Checkbox
                      checked={filters.colors?.includes(color.name) || false}
                      id={color.name}
                      onClick={() => handleArrayFilterChange('colors', color.name)}
                      className=" size-5 cursor-pointer" />
                    <label
                      htmlFor={color.name}
                      className="text-black flex cursor-pointer w-full hover:text-black/60"
                    >
                      <span>
                        {color.name}
                        <span
                          style={{ backgroundColor: color.code }}
                          className={`h-6 rounded-full absolute right-1/3 w-6`} />
                      </span>
                    </label>
                  </h5>
                ))}
              </div>
            )}

            {/* Price */}
            {header.slug === "price" && (
              <div className="border-b px-4 relative overflow-hidden">
                <div className={clsx(
                  "flex flex-col gap-3 transition-all duration-300 ease-out",
                  mobileDropdown === index
                    ? "opacity-100 translate-y-0 my-2 pb-4"
                    : "max-h-0 opacity-0 -translate-y-2"
                )}>
                  <div className="w-full space-y-4">
                    {/* Min/Max Inputs */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col text-sm">
                        <label htmlFor="minPrice" className="text-gray-600">Min</label>
                        <Input
                          id="minPrice"
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          min={100}
                          placeholder="100"
                          value={localMinPrice.toString()}
                          onChange={handleMinPriceChange}
                        />
                      </div>

                      <div className="flex flex-col text-sm">
                        <label htmlFor="maxPrice" className="text-gray-600">Max</label>
                        <Input
                          id="maxPrice"
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          max={1000000000}
                          placeholder="1000000000"
                          value={localMaxPrice.toString()}
                          onChange={handleMaxPriceChange}
                        />
                      </div>
                    </div>

                    {/* Range Slider */}
                    <Slider
                      value={[localMinPrice, localMaxPrice]}
                      min={100}
                      max={1000000000}
                      step={1}
                      onValueChange={handleSliderChange}
                      minStepsBetweenThumbs={1}
                    />
                  </div>

                </div>
              </div>
            )}

            {/* Collection */}
            {header.slug === "collectionSlug" && (
              <div className="border-b relative overflow-hidden">
                {collections.map((collection, collectionIndex) => (
                  <h5
                    onClick={() => handleFilterChange('collectionSlug', collection.slug)}
                    key={collectionIndex}
                    className={clsx(
                      "flex items-center gap-4 text-base md:text-xl ml-3 border-l pl-4 cursor-pointer transition-all duration-300 ease-out",
                      mobileDropdown === index
                        ? " opacity-100 translate-y-0 my-2"
                        : "max-h-0 opacity-0 -translate-y-2"
                    )}
                    style={{
                      transitionDelay: mobileDropdown === index ? `${collectionIndex * 100 + 200}ms` : '0ms'
                    }}
                  >
                    {collection.name.charAt(0).toUpperCase() + collection.name.slice(1).toLowerCase()}
                  </h5>
                ))}
              </div>
            )}

            {/* discount */}
            {header.slug === "discount" && (
              <div className="border-b relative overflow-hidden" />
            )}
            {/* on sale */}
            {header.slug === "onlyInStock" && (
              <div className="border-b relative overflow-hidden" />
            )}
            {/* discount */}
            {header.slug === "isNew" && (
              <div className="border-b relative overflow-hidden" />
            )}

          </div>
        ))}

        <button
          onClick={resetAllFilters}
          disabled={Object.keys(filters).length === 0}
          className={`block disabled:opacity-30 w-full underline cursor-pointer hover:opacity-70 my-6 md:my-10 text-base md:text-xl text-center`}>
          Сбросить все фильтры
        </button>

      </div>
    </div>
  );
};
