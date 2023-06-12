import React from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
