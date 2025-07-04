'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import SessionStart from './SessionStart'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}><SessionStart/>{children}</Provider>
}