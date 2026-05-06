export type ProductCategory = 'book' | 'tool' | 'course'

export type Product = {
  sku: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  isPublished: boolean
}

export type ProductUpdate = Partial<
  Pick<Product, 'name' | 'price' | 'stock' | 'isPublished'>
>

export type CategoryCounts = Record<ProductCategory, number>

export const sampleProducts: Product[] = [
  {
    sku: 'TS-BOOK',
    name: 'TypeScript Basics',
    category: 'book',
    price: 2800,
    stock: 12,
    isPublished: true,
  },
  {
    sku: 'API-COURSE',
    name: 'Typed API Practice',
    category: 'course',
    price: 9800,
    stock: 6,
    isPublished: true,
  },
  {
    sku: 'LINT-TOOL',
    name: 'Lint Setup Kit',
    category: 'tool',
    price: 3600,
    stock: 0,
    isPublished: false,
  },
]

export const getPublishedProducts = (products: Product[]): Product[] =>
  products.filter((product) => product.isPublished)

export const getProductNames = (products: Product[]): string[] =>
  products.map((product) => product.name)

export const findProductBySku = (
  products: Product[],
  sku: string,
): Product | undefined => products.find((product) => product.sku === sku)

export const getCategoryCounts = (products: Product[]): CategoryCounts =>
  products.reduce<CategoryCounts>(
    (counts, product) => ({
      ...counts,
      [product.category]: counts[product.category] + 1,
    }),
    {
      book: 0,
      tool: 0,
      course: 0,
    },
  )

export const applyProductUpdate = (
  product: Product,
  update: ProductUpdate,
): Product => ({
  ...product,
  ...update,
})
