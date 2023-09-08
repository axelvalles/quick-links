'use client'
import { store } from '@/redux/store'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
      <Toaster richColors />
        {children}
      </NextUIProvider>
    </Provider>
  )
}
