import './globals.css'
import type { ReactNode } from 'react'
export const metadata={title:'Oak Payment Monitor',description:'Payment submission and admin monitor'}
export default function RootLayout({children}:{children:ReactNode}){return <html lang="my"><body>{children}</body></html>}
