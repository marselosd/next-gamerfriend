'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setLanguage } from '@/redux/slices/languageSlice'
import { getTranslations, availableLanguages, Language } from '@/locales'
import Link from 'next/link'
import Navbar from '../navBar/NavBar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const dispatch = useDispatch()
  const { navbar } = getTranslations(currentLanguage)

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as Language))
  }

  return (
    <nav className="bg-[#6667AB] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav (left side) */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="flex-shrink-0 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#4A4B83] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Ícone do menu hamburguer */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                {navbar.title}
              </Link>
            </div>
            <Navbar />
            
          </div>

          {/* Right side items */}
          <div className="flex items-center">
            {/* Search icon - desktop */}
            <div className="hidden md:flex items-center mr-4">
              <button 
                className="p-1 rounded-full hover:bg-[#4A4B83]"
                aria-label={navbar.search}
              >
                {/* Ícone de busca... */}
              </button>
            </div>

            {/* Language selector - desktop */}
            <div className="hidden md:flex items-center mr-4">
              <select
                value={currentLanguage}
                onChange={handleLanguageChange}
                className="bg-transparent border border-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                aria-label="Select language"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Auth buttons - desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/login"
                className="px-3 py-1 rounded-md text-sm font-medium hover:bg-[#4A4B83]"
              >
                {navbar.login}
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded-md text-sm font-medium border border-white hover:bg-white hover:text-[#6667AB] transition-colors"
              >
                {navbar.createAccount}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#6667AB] px-4 pb-4">
          <Navbar isMobile />
          
          {/* Auth buttons - mobile */}
          <div className="flex flex-col space-y-2 mt-4">
            <Link
              href="/login"
              className="px-3 py-1 rounded-md text-sm font-medium hover:bg-[#4A4B83]"
            >
              {navbar.login}
            </Link>
            <Link
              href="/register"
              className="px-3 py-1 rounded-md text-sm font-medium border border-white hover:bg-white hover:text-[#6667AB] transition-colors"
            >
              {navbar.createAccount}
            </Link>
          </div>

          {/* Language selector - mobile */}
          <div className="mt-4">
            <select
              value={currentLanguage}
              onChange={handleLanguageChange}
              className="bg-transparent border border-white rounded-md px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-white"
              aria-label="Select language"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
)}
    </nav>
  )
}