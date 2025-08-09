import { GenderEnum, ProductSortByEnum, SortOrderEnum, UserRole } from "./enums";

export interface UserAuth {
  userId: string
  role: UserRole
}

// Нужно реализовать API filter, query
export type CategoryType = {
  _id: string
  name: string
  slug: string
  level: 'category' | 'subcategory' | 'item'
  isActive: boolean
  type?: 'clothing' | 'accessory'
  parentId?: string | null
  summary?: string
  image?: FileType
  total?: number
  children?: CategoryType[]
}

type StockInfo = {
  inStock: boolean;
  quantity: number;
  restockDate?: Date;
};

type DiscountInfo = {
  amount: number;
  discountPercent: number;
  expiresAt?: Date;
  isClearance?: boolean;
};

// Нужно реализовать API
export type CollectionType = {
  _id: string
  name: string
  slug: string
  subtitle?: string
  sliders?: FileType[]
  isShowSection?: 'perfectCombination' | 'elegantCollection'
}

// Нужно реализовать API
export type ProductColor = {
  name: string;
  code: string;
  stock?: number;
  inStock?: boolean;
  label?: string
};

// Нужно реализовать API
export type ProductSize = {
  name: string;
  stock?: number;
  inStock?: boolean;
  label?: string
};

// Необходимо реализовать API getAllProducts(qeury filter all ProductQueryParams), getProductBySlug, filter
export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images: FileType[];
  price: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  createdAt: Date;
  categorySlug: string;
  categoryName?: string;
  collectionSlug?: string;
  collectionName?: string;
  discount?: DiscountInfo;
  stock?: StockInfo;
  isShowStockInSection?: boolean;
  gender?: GenderEnum;
  isNew?: boolean;
  onlyInStock?: boolean
  aboutProduct?: string;
  paymentAndReturn?: string;
  delivery?: string;

  oldPrice?: number;
  sku?: string;
  baseCpw?: number;
  defaultWearCountPerYear?: number;
  calculatedCpw?: number;

  cpwTextTemplate?: string; // "{cpw} ₽ C.P.W. x {defaultWearCountPerYear} выходов за год. Рассчитать"
  infoTooltipCpw?: string;
  wearCountLabel?: string; // "Сколько раз вы наденете айтем за год {defaultWearCountPerYear} раз"
  calculatedCpwLabel?: string; // "Ваш C.P.W. составит: {calculatedCpw}"

  installment?: string;
  installmentProvider?: string;
  infoTooltipInstallment?: string;

  giftAvailable?: boolean;
  giftHint?: string;
}

// Необходимо реализовать filter в API для работы с продуктами
export type ProductQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  categorySlug?: string;
  isShowSection?: 'perfectCombination' | 'elegantCollection';
  gender?: GenderEnum;
  isNew?: boolean;
  onlyInStock?: boolean;
  discount?: boolean;
  collectionSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  sortBy?: ProductSortByEnum;
  sortOrder?: SortOrderEnum;
};

// Результат по продукту api следующий
export type PaginatedProductResponse = {
  data: ProductType[];
  total: number;
  page: number;
  limit: number;
};



// ............... next
export type BlogType = {
  _id: string;
  title: string;
  image: FileType;
  createdAt: Date;
  topic: string;
  slug: string;
  content?: string
}

export type FileType = {
  _id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
  entityId: string;
  entityType: string;
  createdAt: Date;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  duration?: number
  storage?: string
}