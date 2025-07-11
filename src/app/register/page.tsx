'use client'

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { getTranslations } from "@/locales"

export default function RegisterPage() {
  const router = useRouter()
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const { registerPage: t } = getTranslations(currentLanguage)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError(t.passwordMismatch)
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await fetch("https://apigamefriends.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: username,
          senha: password,
          email
        })
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || t.registerError)
        return
      }
      router.push("/login")

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t.connectionError
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.title}</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t.emailLabel}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              placeholder={t.emailPlaceholder}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">{t.usernameLabel}</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              placeholder={t.usernamePlaceholder}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t.passwordLabel}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              placeholder={t.passwordPlaceholder}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">{t.confirmPasswordLabel}</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 text-black placeholder:text-gray-700 focus:ring-[#4A4B83] focus:border-[#4A4B83]"
              placeholder={t.confirmPasswordPlaceholder}
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#4A4B83] hover:bg-[#353660]"
            }`}
          >
            {loading ? t.loadingButton : t.registerButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-[#4A4B83] hover:underline">
            {t.backToLogin}
          </Link>
        </div>
      </div>
    </main>
  )
}
