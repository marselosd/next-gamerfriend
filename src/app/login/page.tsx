'use client'

import { useAppDispatch } from "@/redux/hooks"
import { loginWithCredentials, loginWithGoogle } from "@/redux/features/authActions"
import { FormEvent, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { getTranslations } from "@/locales"
import { ThunkDispatch } from "@reduxjs/toolkit"

export default function LoginPage() {
  const dispatch = useAppDispatch() as ThunkDispatch<any, any, any>
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { loginPage: t } = getTranslations(currentLanguage)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await dispatch(loginWithCredentials(username, password))
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t.loginError
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.title}</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t.usernameLabel}
            </label>
            <input
              id="username"
              type="text"
              placeholder={t.usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300
                         text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300
                         text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#4A4B83] text-white py-2 px-4 rounded-md hover:bg-[#353660] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? t.loadingButton : t.loginButton}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">{t.orLoginWith}</p>
          <button
            onClick={() => dispatch(loginWithGoogle())}
            className="w-full border border-gray-300 py-2 px-4 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            {t.googleButton}
          </button>

          <div className="mt-4">
            <a
              href="/register"
              className="inline-block w-full border border-[#4A4B83] text-[#4A4B83] text-center py-2 px-4 rounded-md hover:bg-[#f0f0f0] transition-colors"
            >
              {t.createAccount}
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
