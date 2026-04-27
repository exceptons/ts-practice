export type OrderStatus = 'draft' | 'paid' | 'shipped'

export type OrderLoadMode = 'success' | 'api-error' | 'network-error'

export type Order = {
  id: number
  customerName: string
  status: OrderStatus
  total: number
}

export type ApiResponse<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      error: string
    }

const orders: Order[] = [
  {
    id: 1001,
    customerName: 'Kota',
    status: 'paid',
    total: 12800,
  },
  {
    id: 1002,
    customerName: 'Mika',
    status: 'draft',
    total: 6400,
  },
  {
    id: 1003,
    customerName: 'Ren',
    status: 'shipped',
    total: 18400,
  },
]

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

export const fetchOrders = async (): Promise<ApiResponse<Order[]>> => {
  await wait(300)

  return {
    ok: true,
    data: orders,
  }
}

export const fetchOrdersByMode = async (
  mode: OrderLoadMode,
): Promise<ApiResponse<Order[]>> => {
  await wait(300)

  if (mode === 'api-error') {
    return {
      ok: false,
      error: 'The order API returned an error response.',
    }
  }

  if (mode === 'network-error') {
    throw new Error('Network connection failed while loading orders.')
  }

  return {
    ok: true,
    data: orders,
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown error occurred.'
}

export const getOrderTotal = (items: Order[]): number =>
  items.reduce((total, order) => total + order.total, 0)

export const formatOrderStatus = (status: OrderStatus): string => {
  switch (status) {
    case 'draft':
      return 'Draft'
    case 'paid':
      return 'Paid'
    case 'shipped':
      return 'Shipped'
  }
}
