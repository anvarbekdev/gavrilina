import { ProductSortByEnum } from "./enums";

export const PRODUCTS_QUERY_KEY = "products";

export const SORT_BY = [
  {
    value: ProductSortByEnum.PRICE,
    label: "Цена"
  },
  {
    value: ProductSortByEnum.CREATED_AT,
    label: "Дата"
  },
  {
    value: ProductSortByEnum.NEW,
    label: "Новинки"
  },
  {
    value: ProductSortByEnum.POPULAR,
    label: "Популярные"
  },
  {
    value: ProductSortByEnum.ASC,
    label: "По возрастанию"
  },
  {
    value: ProductSortByEnum.DESC,
    label: "По убыванию"
  },
]