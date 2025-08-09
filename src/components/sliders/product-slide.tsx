"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import clsx from 'clsx'
import { FileType } from '@/types/type'

const slides2 = [
  {
    _id: '1',
    url: '/images/product/new-1.png',
    name: 'product-1.png',
    size: 0,
    type: 'image',
    mimeType: 'image/png',
    entityId: '2',
    entityType: 'product',
  },
  {
    _id: '1',
    url: '/images/product/new-2.png',
    name: 'product-1.png',
    size: 0,
    type: 'image',
    mimeType: 'image/png',
    entityId: '2',
    entityType: 'product',
  },
  {
    _id: '2',
    url: '/images/product/new-3.png',
    name: 'product-2.png',
    size: 0,
    type: 'image',
    mimeType: 'image/png',
    entityId: '2',
    entityType: 'product',
  },
]

const ProductSlide = ({ slides }: { slides: FileType[] }) => {

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    axis: 'x',
    align: "center",
    loop: true
  })

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'y',
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className='flex max-w-xl max-h-[578px] xl:max-w-lg xl:max-h-[500px] 2xl:max-w-xl 2xl:max-h-[578px] wqhd:max-h-[60vh] overflow-hidden relative gap-x-2 md:gap-x-3'>

      {/* thumb */}
      <div className='relative hidden lg:block'>
        {slides.length > 5 && selectedIndex < slides.length - 2
          && <>
            <div className="absolute cursor-pointer hover:opacity-70 bottom-0 z-50 w-full h-50 bg-gradient-to-l sm:bg-gradient-to-t from-white/100 to-white/0 pointer-events-none " />

            <svg
              onClick={() => onThumbClick(selectedIndex + 1)}
              className='absolute bg-gray h-9 w-9 p-3 rounded-full top-1/3 sm:top-auto sm:bottom-5 cursor-pointer z-50 transform translate-x-1/1'
              width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13.0001L7 13.5001M7 13.5001L7 1.00012M7 13.5001L1 7.00012M7 13.5001L13 7.00012" stroke="#080808" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        }
        <div className="h-full relative" ref={emblaThumbsRef}>
          <div className="embla_task-thumbs__container relative w-full flex gap-x-2 xl:gap-1 sm:flex-col">
            {slides.map((_slide, index) => (
              <div key={index}>
                <button
                  onClick={() => onThumbClick(index)}
                  type="button"
                  className={clsx(
                    "relative bg-gray",
                    selectedIndex === index
                      ? "opacity-100"
                      : "opacity-30 !bg-line"
                  )}
                >
                  <Image
                    src={_slide.url}
                    alt={`slide-${index}`}
                    width={200}
                    height={200}
                    className="min-w-[120px] h-[120px] object-contain object-top"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* nav-line */}
      <div className="absolute flex lg:hidden bottom-10 left-0 right-0 justify-center gap-2 z-40 px-4">
        {slides.map((_, idx) => (
          <div
            key={`nav-${idx}`}
            data-hover-index={idx}
            onClick={() => emblaMainApi && onThumbClick(idx)}
            className="h-4 flex items-center transition-opacity duration-300 cursor-pointer"
            style={{
              width: `calc((100% - ${slides.length - 1} * 8px) / ${slides.length})`,
            }}
          >
            <div
              className={clsx(
                "rounded-full w-full h-1",
                emblaMainApi && emblaMainApi.selectedScrollSnap() === idx
                  ? "bg-graybold"
                  : "bg-line"
              )}
            />
          </div>
        ))}
      </div>

      {/* main */}
      <span className=" absolute  right-2 top-2 z-40 flex xl:hidden cursor-pointer hover:opacity-70 h-16 min-w-16 bg-white rounded-full items-center justify-center">
        <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.3307 8.81629C27.3307 10.8783 26.539 12.8588 25.1251 14.3239C21.8706 17.6973 18.7139 21.2151 15.3378 24.4663C14.5639 25.2007 13.3363 25.1739 12.5958 24.4063L2.86907 14.3239C-0.0709408 11.2763 -0.0709408 6.35631 2.86907 3.30876C5.83798 0.231266 10.6746 0.231266 13.6435 3.30876L13.9971 3.67523L14.3505 3.30897C15.7739 1.83267 17.7126 1 19.7378 1C21.763 1 23.7015 1.83259 25.1251 3.30876C26.5391 4.77393 27.3307 6.75436 27.3307 8.81629Z" stroke="#080808" strokeWidth="1.33333" strokeLinejoin="round" />
        </svg>
      </span>

      <div className="embla_task group h-full relative">
        <div className="embla_task__viewport" ref={emblaMainRef}>
          <div className="embla_task__container">
            {slides.map((_slide, index) => (
              <div className="embla_task__slide relative bg-gray" key={index}>
                <Image
                  src={_slide.url}
                  alt={`slide-${index}`}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover object-top "
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductSlide
