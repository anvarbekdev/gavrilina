"use client"

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

import Image from 'next/image'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'

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
        className="embla_horizontal bg-gray-bg"
      >
        <div ref={emblaRef} className=' overflow-hidden'>
          <div className={`flex`}>
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
                              ? "scale-60 blur-[4px] translate-x-15 duration-1000"
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
