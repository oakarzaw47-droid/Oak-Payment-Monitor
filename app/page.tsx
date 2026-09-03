'use client'

import { FormEvent, useState } from 'react'
import { Payment, savePayment, getPayments } from '@/lib/payments'

export default function Home() {
  const [form, setForm] = useState({customer:'',phone:'',method:'KBZ Pay',amount:'',transactionId:''})
  const [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.customer || !form.phone || !form.amount || !form.transactionId) return
    const old = getPayments()
    if (old.some(p => p.transactionId.toLowerCase() === form.transactionId.trim().toLowerCase())) {
      alert('ဒီ Transaction ID ကို အသုံးပြုပြီးသားပါ။')
      return
    }
    const payment: Payment = {id: crypto.randomUUID(), customer:form.customer, phone:form.phone, deviceId:navigator.userAgent.slice(0,120), method:form.method as Payment['method'], amount:Number(form.amount), transactionId:form.transactionId.trim(), status:'PENDING', createdAt:new Date().toISOString()}
    savePayment(payment); setDone(true)
  }
  return <main className="page"><section className="card hero"><div className="brand">OAK PAYMENT</div><h1>Premium Payment</h1><p>KBZ Pay / Wave Money / AYA Pay ဖြင့် ပေးချေပြီး Transaction ID ထည့်ပါ။</p>{done ? <div className="success"><b>Payment တင်ပြီးပါပြီ ✓</b><span>Admin စစ်ဆေးပြီး APPROVED / REJECTED ပြန်ပေးပါမယ်။</span><button onClick={()=>{setDone(false);setForm({customer:'',phone:'',method:'KBZ Pay',amount:'',transactionId:''})}}>နောက်ထပ် Payment တင်မယ်</button></div> : <form onSubmit={submit}>
    <label>Customer Name<input value={form.customer} onChange={e=>setForm({...form,customer:e.target.value})} placeholder="အမည်" /></label>
    <label>Phone Number<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="09xxxxxxxxx" /></label>
    <label>Payment Method<select value={form.method} onChange={e=>setForm({...form,method:e.target.value})}><option>KBZ Pay</option><option>Wave Money</option><option>AYA Pay</option></select></label>
    <label>Amount (MMK)<input type="number" min="1" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="10000" /></label>
    <label>Transaction ID<input value={form.transactionId} onChange={e=>setForm({...form,transactionId:e.target.value})} placeholder="Transaction ID" /></label>
    <button className="primary">Payment Submit</button>
  </form>}</section><a className="adminLink" href="/admin">Admin Dashboard →</a></main>
}
