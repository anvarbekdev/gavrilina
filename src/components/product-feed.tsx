'use client'
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { colors } from "@/mock/data";
import clsx from "clsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ProductType } from "@/types/type";

export default function ProductFeed({ product }: { product: ProductType }) {
  const [selectedColor, setSelectedColor] = useState<null | string>(null);
  const [selectedSize, setSelectedSize] = useState<null | string>(null);

  return (
    <div className=" w-full  text-black">
      {/* Right Side Info */}
      <div className="flex flex-col gap-5 w-full text-black-thin">
        {/* Title */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl lg:text-[42px] lg:leading-[42px] font-normal uppercase" >
            {product?.name}
          </h2>

          {/* like btn */}
          <span className=" hidden xl:flex cursor-pointer hover:opacity-70 h-16 min-w-16 bg-gray rounded-full items-center justify-center">
            <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.3307 8.81629C27.3307 10.8783 26.539 12.8588 25.1251 14.3239C21.8706 17.6973 18.7139 21.2151 15.3378 24.4663C14.5639 25.2007 13.3363 25.1739 12.5958 24.4063L2.86907 14.3239C-0.0709408 11.2763 -0.0709408 6.35631 2.86907 3.30876C5.83798 0.231266 10.6746 0.231266 13.6435 3.30876L13.9971 3.67523L14.3505 3.30897C15.7739 1.83267 17.7126 1 19.7378 1C21.763 1 23.7015 1.83259 25.1251 3.30876C26.5391 4.77393 27.3307 6.75436 27.3307 8.81629Z" stroke="#080808" strokeWidth="1.33333" strokeLinejoin="round" />
            </svg>
          </span>

        </div>

        {/* Subtitle */}
        <div className="flex flex-wrap gap-2 text-lg border-b border-line pb-6 md:pb-8 justify-between items-center w-full mt-2">
          <p className=" uppercase" >
            {product?.categoryName || "Мужской костюм"}
          </p>
          <p className=" opacity-50" >
            {product?.sku}
          </p>
        </div>

        {/* Price + CPW */}
        <div className="flex flex-col mt-4 gap-1 pb-6 md:pb-8 border-b border-line">
          <p className="text-2xl">{product?.cpwTextTemplate}
            {product?.infoTooltipCpw && <Popover >
              <PopoverTrigger asChild>
                <svg className=" inline-block ml-2 cursor-pointer hover:opacity-70" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="14" fill="#F0EDEA" />
                  <path d="M14 13.4167V19.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 8.76168L14.0117 8.74872" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-base">{product.infoTooltipCpw}</p>
              </PopoverContent>
            </Popover>}
          </p>

          <div className="mt-4">
            <p className=" items-center gap-2">
              <span className="text-lg">{product?.wearCountLabel} раз</span>
              <span
                className="text-lg py-1 mx-2 border border-line rounded-full px-4"
              >
                {product?.defaultWearCountPerYear}
              </span>
              <span className="text-lg">раз</span>
            </p>
            <p className="text-lg">
              {product?.calculatedCpwLabel}
            </p>
          </div>

        </div>

        {/* Size */}
        <div className="mt-4 pb-6 md:pb-8">
          <p className="text-2xl mb-4 uppercase" >
            Размер:
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {product?.sizes?.map((size) => (
                size.inStock === false ? <Popover key={size.name} >
                  <PopoverTrigger
                    className={clsx(
                      "w-16 h-16 border cursor-not-allowed rounded-full flex items-center justify-center   transition text-sm",
                      selectedSize === size.name ? "border-black" : "border-line",
                      size.inStock === false && "opacity-40"
                    )}
                     asChild>
                    <span> {size.name}</span>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <p className="text-base">{size?.label || "Нет в продаже"}</p>
                  </PopoverContent>
                </Popover>
                  : <button
                    onClick={() => size.inStock && setSelectedSize(size.name)}
                    key={size.name}
                    className={clsx(
                      "w-16 h-16 border cursor-pointer rounded-full flex items-center justify-center transition text-sm",
                      selectedSize === size.name ? "border-black" : "border-line",
                    )}
                  >
                    {size.name
                    }
                  </button>
              ))}
            </div>
            <Link
              href={'#'}
              className="text-lg border-b border-line pb-1"
            >
              Таблица размеров
            </Link>
          </div>
        </div>

        {/* Color options */}
        <div className="pb-6 md:pb-8 border-b border-line">
          <p className="text-2xl mb-4 uppercase">Цвет:</p>
          <div className="flex flex-wrap gap-4">
            {product.colors.map(({ inStock, name, code, label }) => (
              inStock === false ? <Popover key={name} >
                <PopoverTrigger
                  
                  asChild>
                  <div
                    className={`w-16 h-16 opacity-40 rounded-full cursor-not-allowed flex items-center justify-center transition ${selectedColor !== code && code === "#ffffff"
                      ? 'border !border-line'
                      : code === selectedColor && "border !border-black"}`}
                    style={{
                      border: selectedColor === code ? '1px solid black' : '1px solid transparent',
                    }}
                  >
                    <div
                      className={`rounded-full border`}
                      style={{
                        width: (selectedColor === code || code === "#ffffff") ? '44px' : '100%',
                        height: (selectedColor === code || code === "#ffffff") ? '44px' : '100%',
                        backgroundColor: code,
                      }}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <p className="text-base">{label || "Нет в продаже"}</p>
                </PopoverContent>
              </Popover>
                : <div
                  key={name}
                  onClick={() => setSelectedColor(code)}
                  className={`w-16 h-16 rounded-full cursor-pointer flex items-center justify-center transition ${selectedColor !== code && code === "#ffffff"
                    ? 'border !border-line'
                    : code === selectedColor && "border !border-black"}`}
                  style={{
                    border: selectedColor === code ? '1px solid black' : '1px solid transparent',
                  }}
                >
                  <div
                    className={`rounded-full border`}
                    style={{
                      width: (selectedColor === code || code === "#ffffff") ? '44px' : '100%',
                      height: (selectedColor === code || code === "#ffffff") ? '44px' : '100%',
                      backgroundColor: code,
                    }}
                  />
                </div>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="flex justify-between items-center w-full flex-wrap gap-2">
          <div className="flex flex-wrap gap-4 items-center">
            <p className="text-[32px] lg:text-[42px] text-black">{product.price} ₽</p>
            <sup className="flex items-center text-2xl text-gray-400 ">
              <span className=" opacity-70 line-through">{product?.oldPrice} ₽</span>
              <span className="text-sm ml-2 text-black py-0.5 bg-gray px-1 rounded-full">
                -{product.discount?.discountPercent}%</span>
            </sup>
          </div>
          <div className="text-lg flex break-words items-center text-black ">

            {product?.installment} ₽ в рассрочку от {product?.installmentProvider}

            <Popover >
              <PopoverTrigger asChild>
                <svg className=" inline-block ml-2 cursor-pointer hover:opacity-70" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="14" fill="#F0EDEA" />
                  <path d="M14 13.4167V19.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 8.76168L14.0117 8.74872" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-base">{product?.infoTooltipInstallment}</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Add to cart button */}
        <button className="w-full text-lg py-4 cursor-pointer bg-black text-white rounded-full hover:opacity-70 transition">
          Добавить в корзину
        </button>

        <div className="flex flex-wrap lg:flex-nowrap gap-4 text-black">

          <button className="w-full text-xs sm:text-lg flex justify-center items-center gap-2 px-6 py-4 border border-line cursor-pointer rounded-full hover:opacity-70 transition">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.3307 14V25.0667C23.3307 25.398 23.0621 25.6667 22.7307 25.6667H5.26406C4.93269 25.6667 4.66406 25.398 4.66406 25.0667V14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25.0693 8.16663H2.93594C2.60457 8.16663 2.33594 8.43526 2.33594 8.76663V13.4C2.33594 13.7313 2.60457 14 2.93594 14H25.0693C25.4006 14 25.6693 13.7313 25.6693 13.4V8.76663C25.6693 8.43526 25.4006 8.16663 25.0693 8.16663Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 25.6666V8.16663" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.0026 8.16671H8.7526C7.97906 8.16671 7.23719 7.85942 6.69021 7.31244C6.14323 6.76545 5.83594 6.02359 5.83594 5.25004C5.83594 4.47649 6.14323 3.73463 6.69021 3.18765C7.23719 2.64066 7.97906 2.33337 8.7526 2.33337C12.8359 2.33337 14.0026 8.16671 14.0026 8.16671Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 8.16671H19.25C20.0235 8.16671 20.7654 7.85942 21.3124 7.31244C21.8594 6.76545 22.1667 6.02359 22.1667 5.25004C22.1667 4.47649 21.8594 3.73463 21.3124 3.18765C20.7654 2.64066 20.0235 2.33337 19.25 2.33337C15.1667 2.33337 14 8.16671 14 8.16671Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            Хотите подарок? Можем намекнуть
          </button>

          <button className="w-full flex justify-center items-center gap-2 px-6 text-xs sm:text-lg py-4 border border-line cursor-pointer rounded-full hover:opacity-70 transition">
            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5086 27.5621C11.9677 27.5621 9.46305 26.8492 7.31191 25.5041L2.10522 27.4494C1.80423 27.5618 1.46527 27.4882 1.2381 27.261C1.01087 27.0338 0.937264 26.6948 1.0497 26.3938L2.99499 21.1871C1.43093 18.6859 0.721905 15.7059 0.994686 12.7473C1.28437 9.60542 2.67452 6.64448 4.90905 4.40995C7.47072 1.84827 10.8765 0.4375 14.4991 0.4375C18.1216 0.4375 21.5274 1.84827 24.0891 4.41C26.6508 6.97167 28.0616 10.3775 28.0616 14.0001C28.0616 17.6226 26.6508 21.0284 24.0891 23.5901C21.8549 25.8251 18.8939 27.2155 15.7517 27.505C15.3375 27.5432 14.9223 27.5621 14.5086 27.5621V27.5621ZM7.41133 23.7709C7.57201 23.7709 7.73137 23.818 7.8683 23.9099C9.87987 25.2591 12.1882 25.9188 14.4847 25.9189C17.5665 25.9191 20.6278 24.7319 22.9289 22.43C27.5773 17.7816 27.5773 10.2183 22.929 5.57003C18.2807 0.921758 10.7174 0.921758 6.06908 5.57003C2.05234 9.58677 1.42989 15.9207 4.58908 20.6307C4.7363 20.8503 4.76872 21.1272 4.67625 21.3748L3.21609 25.2829L7.12423 23.8227C7.2173 23.788 7.31454 23.7708 7.41128 23.7708L7.41133 23.7709ZM17.6971 21.3339C15.6293 21.3339 13.0297 19.6883 10.9206 17.5792C7.9773 14.6359 5.93658 10.7367 8.01257 8.6607L9.49739 7.17429C10.1702 6.50158 11.2643 6.50152 11.9367 7.17402L13.943 9.18181C14.2679 9.50671 14.4469 9.93956 14.4469 10.4004C14.4469 10.8612 14.2679 11.294 13.9427 11.6191L13.1994 12.3637C13.3449 12.657 13.7427 13.2467 14.498 14.002C15.2528 14.7568 15.8422 15.1546 16.1357 15.3005L16.8799 14.5563C17.5519 13.8843 18.6454 13.8843 19.3174 14.5563L21.325 16.5639C21.6501 16.889 21.8292 17.3218 21.8292 17.7827C21.8292 18.2435 21.6502 18.6763 21.325 19.0014L19.8383 20.4881C19.25 21.0764 18.5151 21.334 17.6971 21.334V21.3339ZM10.7174 8.31031C10.6955 8.31031 10.6737 8.31824 10.6579 8.3341L9.17304 9.82051C8.54944 10.4441 8.84114 11.5706 9.19557 12.4059C9.7239 13.6511 10.7755 15.1138 12.0808 16.4191C14.7461 19.0844 17.6441 20.3621 18.6783 19.3279L20.165 17.8412C20.1807 17.8255 20.1887 17.8058 20.1887 17.7826C20.1887 17.7594 20.1807 17.7397 20.165 17.724L18.1575 15.7164C18.1257 15.6846 18.072 15.6846 18.0401 15.7164L17.0743 16.6822C16.901 16.8556 16.5134 17.1206 15.8658 16.9471C14.4991 16.5809 11.9197 14.0015 11.5535 12.6347C11.3797 11.9864 11.645 11.5985 11.8185 11.4249L12.7823 10.4595C12.7985 10.4433 12.8064 10.4237 12.8064 10.4004C12.8064 10.3772 12.7984 10.3575 12.7827 10.3417L10.7765 8.33394C10.7608 8.31824 10.7391 8.31031 10.7174 8.31031Z" fill="#080808" />
            </svg>
            Задать вопрос
          </button>
        </div>

        <Tabs defaultValue="aboutProduct">
          <TabsList className={clsx(
            "w-full flex my-6 gap-x-10 min-[200px]:pl-67 min-[400px]:pl-42 sm:pl-0  overflow-auto scrollbar-none",

          )}>

            <TabsTrigger className="font-normal text-2xl" value="aboutProduct">О товаре</TabsTrigger>
            <TabsTrigger className="font-normal text-2xl" value="paymentAndReturn">Оплата и возврат</TabsTrigger>
            <TabsTrigger className="font-normal text-2xl" value="delivery">Доставка</TabsTrigger>
          </TabsList>
          <TabsContent value="aboutProduct">
            <div>
              <h2>О товаре</h2>
            </div>
          </TabsContent>
          <TabsContent value="paymentAndReturn">
            <div>
              <h2>Оплата и возврат</h2>
            </div>
          </TabsContent>
          <TabsContent value="delivery">
            <div>
              <h2>Доставка</h2>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
