'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setLanguage } from '@/redux/slices/languageSlice'
import { getTranslations, availableLanguages, Language } from '@/locales'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const dispatch = useDispatch()
  const { navbar } = getTranslations(currentLanguage)

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as Language))
  }

  return (
    <nav>
      <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
        <Link href="/games" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
          {navbar.games}
        </Link>
        <Link href="/lists" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
          {navbar.lists}
        </Link>
        <Link href="/reviews" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
          {navbar.reviews}
        </Link>
      </div>
    </nav>
  )
}