"use client"

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import Image from 'next/image'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { ChevronRight } from 'lucide-react'

const data = [
  "/images/product/slider.png",
  "/images/product/slider.png",
  "/images/product/slider.png",
  "/images/product/slider.png",
  "/images/product/slider.png",
]

export function CombinationSlider() {

  const [selectedIndex, setSelectedIndex] = useState(0)
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      align: isMobile ? "center" : "end",
      loop: true,
      startIndex: 0
    }
  )
  const getRelativeIndexRTL = (from: number, to: number, length: number): number => {
    return (from - to + length) % length;
  };

  const isInSequence = (itemIndex: number, baseIndex: number, offset: number): boolean => {
    return getRelativeIndexRTL(baseIndex, itemIndex, data.length) === offset;
  };

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)

    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div
      className="embla_horizontal relative lg:px-10 bg-gray-bg min-w-full xl:min-w-[50%] 2xl:min-w-[60%]"
    >
      <h3 className=" uppercase gap-2 flex items-center absolute top-6 left-4 cursor-pointer hover:text-black/70 ">
        Идеальные <br className='sm:hidden' /> сочетания
        <span className="bg-white inline-flex justify-center text-black h-6 w-6 text-xs rounded-full">
          <span className="p-1">16</span>
        </span>
      </h3>
      <h2 className="uppercase xl:text-[56px] absolute bottom-6 left-4 cursor-pointer hover:text-black/70">
        Коллекция <br className='hidden md:block' />
        «Янь»
      </h2>
      <button
        onClick={() => emblaApi?.scrollTo(emblaApi?.selectedScrollSnap() - 1)}
        className=" cursor-pointer absolute top-1/2 right-6 flex gap-4 z-40 transition-all duration-300 hover:opacity-70 items-center"
      >
        <ChevronRight className="h-12 w-12 p-4 md:h-16 md:w-16 md:p-5 bg-black text-white rounded-full" />
      </button>
      <div ref={emblaRef} className=' overflow-hidden'>
        <div className={`flex mr-10`}>
          {data.map((img, index) => {
            const isActive = index === selectedIndex;
            const isActiveAfter = isInSequence(index, selectedIndex, 1);
            const isActiveAfterNext = isInSequence(index, selectedIndex, 2);
            const isActiveAfterNextPlus = isInSequence(index, selectedIndex, 3);

            return (
              <div
                key={index}
                className={clsx(
                  "embla__slide_horizontal pt-30 pb-52 relative ",
                )}
              >
                <button
                  onClick={() => emblaApi && emblaApi.scrollTo(index)}
                  className={clsx(
                    " p-2 transition-all duration-500 md:duration-initial",
                    isActive
                      ? "scale-200 duration-300"
                      : isActiveAfter
                        ? "scale-140 blur-[.4px] duration-500"
                        : isActiveAfterNext
                          ? "scale-100 blur-[2px] translate-x-5 duration-700"
                          : isActiveAfterNextPlus
                            ? "scale-60 blur-[4px] translate-x-25 duration-1000"
                            : "scale-40 blur-[6px] translate-x-35 opacity-65"
                  )}
                >
                  <Image
                    src={img}
                    alt={`slide-${index}`}
                    width={500}
                    height={500}
                    className=" h-auto object-cover"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>


  )
}
