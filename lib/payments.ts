export type Payment = {
  id: string
  customer: string
  phone: string
  deviceId: string
  method: 'KBZ Pay' | 'Wave Money' | 'AYA Pay'
  amount: number
  transactionId: string
  receiptUrl?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

const KEY = 'oak-payment-monitor'

export function getPayments(): Payment[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function savePayment(payment: Payment) {
  const next = [payment, ...getPayments()]
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function updatePayment(id: string, status: Payment['status']) {
  const next = getPayments().map(p => p.id === id ? {...p, status} : p)
  localStorage.setItem(KEY, JSON.stringify(next))
}
