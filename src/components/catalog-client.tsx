"use client"

import { useEffect, useState } from "react";
import ProductsCard from "./cards/products-card"
import { ProductQueryParams } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/requests";
import { PRODUCTS_QUERY_KEY, SORT_BY } from "@/types/constants";
import { useMediaQuery } from "react-responsive";
import { FilterSidebar } from "./sidebars/filter-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { categories, colors } from "@/mock/data";

const parseFiltersFromSearchParams = (searchParams: URLSearchParams): ProductQueryParams => {
  const filters: ProductQueryParams = {};

  searchParams.forEach((value, key) => {
    switch (key) {
      case "page":
      case "limit":
      case "minPrice":
      case "maxPrice":
        filters[key] = Number(value);
        break;

      case "isNew":
      case "discount":
      case "onlyInStock":
        filters[key] = value === "true";
        break;

      case "sizes":
        filters.sizes = value.split(",");
        break;

      case "colors":
        filters.colors = value.split(",");
        break;

      case "categorySlug":
      case "collectionSlug":
      case "gender":
      case "sortBy":
      case "sortOrder":
      case "search":
        (filters as any)[key] = value;
        break;

      default:
        break;
    }
  });

  if (!filters.page) filters.page = 1;
  if (!filters.limit) filters.limit = 12;

  return filters;
};

