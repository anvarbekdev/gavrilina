"use client"

import React, { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import '@/assets/css/ctg-slider.css';
import { CategoryType } from '@/types/type'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import LinkTo from '../ui/link-to'

const ResponsiveCtgSlider = ({ categories }: { categories: CategoryType[] }) => {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    axis: 'x',
    align: "center",
    loop: false,
    skipSnaps: true
  })

  const onScroll = useCallback(() => {
  }, [])

  useEffect(() => {
    if (!emblaMainApi) return

    emblaMainApi
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll)
  }, [emblaMainApi, onScroll])

  return (
    <div className="embla_task_card relative ">
      <button
        onClick={() => emblaMainApi?.scrollTo(isMobile ? emblaMainApi?.selectedScrollSnap() + 1 : emblaMainApi?.selectedScrollSnap() + 2)}
        className=" cursor-pointer absolute top-1/2 right-0 flex gap-4 z-40 transition-all duration-300 hover:opacity-70 items-center"
      >
        <ChevronRight className="h-12 w-12 p-4 md:h-16 md:w-16 md:p-5 bg-black text-white rounded-full" />
      </button>
      <div className="embla_task__viewport" ref={emblaMainRef}>
        <div className="embla_task__container gap-6">
          {categories.map((category, index) => (
            <div
              className={clsx(
                "embla_task__slide_card flex flex-col justify-between flex-none basis-full sm:basis-[66%] md:basis-[40%] xl:basis-[30%] 2xl:basis-[24%] px-3 md:px-6 py-8 ",
                index !== categories.length - 1 && "sm:border-r border-gray"
              )}
              key={index}>
              <div>
                <h3 className="uppercase line-clamp-2 mt-2">
                  {category.name}
                </h3>
                <h6 className="text-base my-3 line-clamp-2">
                  {category.summary}
                </h6>
              </div>
              {category.image && category.image.type === "image" ? <Image
                src={category.image?.url}
                alt={category.image?.name || "category"}
                width={400}
                height={400}
                className="max-h-[400px] object-contain"
              />
                : category.image && category.image.type === "video" &&
                <video
                  src={category.image?.url}
                  autoPlay loop
                  muted
                  className="w-full h-full object-cover" />
              }
              <LinkTo href={`/catalog/?categorySlug=${category.slug}`} className='mt-6' />
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}

export default ResponsiveCtgSlider