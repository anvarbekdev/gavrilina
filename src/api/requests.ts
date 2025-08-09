import { api } from "@/lib/auth";
import { allProductsData } from "@/mock/data";
import { PaginatedProductResponse, ProductQueryParams, ProductType } from "@/types/type";

// PRODUCT
export async function getAllProducts(
  filters: ProductQueryParams = {}
): Promise<PaginatedProductResponse> {
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    gender,
    search,
    categorySlug,
    isNew,
    onlyInStock,
    sortBy,
    collectionSlug,
    sortOrder,
    limit = 12,
    page = 1
  } = filters;

  // Mahsulotlar
  let data = allProductsData.getAllProducts();

  // Filterlar
  if (categorySlug) {
    data = data.filter(p => p.categorySlug === categorySlug);
  }

  if (colors && colors.length > 0) {
    data = data.filter(p => p.colors.some(color => colors.includes(color.name)));
  }

  if (sizes && sizes.length > 0) {
    data = data.filter(p => p.sizes.some(size => sizes.includes(size.name)));
  }

  if (minPrice !== undefined) {
    data = data.filter(p => p.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    data = data.filter(p => p.price <= maxPrice);
  }

  if (gender) {
    data = data.filter(p => p.gender === gender);
  }

  if (collectionSlug) {
    data = data.filter(p => p.collectionSlug === collectionSlug);
  }

  if (isNew !== undefined) {
    data = data.filter(p => p.isNew === isNew);
  }

  if (onlyInStock) {
    data = data.filter(p => (p.stock?.quantity || 0) > 0);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    data = data.filter(p => p.name.toLowerCase().includes(searchLower));
  }

  // Sortlash
  if (sortBy) {
    data.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'price':
          compareValue = a.price - b.price;
          break;
        case 'createdAt':
          compareValue = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        default:
          compareValue = 0;
      }

      return sortOrder === 'desc' ? -compareValue : compareValue;
    });
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    total: data.length,
    page,
    limit
  };
}

export async function getProductBySlug({ slug }: { slug: string }) {
  return allProductsData.getAllProducts().find(product => product.slug === slug);
} 


// const { data } = await api.get<PaginatedProductResponse>('/api/courses', {
//   params,
// });


export async function createServicePage(data: ProductType) {
  const res = await api.post("/api/servicepage", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.data;
}
export async function updateServicePage(data: ProductType) {
  const res = await api.patch(`/api/servicepage`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.data;
}
export async function deleteServicePage(id: string) {
  const res = await api.delete(`/api/servicepage`, {
    headers: { "Content-Type": "application/json" },
    data: { _id: id },
  });

  return res.data;
}