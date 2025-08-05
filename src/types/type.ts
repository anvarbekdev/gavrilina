
export type CategoryType = {
  _id: string;
  category: string;
  summary: string;
  image: string;
  href: string;
  total?: string;
  isNew?: boolean;
}

export type ProductType = {
  _id: string;
  name: string;
  category: string;
  sizes: string[];
  images: File[];
  price: number;
  isNew?: boolean;
  isBig?: boolean;
}

export type File = {
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