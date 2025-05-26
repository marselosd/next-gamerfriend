'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getTranslations } from '@/locales'
import Link from 'next/link'

interface NavbarProps {
  isMobile?: boolean
}

export default function Navbar({isMobile}: NavbarProps) {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { navbar } = getTranslations(currentLanguage)

  const baseClasses = isMobile
    ? 'flex flex-col space-y-2'
    : 'hidden md:ml-6 md:flex md:items-center md:space-x-4'

  return (
    <div className={baseClasses}>
      <Link href="/games" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
        {navbar.games}
      </Link>
      <Link href="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
        {navbar.profile}
      </Link>
      <Link href="/reviews" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#4A4B83]">
        {navbar.reviews}
      </Link>
    </div>
  )
}