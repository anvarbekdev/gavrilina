import { categories } from "@/mock/data";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";

const services = [
  {
    title: "Оплата",
    link: "#footer",
  },
  {
    title: "Доставка",
    link: "#footer",
  },
  {
    title: "Обмен и возврат",
    link: "#footer",
  },
  {
    title: "Гарантия и уход",
    link: "#footer",
  },
  {
    title: "Акции",
    link: "#footer",
  },
]

const users = [
  {
    title: "Блог",
    link: "#footer",
  },
  {
    title: "Контакты",
    link: "#footer",
  }
]


export function Footer() {

  return (
    <footer
      className="container mx-auto px-4 md:px-6 scroll-mt-30 md:scroll-mt-40 mt-20 md:mt-50"
      id='footer'
    >
      <div className=" flex justify-center">
        <Image
          src="/images/ui/footer.png"
          alt="footer"
          width={1000}
          height={400}
        />
      </div>
      <div className="flex flex-col justify-between lg:flex-row gap-5 mt-10 lg:mt-30">

        {/* cases */}
        <div>
          <h4 className="text-black hover:opacity-70">
            <Link href={'/catalog'}>Каталог</Link>
          </h4>

          <ul className="pt-2">
            {categories.map((key) => (
              <li key={key.name} className="py-1 hover:opacity-70 text-graybold text-base md:text-xl lg:text-2xl">
                <Link href={`/catalog/?slug=${key.slug}`}>
                  {key.name.charAt(0).toUpperCase() + key.name.slice(1).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* services */}
        <div>
          <h4 className="text-black hover:opacity-70">
            <Link href={'#footer'}>Покупателям</Link>
          </h4>

          <ul className="pt-2">
            {services.map((service) => (
              <li key={service.title} className="py-1 hover:opacity-70 text-graybold text-base md:text-xl lg:text-2xl">
                <Link href={service.link}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* users */}
        <div>
          <h4 className="text-black hover:opacity-70">
            <Link href={'#footer'}>О бренде</Link>
          </h4>

          <ul className="pt-2">
            {users.map((service) => (
              <li key={service.title} className="py-1 hover:opacity-70 text-graybold text-base md:text-xl lg:text-2xl">
                <Link href={service.link}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contacts */}
        <div className="flex flex-col max-w-lg justify-between gap-8">
          <div>
            <p className="text-2xl">
              Подпишитесь на рассылку и узнайте
              о новых изделиях или статьях первыми
            </p>

            <form action="#" className="flex items-center gap-3 mt-6">
              <Input
                type="email"
                placeholder="Ivanova@mail.ru"
                className="px-4 !text-base !py-4 h-full rounded-full w-full"
              />
              <button
                type="submit"
                className="cursor-pointer hover:opacity-60"
              >
                <div className="h-16 min-w-16 flex items-center justify-center  p-5 bg-gray text-black rounded-full" >
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center gap-4">
              {/* tg */}
              <Link href={"#"}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 47.25C11.1799 47.25 0.75 36.8201 0.75 24C0.75 11.1799 11.1799 0.75 24 0.75C36.8201 0.75 47.25 11.1799 47.25 24C47.25 36.8201 36.8201 47.25 24 47.25ZM24 3.5625C12.7307 3.5625 3.5625 12.7307 3.5625 24C3.5625 35.2693 12.7307 44.4375 24 44.4375C35.2693 44.4375 44.4375 35.2693 44.4375 24C44.4375 12.7307 35.2693 3.5625 24 3.5625ZM25.2863 38.1245C25.2822 38.1245 25.2782 38.1245 25.2741 38.1245C24.6719 38.1193 24.1398 37.7312 23.9509 37.1594L20.6546 27.1808L10.6788 23.8871C10.1068 23.6983 9.71869 23.1663 9.71344 22.5639C9.70819 21.9616 10.0871 21.423 10.6557 21.2243L32.4331 13.6134C32.9431 13.4352 33.5096 13.5648 33.8914 13.9466C34.2732 14.3285 34.4027 14.8952 34.2246 15.4049L26.6138 37.1823C26.4164 37.7469 25.8836 38.1246 25.2863 38.1246L25.2863 38.1245ZM15.4903 22.5138L22.2086 24.732C22.6315 24.8716 22.9633 25.2034 23.1031 25.6263L25.3237 32.3484L30.6069 17.2309L15.4903 22.5138Z" fill="#080808" />
                </svg>
              </Link>

              {/* whatsapp */}
              <Link href={"#"}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.0162 47.2493C19.6603 47.2493 15.3667 46.0272 11.679 43.7213L2.75328 47.056C2.23728 47.2488 1.65622 47.1226 1.26678 46.7331C0.877248 46.3436 0.75106 45.7626 0.94381 45.2466L4.27859 36.3208C1.59734 32.033 0.381873 26.9244 0.849498 21.8525C1.34609 16.4664 3.72922 11.3905 7.55984 7.55991C11.9513 3.16847 17.7897 0.75 23.9998 0.75C30.2099 0.75 36.0485 3.16847 40.4399 7.56C44.8314 11.9514 47.2499 17.79 47.2499 24.0001C47.2499 30.2102 44.8315 36.0487 40.4399 40.4401C36.6098 44.2717 31.5338 46.6552 26.1473 47.1515C25.4371 47.2169 24.7254 47.2493 24.0162 47.2493V47.2493ZM11.8495 40.7501C12.1249 40.7501 12.3981 40.8309 12.6328 40.9884C16.0812 43.3013 20.0383 44.4322 23.9753 44.4324C29.2584 44.4328 34.5063 42.3975 38.451 38.4515C46.4197 30.4827 46.4197 17.5171 38.4512 9.54863C30.4827 1.58016 17.517 1.58016 9.54847 9.54863C2.66262 16.4345 1.59556 27.2927 7.01131 35.367C7.26369 35.7433 7.31928 36.2181 7.16075 36.6425L4.65762 43.3421L11.3573 40.839C11.5168 40.7794 11.6835 40.75 11.8494 40.75L11.8495 40.7501ZM29.4823 36.5723C25.9374 36.5723 21.481 33.7513 17.8654 30.1357C12.8197 25.09 9.32131 18.4058 12.8802 14.8469L15.4256 12.2988C16.5789 11.1456 18.4545 11.1455 19.6073 12.2983L23.0466 15.7402C23.6036 16.2972 23.9105 17.0393 23.9105 17.8292C23.9105 18.6191 23.6036 19.3611 23.0461 19.9185L21.7719 21.1949C22.0213 21.6977 22.7032 22.7086 23.9981 24.0035C25.2919 25.2973 26.3023 25.9793 26.8056 26.2295L28.0813 24.9537C29.2333 23.8017 31.1079 23.8017 32.2599 24.9537L35.7014 28.3953C36.2588 28.9526 36.5658 29.6946 36.5658 30.4846C36.5658 31.2746 36.2589 32.0165 35.7014 32.5739L33.1528 35.1225C32.1444 36.131 30.8846 36.5725 29.4823 36.5725V36.5723ZM17.5169 14.2463C17.4795 14.2463 17.4421 14.2598 17.4149 14.287L14.8695 16.8352C13.8005 17.9041 14.3006 19.8353 14.9082 21.2673C15.8139 23.4019 17.6167 25.9094 19.8543 28.147C24.4234 32.7161 29.3914 34.9064 31.1643 33.1336L33.7129 30.585C33.7398 30.558 33.7535 30.5243 33.7535 30.4845C33.7535 30.4447 33.7398 30.4109 33.7129 30.384L30.2714 26.9424C30.217 26.888 30.1248 26.888 30.0703 26.9424L28.4146 28.5981C28.1175 28.8953 27.4529 29.3497 26.3428 29.0521C23.9998 28.4243 19.578 24.0025 18.9503 21.6594C18.6524 20.5481 19.1071 19.8831 19.4047 19.5855L21.0568 17.9306C21.0846 17.9029 21.0982 17.8691 21.0982 17.8293C21.0982 17.7894 21.0845 17.7557 21.0576 17.7287L17.6183 14.2867C17.5914 14.2598 17.5542 14.2463 17.5169 14.2463Z" fill="#080808" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link href={"#"}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.0068 0H12.9931C5.8286 0 0 5.8286 0 12.9931V35.0071C0 42.1713 5.8286 47.9999 12.9931 47.9999H35.0071C42.1713 47.9999 47.9999 42.1713 47.9999 35.0071V12.9931C47.9999 5.8286 42.1713 0 35.0068 0ZM45.1859 35.0071C45.1859 40.6197 40.6197 45.1859 35.0068 45.1859H12.9931C7.38023 45.1859 2.81396 40.6197 2.81396 35.0071V12.9931C2.81396 7.38023 7.38023 2.81396 12.9931 2.81396H35.0071C40.6197 2.81396 45.1859 7.38023 45.1859 12.9931V35.0071Z" fill="#080808" />
                  <path d="M24 10.875C16.7629 10.875 10.8754 16.7626 10.8754 23.9996C10.8754 31.2367 16.7629 37.1242 24 37.1242C31.237 37.1242 37.1246 31.2367 37.1246 23.9996C37.1246 16.7626 31.237 10.875 24 10.875ZM24 34.3103C18.3149 34.3103 13.6893 29.685 13.6893 23.9996C13.6893 18.3146 18.3149 13.689 24 13.689C29.6854 13.689 34.3106 18.3146 34.3106 23.9996C34.3106 29.685 29.6854 34.3103 24 34.3103Z" fill="#080808" />
                  <path d="M37.4377 6.21387C35.2991 6.21387 33.5596 7.95373 33.5596 10.092C33.5596 12.2307 35.2991 13.9706 37.4377 13.9706C39.5764 13.9706 41.3163 12.2307 41.3163 10.092C41.3163 7.95337 39.5764 6.21387 37.4377 6.21387ZM37.4377 11.1562C36.8511 11.1562 36.3735 10.6787 36.3735 10.092C36.3735 9.505 36.8511 9.02783 37.4377 9.02783C38.0248 9.02783 38.5023 9.505 38.5023 10.092C38.5023 10.6787 38.0248 11.1562 37.4377 11.1562Z" fill="#080808" />
                </svg>
              </Link>


            </div>
            <p className="text-sm mt-2 text-graybold">*Запрещенная в РФ организация</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col lg:flex-row justify-between border-t !border-line pt-6 my-6 lg:items-center  text-graybold">
        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-2">
          <Link aria-label="role" href="#" className="text-base">Политика конфедециальности</Link>
          <Link aria-label="cookie" href="#" className="text-base">Политика Cookie</Link>
          <Link aria-label="cookie" href="#" className="text-base">Публичная офферта</Link>
        </div>
        <p className="my-2 text-base">© 2025 Gavrilina Nat. Все права защищены</p>
      </div>

    </footer>
  )
}