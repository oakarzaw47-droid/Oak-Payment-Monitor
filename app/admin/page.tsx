'use client'

import { useEffect, useState } from 'react'
import { getPayments, updatePayment, Payment } from '@/lib/payments'

export default function Admin() {
 const [payments,setPayments]=useState<Payment[]>([])
 const refresh=()=>setPayments(getPayments())
 useEffect(()=>{refresh(); const t=setInterval(refresh,1500); return()=>clearInterval(t)},[])
 const act=(id:string,status:Payment['status'])=>{updatePayment(id,status);refresh()}
 const pending=payments.filter(p=>p.status==='PENDING').length
 const approved=payments.filter(p=>p.status==='APPROVED').length
 return <main className="page wide"><header className="top"><div><div className="brand">OAK PAYMENT</div><h1>Admin Dashboard</h1></div><a href="/">Customer View</a></header><div className="stats"><div><b>{payments.length}</b><span>Total</span></div><div><b>{pending}</b><span>Pending</span></div><div><b>{approved}</b><span>Approved</span></div></div><section className="card tableWrap"><h2>Payment Requests</h2>{payments.length===0?<p className="muted">Payment မရှိသေးပါ။</p>:<div className="list">{payments.map(p=><article className="payment" key={p.id}><div><strong>{p.customer}</strong><span>{p.phone} · {p.method}</span><span>TX: {p.transactionId}</span></div><div className="amount">{p.amount.toLocaleString()} MMK</div><div><span className={'status '+p.status.toLowerCase()}>{p.status}</span>{p.status==='PENDING'&&<div className="actions"><button onClick={()=>act(p.id,'APPROVED')}>Approve</button><button onClick={()=>act(p.id,'REJECTED')}>Reject</button></div>}</div></article>)}</div>}</section></main>
}