export const CatalogClient = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const filtersFromParams = parseFiltersFromSearchParams(searchParams);
  const [filters, setFilters] = useState<ProductQueryParams>(filtersFromParams);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { data: products, isLoading } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, filters],
    queryFn: () => getAllProducts(filters),
    staleTime: 1000 * 60 * 5,
    retry: 3,
    placeholderData: (previousData) => previousData,
  });

  const title = categories.find(category => category.slug === filters.categorySlug)?.name || "Каталог";

  useEffect(() => {
    const cleanedQuery = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.join(',') : String(v),
      ])
    );

    replace(`/catalog?${new URLSearchParams(cleanedQuery).toString()}`);
  }, [filters]);

  if (isLoading || !products) return <div>Loading...</div>;

  const totalPages = Math.ceil(products.total / products.limit);

  return (
    <>
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <h1 className="flex my-2 text-2xl md:text-4xl lg:text-5xl xl:text-[56px] items-start gap-2">
        {title}
        <span className="h-8 w-8 inline-flex items-center justify-center bg-gray rounded-full">
          <span className="text-base">{products.total}</span>
        </span>
      </h1>

      <div className="my-6 flex flex-col items-start lg:flex-row lg:items-center justify-between">
        {/* filters */}
        <div className="flex flex-col  w-full lg:flex-row lg:items-center gap-3 text-sm md:text-base lg:text-lg">

          {/* btn */}
          <span
            onClick={() => setIsSidebarOpen(true)}
            className="py-1.5 cursor-pointer w-full lg:w-auto hover:opacity-70 transition-all duration-300 px-6 bg-black rounded-full inline-flex items-center justify-center gap-2 text-white">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.99961 1H17.9997C18.552 1 18.9997 1.44764 18.9997 1.99987L18.9999 3.58569C19 3.85097 18.8946 4.10538 18.707 4.29295L12.2925 10.7071C12.105 10.8946 11.9996 11.149 11.9996 11.4142L11.9996 17.7192C11.9996 18.3698 11.3882 18.8472 10.7571 18.6894L8.75707 18.1894C8.3119 18.0781 7.99961 17.6781 7.99961 17.2192L7.99961 11.4142C7.99961 11.149 7.89425 10.8946 7.70672 10.7071L1.2925 4.29289C1.10496 4.10536 0.999607 3.851 0.999607 3.58579V2C0.999607 1.44772 1.44732 1 1.99961 1Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Фильтры
          </span>

          {/* size and color */}
          <div className="flex flex-wrap gap-2">
            {/* size */}
            {filters.sizes && filters.sizes.length > 0 && <span className="py-1.5 transition-all duration-300 px-6 bg-gray rounded-full inline-flex items-center gap-2 text-gray-text">
              Размер:
              <span>{filters.sizes.join(", ")}</span>
              <svg
                onClick={() => setFilters({ ...filters, sizes: [] })}
                className="cursor-pointer ml-1 hover:opacity-70" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.64">
                  <path d="M2 2L14 14" stroke="black" />
                  <path d="M14 2L2 14" stroke="black" />
                </g>
              </svg>
            </span>}

            {/* color */}
            {filters.colors && filters.colors.length > 0
              && <span className="py-1.5 transition-all duration-300 px-6 bg-gray rounded-full flex items-center gap-2 text-gray-text">
                Цвет:
                <span className=" line-clamp-1">
                  {filters.colors?.map((colorValue) => {
                    const color = colors.find((c) => c.name === colorValue);
                    if (!color) return null;
                    return (
                      <span className="mx-1 text-black inline-flex py-0.5 px-2 rounded-md" key={color.name} style={{ backgroundColor: color.code }}>
                        {color.name}
                      </span>
                    );
                  })}
                </span>
                <svg
                  onClick={() => setFilters({ ...filters, colors: [] })}
                  className="cursor-pointer min-w-fit ml-1 hover:opacity-70" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.64">
                    <path d="M2 2L14 14" stroke="black" />
                    <path d="M14 2L2 14" stroke="black" />
                  </g>
                </svg>
              </span>}
          </div>

          {/* clear */}
          {Object.keys(filters).length !== 0 && <span
            onClick={() => {
              setFilters({
                limit: 12,
                page: 1,
              });
              replace("/catalog");
            }}
            className="text-black min-w-fit hidden lg:block md:ml-4 underline cursor-pointer hover:opacity-70">
            Очистить все
          </span>}

        </div>

        {/* sort */}
        <Popover>
          <PopoverTrigger className="inline-flex min-w-50 mt-8 lg:mt-0 text-sm md:text-base lg:text-lg items-center justify-start md:justify-end gap-2 cursor-pointer hover:opacity-70">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 10L2 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 14H2" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 18H2" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 6L2 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 10V20M19 20L22 17M19 20L16 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {SORT_BY.find((sort) => sort.value === filters.sortBy)?.label}
          </PopoverTrigger>
          <PopoverContent className="max-w-50">
            <div className="flex flex-col">
              {SORT_BY.map((sort) => (
                <PopoverClose
                  key={sort.label}
                  onClick={() => {
                    setFilters((prev: any) => ({ ...prev, sortBy: sort.value }));
                  }}
                  className="cursor-pointer py-1 hover:opacity-70">
                  {sort.label}
                </PopoverClose>
              ))}

            </div>
          </PopoverContent>
        </Popover>

      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
        {products && products.data.length > 0 ? (
          <ProductsCard products={products.data} />
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            Товары не найдены
          </div>
        )}
      </div>


      {totalPages > 1 && (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-10">
          <div className="md:col-span-12 text-center">
            <nav>
              <ul className="inline-flex items-center -space-x-px">

                {/* Prev */}
                <li>
                  <button
                    onClick={() => {
                      setFilters((prev: any) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
                      setTimeout(() => {
                        (document.documentElement || document.body).scrollTo({ top: isMobile ? 270 : 100, behavior: 'smooth' });
                      }, 50);
                    }}
                    disabled={filters.page === 1}
                    className="bg-gray cursor-pointer hover:opacity-70 h-16 w-16 inline-flex justify-center items-center mx-3 rounded-full disabled:opacity-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 7.33203H1M1 7.33203H13.5M1 7.33203L7.5 1.33203M1 7.33203L7.5 13.332" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </button>
                </li>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p}>
                    <button
                      onClick={() => {
                        setFilters((prev) => ({ ...prev, page: p }))
                        setTimeout(() => {
                          (document.documentElement || document.body).scrollTo({ top: isMobile ? 270 : 100, behavior: 'smooth' });
                        }, 50);
                      }}
                      className={`size-8 cursor-pointer hover:border inline-flex justify-center items-center mx-1 rounded-full ${filters.page === p
                        ? 'border border-b-gray-line text-black'
                        : 'text-gray-text'
                        }`}
                    >
                      {p}
                    </button>
                  </li>
                ))}

                {/* Next */}
                <li>
                  <button
                    onClick={() => {
                      setFilters((prev: any) => ({ ...prev, page: Math.min(prev.page + 1, totalPages) }))
                      setTimeout(() => {
                        (document.documentElement || document.body).scrollTo({ top: isMobile ? 270 : 100, behavior: 'smooth' });
                      }, 50);
                    }}
                    disabled={filters.page === totalPages}
                    className="bg-gray cursor-pointer hover:opacity-70 h-16 w-16 inline-flex justify-center items-center mx-3 rounded-full disabled:opacity-50"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 7.33203H13M13 7.33203H0.5M13 7.33203L6.5 1.33203M13 7.33203L6.5 13.332" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </button>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}